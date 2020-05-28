using APIRecargasJob.DataAcces;
using APIRecargasJob.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Pagaqui;
using System;

using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;

namespace APIRecargasJob.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagaquiController : ControllerBase
    {
        //
        private readonly string _connectionString;

        public PagaquiController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //
        private string strTipoServicio;
        private static bool bolBanConsultarSkuList = true;
        private static DateTime dtmFechaConsulta = new DateTime(2000, 01, 01);
        private static XmlDocument xDoc = new XmlDocument();
        
        //DateTime horaActual;
        //TimeSpan timeout;

        transactSoapClient transactSoap;        
        Transac_Pagaqui transac_Pagaqui = null;
        OperacionesPagaqui operacionesPagaqui = new OperacionesPagaqui();

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
            xDoc.Save("C:\\inetpub\\wwwroot\\ApiRecargas\\SkuPagaqui\\SkuPagaqui.xml"); //Guardamos el xml generado

            //Ejecutando procedimiento almacenado
            SqlConnection conexionSql = new SqlConnection(_connectionString);
            SqlCommand cmd = new SqlCommand("spSkuPagaqui", conexionSql);
            cmd.CommandType = CommandType.StoredProcedure;

            conexionSql.Open();
            cmd.ExecuteNonQuery();
            conexionSql.Close();
            //
        }

        private string[] mtdVerficarErroresTransaccionAsync(string strRef1, string strRef2, string strSkuConsulta, string strUserName, string strPass)
        {
            //Arreglo para manejo de errores:
            // Posicion 0: Contiene el mensaje de error para las validaciones 
            // Posicion 1: Con esta informacion se realizan las validaciones corresponientes a los codigos del parametro rCode.
            string[] strResult = new string[2];

            //Indica si se tiene que llamar al metodo checkSKU (solo cuando es -1)
            string strCheckSku = string.Empty;

            //Guarda el tipo de servicio sobre el que se hace el pago
            strTipoServicio = string.Empty;
            //Esta validando falsos
            //Paso 0: validar expresion regular de referencia
            if (!mtdValidarRegExSku(strRef1, strSkuConsulta, ref strCheckSku, ref strTipoServicio))
                strResult[0] += "La referencia no cumple con el formato de longitud; ";

            //Paso 1 verificamos que las referencias enviadas sean iguales
            if (!strRef1.Equals(strRef2))
                strResult[0] += "Las cadenas de referencia no concuerdan; ";

            //Paso 2 Consultar CheckSku
            //Solo se invoca el metodo si la propidad checksku del XML es -1
            if (strCheckSku.Equals("-1"))
            {
                transactSoap = new transactSoapClient(transactSoapClient.EndpointConfiguration.transactSoap12);
                CheckSkuResponse checkSkuResponse = transactSoap.CheckSkuAsync(strUserName, strPass, strRef1, strSkuConsulta).Result;

                switch (checkSkuResponse.Body.CheckSkuResult.rcode)
                {
                    //CONSULTA EXITOSA, el parámetro monto es el saldo a pagar para la referencia consultada.
                    case 0: // PORQUE EL MONTO DA -1 SI ES DEL SERVICIO?
                        strResult[1] = "0|" + checkSkuResponse.Body.CheckSkuResult.monto.ToString() + "|" +
                                        checkSkuResponse.Body.CheckSkuResult.mensaje;
                        break;

                    //CONSULTA EXITOSA, el monto es negativo o cero.
                    case 2:
                        strResult[1] = string.Empty;
                        break;

                    //CONSULTA ERROR. Existe algún problema con el carrier y no se puede validar la referencia.
                    // SI ES ORIFLAME LA TRANSACCION SE DECLINA
                    case 3:
                        strResult[1] = "3|0|" + strTipoServicio;
                        break;

                    //Referencia invalida.
                    default:
                        strResult[0] += "Referencia invalida; ";
                        break;
                }
            }

            return strResult;
        }

        private bool mtdValidarRegExSku(string strReferencia, string strSku, ref string strCheckSKU, ref string strTipoServicio)
        {
            //Relizamos busqueda en XML
            XmlNodeList xnlProductos = xDoc.GetElementsByTagName("product");

            // Iteración del objeto `XmlNodeList` para totalizar los
            foreach (XmlNode producto in xnlProductos)
            {
                if (producto.ChildNodes[1].InnerText.Equals(strSku))
                {
                    //Cuando encontramos el el Sku a consultar en el XML Validamos la expresion regular
                    Regex rgExpresion = new Regex(@producto.ChildNodes[6].InnerText);

                    //Asignamos el tipo de servicio a la variable correspondiente
                    strTipoServicio = producto.ChildNodes[0].InnerText;
                    operacionesPagaqui.StrTipoServicio = strTipoServicio;

                    //Asignamos el valor del parametro chekSKU a la variable
                    strCheckSKU = producto.ChildNodes[5].InnerText;

                    //Verificamos, si es correcta regresamos true, de lo contrario false
                    if (rgExpresion.IsMatch(strReferencia))
                        return true;
                    else
                        return false;
                }
            }
            return true;
        }

        [HttpPost("Pago_Servicios")]
        public CheckTransactionResponse Post([FromBody] Transac_Pagaqui transac_Pagaqui)
        {
            DateTime dtInicio2 = DateTime.Now;
            this.transac_Pagaqui = transac_Pagaqui;
            string strid = string.Empty;

            try
            {
                //Antes de iniciar la trasaccion hacemos las validaciones correspondientes
                // Primero: verificamos la carga del SKU List
                mtdValidarConsultaSKU(transac_Pagaqui.username, transac_Pagaqui.password);

                //Segundo: Validamos y verificamos la informacion enviada por el front al API
                string[] result = mtdVerficarErroresTransaccionAsync(transac_Pagaqui.op_account, transac_Pagaqui.op_account2, transac_Pagaqui.sku_Code,
                                                                     transac_Pagaqui.username, transac_Pagaqui.password);

                //verificamos si existen errores en la transaccion
                if (!string.IsNullOrEmpty(result[0]))
                {
                    return mtdCrearRespuesta(0, 40, "Se detectaron errores con los datos: " + result[0] + "Verifique y vuelva a intentar",
                                             transac_Pagaqui.op_account,
                                             "La operacion no puede ser autorizada por error con el provedor de servicios intente mas tarde");
                }

                //Realizamos validaciones de acuerdo a la especificacion del parametro Rcode para sus diferentes valores
                if (!string.IsNullOrEmpty(result[1]))
                {
                    //Posicion 0: Rcode, posicion 1: monto, posicion 2: mensaje: SPLIT divide la cadena que tare result[1] en parter tomando como referencia |
                    string[] strValores = result[1].Split('|');

                    //Caso 1: Rcode 0 y monto diferente del permitido
                    if (strValores[0].Equals("0"))
                    {
                        if (!strValores[1].Equals(transac_Pagaqui.monto.ToString()))
                            return mtdCrearRespuesta(0, 40, "La cantidad que intenta pagar: " + transac_Pagaqui.monto.ToString() + "," +
                                                     " No es compatible con el monto permitido: " + strValores[1] + " " + "Verifique y vuelva a intentar",
                                                      transac_Pagaqui.op_account,
                                                      "La operacion no puede ser autorizada por error con el provedor de servicios intente mas tarde");
                    }
                    //Caso 2: Rcode 3 y tipo de serivicio ORIFLAME
                    if (strValores[0].Equals("3"))
                    {
                        //Si el servicio es de ORIFLAME y el rcode fue 3 se declina la transaccion
                        if (!strValores[2].Contains("ORIFLAME"))
                            return mtdCrearRespuesta(0, 40, "La transaccion no puede completarse: Existe algún problema con el carrier y" +
                                                     "no se puede validar la referencia intente mas tarde", transac_Pagaqui.op_account,
                                                     "La operacion no puede ser autorizada por error con el provedor de servicios intente mas tarde");
                    }
                }

                //Creamos el cliente para la peticón de transacSoap
                transactSoap = new transactSoapClient(transactSoapClient.EndpointConfiguration.transactSoap12);

                operacionesPagaqui.TransactSoap = transactSoap;
                operacionesPagaqui.Transac_Pagaqui = transac_Pagaqui;
                bool banderaID = operacionesPagaqui.verificaSegundosID();
                if (banderaID == true)
                {
                    strid = operacionesPagaqui.GetTRequestID.Body.GetTRequestIDResult;
                }
                else { return operacionesPagaqui.respuestas(1, ""); }

                DateTime dtInicioDOT = DateTime.Now;
                TimeSpan tsTiempoDOT = DateTime.Now - dtInicioDOT;

                bool resultadoTiempoDOT = operacionesPagaqui.verificaSegundosDOT(tsTiempoDOT, dtInicioDOT);
                

                if (operacionesPagaqui.DoTResponse.Body.DoTResult.rcode == 0)
                {
                    Log.mtdAddConciliacion(transac_Pagaqui.op_account, transac_Pagaqui.monto.ToString(), strTipoServicio.Trim(),
                                           mtdCaracteres(operacionesPagaqui.DoTResponse.Body.DoTResult.op_authorization), "Conciliacion_Pagaqui", "Conciliacion");

                    return operacionesPagaqui.respuestas(2, "");
                }
                else
                {
                    return operacionesPagaqui.mtdRespuestaCheckTransaction(strid);
                }
            }
            catch (Exception ex)
            {
                if (ex.HResult.Equals(-2146233088))
                {
                    return operacionesPagaqui.respuestas(3, "");
                }
            }
            return operacionesPagaqui.respuestas(4, strid);
        }

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
        
        [HttpPost("Consultar_Saldo")]
        public GetBalanceResponse Post([FromBody] GetBalance balance)
        {
            transactSoapClient soapClient = new transactSoapClient(transactSoapClient.EndpointConfiguration.transactSoap12);

            GetBalanceResponse getBalance = soapClient.GetBalanceAsync(balance.username, balance.password).Result;

            return getBalance;
        }

        [HttpPost("Consultar_Referencia")]
        public CheckSkuResponse Post([FromBody] CheckSKU checkSKU)
        {
            transactSoapClient soapClient = new transactSoapClient(transactSoapClient.EndpointConfiguration.transactSoap12);

            CheckSkuResponse checkSkuResponse = soapClient.CheckSkuAsync(checkSKU.username, checkSKU.password, checkSKU.referencia, checkSKU.sku_Code).Result;

        
            return checkSkuResponse;

        }
    }
}
