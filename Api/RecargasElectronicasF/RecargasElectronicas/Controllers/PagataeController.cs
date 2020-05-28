using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using RecargasElectronicas.Controllers;
using System.Xml;
using APIRecargasJob.Models;
using APIRecargasJob;
using APIRecargasJob.DataAcces;
using System.Net.Http;
using System.Net;
using System.Diagnostics;
using System.Threading;
using Pagatae;
using Microsoft.Extensions.Configuration;
using RecargasElectronicas.Data;
using System.Data.SqlClient;
using System.Data;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagataeController : ControllerBase
    {
        //
        private readonly string _connectionString;

        public PagataeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //
        private string nombreTipoServicio;
        private static bool bolBanConsultarSkuList = true;
        private static DateTime dtmFechaConsulta = new DateTime(2000, 01, 01);
        private static XmlDocument xDoc = new XmlDocument();
        private string monto = string.Empty; //para agregar la configuracion

        DateTime horaActual;
        TimeSpan timeout;
        OperacionesPagatae pagataeOperaciones = new OperacionesPagatae();


        Transac_Pagatae transac_Pagatae = null;
        transactSoapClient ws;
       

        /// <summary>
        /// Valida que se realize la consulta del SKULIST cada 24 horas
        /// </summary>
        /// <param name="strUserName"></param>
        /// <param name="strPass"></param>
        public void mtdValidarConsultaSKU(string strUserName, string strPass)
        {
            //Solo una vez al dia hacemos la consulta del SKU
            if (bolBanConsultarSkuList)
            {
                //Si el año es igual a 2000, significa que es la primera vez
                if (dtmFechaConsulta.Year == 2000)
                    mtdGetSkuList(strUserName, strPass);
                //No es la primera vez y validamos que se haga solo una vez al dia
                else
                {
                    TimeSpan tsTiempo = dtmFechaConsulta - DateTime.Now;
                    //si pasaron 24 horas consultamos de nueva cuenta el skuList
                    if (tsTiempo.Hours >= 23)
                        mtdGetSkuList(strUserName, strPass);
                }
            }
        }

        private void mtdGetSkuList(string strUserName, string strPass)
        {
            //Actualizamos la fecha
            dtmFechaConsulta = DateTime.Now;
            //Cargamos lista de SKU
            transactSoapClient ws = new transactSoapClient(transactSoapClient.EndpointConfiguration.transactSoap12);
            GetSkuListResponse getSkuListResponse = ws.GetSkuListAsync(strUserName, strPass).Result;
            //var lstSku = getSkuListResponse.Body.GetSkuListResult.AsQueryable();
            xDoc.LoadXml(getSkuListResponse.Body.GetSkuListResult.ToString());
            xDoc.Save("C:\\inetpub\\wwwroot\\ApiRecargas\\SkuPagatae\\SkuPagatae.xml"); //Guardamos el xml generado

            //Ejecutando procedimiento almacenado
            SqlConnection conexionSql = new SqlConnection(_connectionString);
            SqlCommand cmd = new SqlCommand("spSkuPagatae", conexionSql);
            cmd.CommandType = CommandType.StoredProcedure;        

            conexionSql.Open();
            cmd.ExecuteNonQuery();
            conexionSql.Close();
            //

        }

        private string mtdValidarSKU(string strSku)
        {
            nombreTipoServicio = string.Empty;
            XmlNodeList xnlProductos = xDoc.GetElementsByTagName("product");
            foreach (XmlNode producto in xnlProductos)
            {
                if (producto.ChildNodes[1].InnerText.Equals(strSku))
                {
                    return nombreTipoServicio = producto.ChildNodes[0].InnerText;
                }
            }
            return nombreTipoServicio;
        }

        //https://localhost:44302/api/Pagatae/Recargas_Telcel
        [HttpPost("Recargas_Telcel")]
        public CheckTransactionResponse Post([FromBody] Transac_Pagatae transac_Pagatae)
        {
            
         
           
            //Se colocaron las variables del tiempo locales, para el caso cuando el servidor se desconecta pero aun entra dentro del TimeOut General 
            DateTime dtInicio2 = DateTime.Now;
            this.transac_Pagatae = transac_Pagatae;
            string strId = string.Empty;
           
            try
            {
               
                mtdValidarConsultaSKU(transac_Pagatae.username, transac_Pagatae.password);
                ws = new transactSoapClient(transactSoapClient.EndpointConfiguration.transactSoap12);
              
                pagataeOperaciones.Ws = ws;
                pagataeOperaciones.Transac_Pagatae = transac_Pagatae;
                bool banderaID= pagataeOperaciones.verificaSegundosID();
                if (banderaID == true)
                {
                    strId = pagataeOperaciones.GetTRequestIDResponse.Body.GetTRequestIDResult;
                   

                }
                else { return pagataeOperaciones.respuestas(1, ""); }
                DateTime dtInicioDOT = DateTime.Now;
                TimeSpan tsTiempoDOT = DateTime.Now - dtInicioDOT;
                bool resultadoTiempoDOT = pagataeOperaciones.verificaSegundosDOT(tsTiempoDOT, dtInicioDOT);
                pagataeOperaciones.NombreTipoServicio= mtdValidarSKU(transac_Pagatae.SkuCode.ToString());
                monto = transac_Pagatae.Amount.ToString();
                pagataeOperaciones.Monto = monto;

                
              if (pagataeOperaciones.DoTResponse.Body.DoTResult.rcode == 0)
                {
                  
                    Log.mtdAddConciliacion(transac_Pagatae.Op_Account, transac_Pagatae.Amount.ToString(), nombreTipoServicio.Trim(),
                                         mtdCaracteres(pagataeOperaciones.DoTResponse.Body.DoTResult.op_authorization), "Conciliacion_Pagatae", "Conciliacion");

                   


                    return pagataeOperaciones.respuestas(2,"");
                }
                else
                {
                    return pagataeOperaciones.mtdRespuestaCheckTransaction(strId);
                }
            }
            catch (Exception ex)
            {
                if (ex.HResult.Equals(-2146233088))
                {
                    return pagataeOperaciones.respuestas(3,"");
                }
            }

            return pagataeOperaciones.respuestas(4,strId);
        }
            
        // Se creo el metodo mtdCrearRespuesta para el TimeOut es decir para que cuando exceda el limite de tiempo los errores que va a traer son los del mtdCrearRespuesta
        private CheckTransactionResponse mtdCrearRespuesta(long transaccion_id, int rcode, string rcode_description, string op_account, string op_authorization)
        {
            CheckTransactionResponse checkTransactionResponse = null;
            TResponse checkTransactionResult = new TResponse();
            checkTransactionResult.transaction_id = transaccion_id;
            checkTransactionResult.rcode = rcode;
            checkTransactionResult.rcode_description = rcode_description;
            checkTransactionResult.op_account = op_account;
            checkTransactionResult.op_authorization = op_authorization;

            CheckTransactionResponseBody checkTransactionResponseBody = new CheckTransactionResponseBody(checkTransactionResult);
            checkTransactionResponse = new CheckTransactionResponse(checkTransactionResponseBody);
            return checkTransactionResponse;
        }

        //Se realizo el metodo CodigoPendiente donde se valida que cuando rcode sea igual a 1 asigne transaction_id como folio de la transaccion 
        

        // Se realizo el metodo mtdCaracteres para que cuando el id traiga mas de 6 digitios solo tome los primeros de 6 de izquierda a derecha.  
        public String mtdCaracteres(string cadena)
        {
            string cadena2 = cadena;
            if (cadena.Length > 6)
            {
                cadena2 = cadena.Substring(cadena.Length - 6, 6);
            }
            else
            {
                cadena2 = cadena;
            }
            return cadena2;
        }

        [HttpPost("Consulta_Saldo")]
        public async Task<GetBalanceResponse> Post([FromBody] GetBalance balance)
        {
            transactSoapClient ws = new transactSoapClient(transactSoapClient.EndpointConfiguration.transactSoap12);
            GetBalanceResponse getBalanceResponse =await ws.GetBalanceAsync(balance.username, balance.password);
            return getBalanceResponse;
        }

     
    }
}


   