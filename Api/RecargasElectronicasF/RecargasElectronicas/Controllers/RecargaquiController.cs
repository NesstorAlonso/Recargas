using APIRecargasJob.DataAcces;
using APIRecargasJob.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Recargaqui;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Xml;

namespace APIRecargasJob.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecargaquiController : ControllerBase
    {
        //
        private readonly string _connectionString;

        public RecargaquiController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //
        private string strTipoServicio;
        private static bool bolBanConsultarSkuList = true;
        private static DateTime dtmFechaConsulta = new DateTime(2000, 01, 01);
        private static XmlDocument xDoc = new XmlDocument();

        DateTime horaActual;
        TimeSpan timeout;

        transactSoapClient transactSoap;        
        Transac_Recargaqui transac_Recargaqui = null;
        OperacionesRecargaqui operacionesRecargaqui = new OperacionesRecargaqui();

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

        /// <summary>
        /// Obtiene la lista de SKU y lo carga en XML
        /// </summary>
        /// <param name="strUserName"></param>
        /// <param name="strPass"></param>
        private void mtdGetSkuList(string strUserName, string strPass)
        {
            //Actualizamos la fecha
            dtmFechaConsulta = DateTime.Now;
            //Cargamos lista de SKU
            transactSoapClient transact = new transactSoapClient(transactSoapClient.EndpointConfiguration.transactSoap12);
            GetSkuListResponse getSkuListResponse = transact.GetSkuListAsync(strUserName, strPass).Result;
            //var lstSku = getSkuListResponse.Body.GetSkuListResult.AsQueryable();
            xDoc.LoadXml(getSkuListResponse.Body.GetSkuListResult.ToString());
            xDoc.Save("C:\\inetpub\\wwwroot\\ApiRecargas\\SkuRecargaqui");

            //Ejecutando procedimiento almacenado
            SqlConnection conexionSql = new SqlConnection(_connectionString);
            SqlCommand cmd = new SqlCommand("spSkuRecargaquiAlta", conexionSql);
            cmd.CommandType = CommandType.StoredProcedure;

            conexionSql.Open();
            cmd.ExecuteNonQuery();
            conexionSql.Close();
            //
        }
        private string mtdValidarSKU(string strSku)
        {
            strTipoServicio = string.Empty;
            XmlNodeList xnlProductos = xDoc.GetElementsByTagName("product");
            foreach (XmlNode producto in xnlProductos)
            {
                if (producto.ChildNodes[1].InnerText.Equals(strSku))
                {
                    return strTipoServicio = producto.ChildNodes[0].InnerText;

                }
            }
            return strTipoServicio;
        }

        [HttpPost("Multi_Recargas")]
        public CheckTransactionResponse Post([FromBody] Transac_Recargaqui transac_Recargaqui)
        {
            DateTime dtInicio2 = DateTime.Now;
            this.transac_Recargaqui = transac_Recargaqui;
            string strid = string.Empty;

            try
            {
                //Antes de iniciar la trasaccion hacemos las validaciones correspondientes
                // Primero: verificamos la carga del SKU List
                mtdValidarConsultaSKU(transac_Recargaqui.username, transac_Recargaqui.password);

                //Creamos el cliente para la peticón de transacSoap
                transactSoap = new transactSoapClient(transactSoapClient.EndpointConfiguration.transactSoap12);

                operacionesRecargaqui.TransactSoap = transactSoap;
                operacionesRecargaqui.Transac_Recargaqui = transac_Recargaqui;
                bool banderaID = operacionesRecargaqui.verificaSegundosID();
                if (banderaID == true)
                {
                    strid = operacionesRecargaqui.GetTRequestID.Body.GetTRequestIDResult;
                }
                else { return operacionesRecargaqui.respuestas(1, ""); }

                DateTime dtInicioDOT = DateTime.Now;
                TimeSpan tsTiempoDOT = DateTime.Now - dtInicioDOT;

                bool resultadoTiempoDOT = operacionesRecargaqui.verificaSegundosDOT(tsTiempoDOT, dtInicioDOT);
                operacionesRecargaqui.StrTipoServicio = mtdValidarSKU(transac_Recargaqui.skuCode.ToString());

                if (operacionesRecargaqui.DoTResponse.Body.DoTResult.rcode == 0)
                {
                    Log.mtdAddConciliacion(transac_Recargaqui.op_account, transac_Recargaqui.amount.ToString(), strTipoServicio.Trim(),
                                           mtdCaracteres(operacionesRecargaqui.DoTResponse.Body.DoTResult.op_authorization), "Conciliacion_Recargaqui", "Conciliacion");

                    return operacionesRecargaqui.respuestas(2, "");
                }
                else
                {
                    return operacionesRecargaqui.mtdRespuestaCheckTransaction(strid);
                }
            }
            catch (Exception ex)
            {
                if (ex.HResult.Equals(-2146233088))
                {
                    return operacionesRecargaqui.respuestas(3, "");
                }
            }
            return operacionesRecargaqui.respuestas(4, strid);
        }

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

        //Se creo el siguente metodo cuando el folio es mayo a 6 digitos que solo tome los 6 de derecha a izquierda
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

        [HttpPost("Consuta_Saldo")]
        public GetBalanceResponse Post([FromBody] GetBalance balance)
        {
            transactSoapClient transactSoap = new transactSoapClient(transactSoapClient.EndpointConfiguration.transactSoap12);

            GetBalanceResponse getBalance = transactSoap.GetBalanceAsync(balance.username, balance.password).Result;

            return getBalance;
        }
    }
}