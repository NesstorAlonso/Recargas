using APIRecargasJob.Models;
using Recargaqui;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIRecargasJob.DataAcces
{
    public class OperacionesRecargaqui
    {
        transactSoapClient transactSoap;
        Transac_Recargaqui transac_Recargaqui = null;
        GetTRequestIDResponse getTRequestID = null;
        DoTResponse doTResponse = null;
        CheckTransactionResponse checkTransactionResponse = null;

        DateTime horaActual;
        TimeSpan timeout;

        private string strTipoServicio;

        public transactSoapClient TransactSoap { get => transactSoap; set => transactSoap = value; }
        public Transac_Recargaqui Transac_Recargaqui { get => transac_Recargaqui; set => transac_Recargaqui = value; }
        public GetTRequestIDResponse GetTRequestID { get => getTRequestID; set => getTRequestID = value; }
        public DoTResponse DoTResponse { get => doTResponse; set => doTResponse = value; }
        public CheckTransactionResponse CheckTransactionResponse { get => checkTransactionResponse; set => checkTransactionResponse = value; }
        public DateTime HoraActual { get => horaActual; set => horaActual = value; }
        public TimeSpan Timeout { get => timeout; set => timeout = value; }
        public string StrTipoServicio { get => strTipoServicio; set => strTipoServicio = value; }

        public bool verificaSegundosID()
        {
            bool respuesta = false;
            if (transactSoap.GetTRequestIDAsync(transac_Recargaqui.username, transac_Recargaqui.password, transac_Recargaqui.licence,
                                                transac_Recargaqui.terminalID).Wait(5000) == true)
            {
                // Imprimir Log del Request, CREAR METODO SOLO PARA REQUEST
                Log.mtdAddRequestID(transac_Recargaqui.username, transac_Recargaqui.password, "Log_Recargaqui", "tipo");

                getTRequestID = transactSoap.GetTRequestIDAsync(transac_Recargaqui.username, transac_Recargaqui.password, transac_Recargaqui.licence,
                                                                transac_Recargaqui.terminalID).Result;

                // Imprimir el response con los datos, CREAR METODO SOLO PARA RESPONSE
                Log.mtdAddRequestIDresponse(getTRequestID.Body.GetTRequestIDResult.ToString(), "Log_Recargaqui", "tipo");
                respuesta = true;
            }
            return respuesta;
        }

        public bool verificaSegundosDOT(TimeSpan segundos, DateTime tiempoInicioDelMetodo)
        {
            horaActual = DateTime.Now;
            if (segundos.TotalSeconds < 10)
            {
                try
                {
                    Log.mtdAddDot(transac_Recargaqui.username, getTRequestID.Body.GetTRequestIDResult.ToString(),
                                 transac_Recargaqui.skuCode, transac_Recargaqui.op_account, transac_Recargaqui.amount.ToString(), "Log_Recargaqui", "tipo");

                    doTResponse = transactSoap.DoTAsync(getTRequestID.Body.GetTRequestIDResult.ToString(), transac_Recargaqui.username, transac_Recargaqui.skuCode,
                    transac_Recargaqui.op_account, transac_Recargaqui.amount).Result;

                    Log.mtdAddDotresponse(doTResponse.Body.DoTResult.op_account, mtdCaracteres(doTResponse.Body.DoTResult.op_authorization),
                                         doTResponse.Body.DoTResult.rcode.ToString(), doTResponse.Body.DoTResult.rcode_description,
                                         doTResponse.Body.DoTResult.transaction_id.ToString(), "Log_Recargaqui", "tipo");

                    if (doTResponse != null)
                    {
                        return true;
                    }
                }
                catch (Exception)
                {
                    segundos = DateTime.Now - tiempoInicioDelMetodo;
                    verificaSegundosDOT(segundos, tiempoInicioDelMetodo);
                }
            }
            return false;
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
        public bool verificaTiempoTimeOutSeAcabo()
        {
            timeout = DateTime.Now - horaActual;
            if (timeout.Minutes >= 1)
            {
                return true;
            }
            else
            {
                if (timeout.Seconds > 58)
                {
                    return true;
                }
                return false;
            }
        }
        public CheckTransactionResponse respuestas(int opcion, string algunaCadena)
        {
            switch (opcion)
            {
                case 1:
                    return mtdCrearRespuesta(0, 40, "Error General (Las credenciales son erróneas o Sistema en Mantenimiento), Intente mas tarde",
                                            transac_Recargaqui.op_account,
                                            "La operacion no puede ser autorizada por error con el provedor de servicios intente mas tarde");
                case 2:
                    return mtdCrearRespuesta(doTResponse.Body.DoTResult.transaction_id, doTResponse.Body.DoTResult.rcode,
                                              doTResponse.Body.DoTResult.rcode_description, doTResponse.Body.DoTResult.op_account.ToString(),
                                              doTResponse.Body.DoTResult.op_authorization.ToString());
                case 3:
                    return mtdCrearRespuesta(0, 40, "Revisa tu conexion de internet", transac_Recargaqui.op_account,
                                             "Error no hay red para acceder a las operaciones del servicio");
                case 4:
                    return mtdCrearRespuesta(0, 99, "El tiempo de espera para la transaccion ha expirado",
                                             transac_Recargaqui.op_account, "La transaccion: " + getTRequestID.Body.GetTRequestIDResult +
                                             " Agoto el tiempo de espera en el servidor");
                default: return null;
            }
        }

        public CheckTransactionResponse mtdCrearRespuesta(long transaccion_id, int rcode, string rcode_description, string op_account, string op_authorization)
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

        public CheckTransactionResponse mtdRespuestaCheckTransaction(string strid)
        {
            Log.mtdAddCheckTransaction(transac_Recargaqui.username, strid, "Log_Recargaqui", "tipo");

            checkTransactionResponse = transactSoap.CheckTransactionAsync(getTRequestID.Body.GetTRequestIDResult.ToString(), transac_Recargaqui.username).Result;

            Log.mtdAddCheckTransactionresponse(checkTransactionResponse.Body.CheckTransactionResult.op_account,
                                               mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                                               checkTransactionResponse.Body.CheckTransactionResult.rcode.ToString(),
                                               checkTransactionResponse.Body.CheckTransactionResult.rcode_description.ToString(),
                                               checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString(), "Log_Recargaqui", "tipo");

            switch (checkTransactionResponse.Body.CheckTransactionResult.rcode)
            {
                case 0:
                    //Registro de Log de Conciliacion
                    Log.mtdAddConciliacion(transac_Recargaqui.op_account, transac_Recargaqui.amount.ToString(), strTipoServicio.Trim(),
                                           mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                                           "Conciliacion_Recargaqui", "Conciliacion");
                    break;

                //Operacion extisosas pero que tardan
                case 2:
                    try
                    {
                        return verificaSegundosCheckTransaction();
                    }
                    catch (Exception)
                    {
                        return verificaSegundosCheckTransaction();
                    }
            }

            return checkTransactionResponse;
        }

        public CheckTransactionResponse verificaSegundosCheckTransaction()
        {
            //bool banderaEntroA0 = false;
            int segundos = 10000;
            TimeSpan timeout2;
            bool banderaSegundos = false;

            while (checkTransactionResponse.Body.CheckTransactionResult.rcode == 2)
            {

                if (verificaTiempoTimeOutSeAcabo() == true)
                {
                    Log.mtdAddCheckTransaction(transac_Recargaqui.username, getTRequestID.Body.GetTRequestIDResult.ToString(), "Log_Recargaqui", "tipo");

                    Log.mtdAddCheckTransactionresponse(checkTransactionResponse.Body.CheckTransactionResult.op_account.ToString(),
                                                       checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString(),
                                                       "99", "El tiempo de espera para la transaccion ha expirado", Environment.NewLine
                                                       + "La transaccion: " + getTRequestID.Body.GetTRequestIDResult.ToString()
                                                       + " Agoto el tiempo de espera en el servidor", "Log_Recargaqui", "tipo");
                    return respuestas(4, "");
                }
                else
                {
                    timeout2 = DateTime.Now - horaActual;
                    if (timeout2.TotalSeconds > 50 && timeout2.TotalMinutes < 1 && banderaSegundos == false)
                    {
                        segundos = 6000 - timeout2.Milliseconds;                  
                        banderaSegundos = true;
                    }
                    Log.mtdAddCheckTransaction(transac_Recargaqui.username, getTRequestID.Body.GetTRequestIDResult.ToString(), "Log_Recargaqui", "tipo");
                    // if (simular(segundos) == true)

                    if (transactSoap.CheckTransactionAsync(getTRequestID.Body.GetTRequestIDResult.ToString(), transac_Recargaqui.username).Wait(10000) == true)
                    {
                        Log.mtdAddCheckTransactionresponse(checkTransactionResponse.Body.CheckTransactionResult.op_account,
                                                           mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                                                           checkTransactionResponse.Body.CheckTransactionResult.rcode.ToString(),
                                                           checkTransactionResponse.Body.CheckTransactionResult.rcode_description.ToString(),
                                                           checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString(), "Log_Recargaqui", "tipo");
                        try
                        {
                            Log.mtdAddCheckTransaction(transac_Recargaqui.username, getTRequestID.Body.GetTRequestIDResult.ToString(), "Log_Recargaqui", "tipo");

                            checkTransactionResponse = transactSoap.CheckTransactionAsync(getTRequestID.Body.GetTRequestIDResult.ToString(), transac_Recargaqui.username).Result;

                            Log.mtdAddCheckTransactionresponse(checkTransactionResponse.Body.CheckTransactionResult.op_account,
                                                               mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                                                               checkTransactionResponse.Body.CheckTransactionResult.rcode.ToString(),
                                                               checkTransactionResponse.Body.CheckTransactionResult.rcode_description.ToString(),
                                                               checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString(), "Log_Recargaqui", "tipo");

                            //Generamos una espera de 15 segundos para no saturar el pool de peticiones del servidor
                            //Se almacena en una variable para que cuando caiga en rcode:1 se pueda pasar el id_transaction como folio.
                            if (checkTransactionResponse.Body.CheckTransactionResult.rcode == 0)
                            {
                                    Log.mtdAddConciliacion(transac_Recargaqui.op_account, transac_Recargaqui.amount.ToString(), strTipoServicio.Trim(),
                                                           mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                                                           "Log_Recargaqui", "Conciliacion");
                            }                          
                        }
                        catch (Exception)
                        {
                            System.Threading.Thread.Sleep(10000);
                            //Se almacena en una variable para que cuando caiga en rcode:1 se pueda pasar el id_transaction como folio.
                            //Log.mtdLogError("Excedió el tiempo de espera de la operación", "Log_Recargaqui", "tipo");

                            if (verificaTiempoTimeOutSeAcabo() == true)
                            {
                                Log.mtdAddCheckTransaction(transac_Recargaqui.username, getTRequestID.Body.GetTRequestIDResult.ToString(), "Log_Recargaqui", "tipo");

                                Log.mtdAddCheckTransactionresponse(checkTransactionResponse.Body.CheckTransactionResult.op_account.ToString(),
                                                                   checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString(),
                                                                   "99", "El tiempo de espera para la transaccion ha expirado", Environment.NewLine
                                                                   + "La transaccion: " + getTRequestID.Body.GetTRequestIDResult.ToString()
                                                                   + " Agoto el tiempo de espera en el servidor", "Log_Recargaqui", "tipo");

                                //Si se supera el tiempo del time out mandamos una respuesta de error al cliente
                                return respuestas(4, "");
                            }
                        }
                    }
                    else
                    {
                        Log.mtdLogErrorresponse("Excedió el tiempo de espera de la operación", "Log_Recargaqui", "tipo");
                    }
                }
            }
            return checkTransactionResponse;
        }

        public bool simular(int num)
        {
            //Random r = new Random();
            //int aleatorio = r.Next(1, 3);
            //Console.Write("Este es el número= " + aleatorio);
            int aleatorio = 2;
            if (aleatorio == 2)
            {
                System.Threading.Thread.Sleep(num);
                return false;
            }
            else
            {
                return true;
            }
        }

    }
}
