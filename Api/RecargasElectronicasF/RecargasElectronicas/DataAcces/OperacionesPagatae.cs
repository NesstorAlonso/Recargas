
using APIRecargasJob.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pagatae;

namespace APIRecargasJob.DataAcces
{

    public class OperacionesPagatae
    {
        transactSoapClient ws;
        Transac_Pagatae transac_Pagatae = null;
        GetTRequestIDResponse getTRequestIDResponse = null;
        DoTResponse doTResponse = null;
        CheckTransactionResponse checkTransactionResponse = null;
        DateTime horaActual;
        TimeSpan timeout;
        string nombreTipoServicio;
        bool banderaMonto=false;
        string monto;

        public transactSoapClient Ws { get => ws; set => ws = value; }
        public Transac_Pagatae Transac_Pagatae { get => transac_Pagatae; set => transac_Pagatae = value; }
        public GetTRequestIDResponse GetTRequestIDResponse { get => getTRequestIDResponse; set => getTRequestIDResponse = value; }
        public DoTResponse DoTResponse { get => doTResponse; set => doTResponse = value; }
        public CheckTransactionResponse CheckTransactionResponse { get => checkTransactionResponse; set => checkTransactionResponse = value; }
        public DateTime HoraActual { get => horaActual; set => horaActual = value; }
        public TimeSpan Timeout { get => timeout; set => timeout = value; }
        public string NombreTipoServicio { get => nombreTipoServicio; set => nombreTipoServicio = value; }
        public string Monto { get => monto; set => monto = value; }

        public bool verificaSegundosID() {
          
            bool respuesta = false;
            if (ws.GetTRequestIDAsync(transac_Pagatae.username, transac_Pagatae.password, transac_Pagatae.Licence).Wait(5000) == true)
            {
                // Imprimir Log del Request, CREAR METODO SOLO PARA REQUEST
                Log.mtdAddRequestID(transac_Pagatae.username, transac_Pagatae.password, "Log_Pagatae", "tipo");

                getTRequestIDResponse = ws.GetTRequestIDAsync(transac_Pagatae.username, transac_Pagatae.password, transac_Pagatae.Licence).Result;
                // Imprimir el response con los datos, CREAR METODO SOLO PARA RESPONSE
                Log.mtdAddRequestIDresponse(getTRequestIDResponse.Body.GetTRequestIDResult.ToString(), "Log_Pagatae", "tipo");
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
                    
                    Log.mtdAddDot(transac_Pagatae.username, getTRequestIDResponse.Body.GetTRequestIDResult.ToString(),
                                 transac_Pagatae.SkuCode, transac_Pagatae.Op_Account, transac_Pagatae.Amount.ToString(), "Log_Pagatae", "tipo");

                        doTResponse = ws.DoTAsync(getTRequestIDResponse.Body.GetTRequestIDResult.ToString(), transac_Pagatae.username, transac_Pagatae.SkuCode,
                        transac_Pagatae.Op_Account, transac_Pagatae.Amount).Result;                                    


                    Log.mtdAddDotresponse(doTResponse.Body.DoTResult.op_account, mtdCaracteres(doTResponse.Body.DoTResult.op_authorization),
                                         doTResponse.Body.DoTResult.rcode.ToString(), doTResponse.Body.DoTResult.rcode_description,
                                         doTResponse.Body.DoTResult.transaction_id.ToString(), "Log_Pagatae", "tipo");

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
        public CheckTransactionResponse respuestas(int opcion, string algunaCadena) {
            switch (opcion) {
                case 1:
                   return mtdCrearRespuesta(0, 40, "Error General (Las credenciales son erróneas o Sistema en Mantenimiento), Intente mas tarde", transac_Pagatae.Op_Account,
                                        "La operacion no puede ser autorizada por error con el provedor de servicios intente mas tarde");
                case 2:
                   return  mtdCrearRespuesta(doTResponse.Body.DoTResult.transaction_id, doTResponse.Body.DoTResult.rcode,
                                             doTResponse.Body.DoTResult.rcode_description, doTResponse.Body.DoTResult.op_account.ToString(),
                                             doTResponse.Body.DoTResult.op_authorization.ToString());
                case 3:
                    return mtdCrearRespuesta(0, 40, "Revisa tu conexion de internet", transac_Pagatae.Op_Account, "Error no hay red para acceder a las operaciones del servicio");

                case 4:
                  return mtdCrearRespuesta(0, 99, "El tiempo de espera para la transaccion ha expirado",
                                    transac_Pagatae.Op_Account, "La transaccion: " + getTRequestIDResponse.Body.GetTRequestIDResult + " Agoto el tiempo de espera en el servidor");
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

        public CheckTransactionResponse mtdRespuestaCheckTransaction(string strId)
        {
            Log.mtdAddCheckTransaction(transac_Pagatae.username, strId, "Log_Pagatae", "tipo");

            checkTransactionResponse = ws.CheckTransactionAsync(getTRequestIDResponse.Body.GetTRequestIDResult.ToString(), transac_Pagatae.username).Result;

            Log.mtdAddCheckTransactionresponse(checkTransactionResponse.Body.CheckTransactionResult.op_account,
                                               mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                                               checkTransactionResponse.Body.CheckTransactionResult.rcode.ToString(),
                                               checkTransactionResponse.Body.CheckTransactionResult.rcode_description.ToString(),
                                               checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString(), "Log_Pagatae", "tipo");

            switch (checkTransactionResponse.Body.CheckTransactionResult.rcode)
            {
              
                case 0:
                 
                    //Registro de Log de Conciliacion
                    Log.mtdAddConciliacion(transac_Pagatae.Op_Account, transac_Pagatae.Amount.ToString(), nombreTipoServicio.Trim(),
                                           mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                                           "Conciliacion_Pagatae", "Conciliacion");
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
                default:
                    //Log.mtdAddCheckTransaction(transac_Pagatae.username, strId, "Log_Pagatae", "tipo");

                    //Log.mtdAddCheckTransactionresponse(checkTransactionResponse.Body.CheckTransactionResult.op_account,
                    //                                   mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                    //                                   checkTransactionResponse.Body.CheckTransactionResult.rcode.ToString(),
                    //                                   checkTransactionResponse.Body.CheckTransactionResult.rcode_description.ToString(),
                    //                                   checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString(), "Log_Pagatae", "tipo");
                    break;
            }

            return checkTransactionResponse;
        }

        public CheckTransactionResponse verificaSegundosCheckTransaction()
        {
            bool banderaEntroA0 = false;
            int segundos = 10000;
            TimeSpan timeout2;
            bool banderaSegundos = false;

            while (checkTransactionResponse.Body.CheckTransactionResult.rcode == 2)
            {

                if (verificaTiempoTimeOutSeAcabo() == true)
                {
                    Log.mtdAddCheckTransaction(transac_Pagatae.username, getTRequestIDResponse.Body.GetTRequestIDResult.ToString(), "Log_Pagatae", "tipo");

                    Log.mtdAddCheckTransactionresponse(checkTransactionResponse.Body.CheckTransactionResult.op_account.ToString(),
                                                       checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString(),
                                                       "99", "El tiempo de espera para la transaccion ha expirado", Environment.NewLine
                                                       + "La transaccion: " + getTRequestIDResponse.Body.GetTRequestIDResult.ToString()
                                                       + " Agoto el tiempo de espera en el servidor", "Log_Pagatae", "tipo");

                    return respuestas(4, "");
                }
                else
                {
                    timeout2 = DateTime.Now - horaActual;
                    if (timeout2.TotalSeconds > 50 && timeout2.TotalMinutes < 1 && banderaSegundos == false)
                    {
                        segundos = 6000 - timeout2.Milliseconds;

                        //Log.pruebaBorrarAlFinal("Segundos:  " + segundos, "Log_Pagatae", "tipo");
                        //Log.pruebaBorrarAlFinal("timeOUT Segundos:  " + timeout2.TotalSeconds + " TIMEOUT MINUTES: " + timeout2.TotalMinutes, "Log_Pagatae", "tipo");
                        banderaSegundos = true;
                    }
                    Log.mtdAddCheckTransaction(transac_Pagatae.username, getTRequestIDResponse.Body.GetTRequestIDResult.ToString(), "Log_Pagatae", "tipo");
                    // if (simular(segundos) == true)

                    if (ws.CheckTransactionAsync(getTRequestIDResponse.Body.GetTRequestIDResult.ToString(), transac_Pagatae.username).Wait(10000) == true)
                    {

                        Log.mtdAddCheckTransactionresponse(checkTransactionResponse.Body.CheckTransactionResult.op_account,
                                                           mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                                                           checkTransactionResponse.Body.CheckTransactionResult.rcode.ToString(),
                                                           checkTransactionResponse.Body.CheckTransactionResult.rcode_description.ToString(),
                                                           checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString(), "Log_Pagatae", "tipo");

                        try
                        {
                            Log.mtdAddCheckTransaction(transac_Pagatae.username, getTRequestIDResponse.Body.GetTRequestIDResult.ToString(), "Log_Pagatae", "tipo");

                            checkTransactionResponse =  ws.CheckTransactionAsync(getTRequestIDResponse.Body.GetTRequestIDResult.ToString(), transac_Pagatae.username).Result;

                            Log.mtdAddCheckTransactionresponse(checkTransactionResponse.Body.CheckTransactionResult.op_account,
                                                               mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                                                               checkTransactionResponse.Body.CheckTransactionResult.rcode.ToString(),
                                                               checkTransactionResponse.Body.CheckTransactionResult.rcode_description.ToString(),
                                                               checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString(), "Log_Pagatae", "tipo");

                            //Generamos una espera de 15 segundos para no saturar el pool de peticiones del servidor
                            //Se almacena en una variable para que cuando caiga en rcode:1 se pueda pasar el id_transaction como folio.
                            if (checkTransactionResponse.Body.CheckTransactionResult.rcode == 0)
                            {
                                banderaEntroA0 = false;
                                if (banderaMonto == false)
                                {
                                    Log.mtdAddConciliacion(transac_Pagatae.Op_Account, transac_Pagatae.Amount.ToString(), nombreTipoServicio.Trim(),
                                                           mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                                                           "Conciliacion_Pagatae", "Conciliacion");
                                }
                            }

                            if (checkTransactionResponse.Body.CheckTransactionResult.rcode == 1)
                            {
                                banderaEntroA0 = true;
                            }

                            //Agregamos el numero que trae transaction_id como folio esto cuando exista una transaccion con rcode 1
                            String id = checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString();
                            String rcode = checkTransactionResponse.Body.CheckTransactionResult.rcode.ToString();

                            mtdCodigoPendiente(int.Parse(rcode), id, transac_Pagatae.username, checkTransactionResponse, getTRequestIDResponse.Body.GetTRequestIDResult.ToString());
                        }
                        catch (Exception)
                        {
                            System.Threading.Thread.Sleep(10000);
                            //Se almacena en una variable para que cuando caiga en rcode:1 se pueda pasar el id_transaction como folio.
                            //Log.mtdLogError("Excedió el tiempo de espera de la operación", "Log_Pagatae", "tipo");

                            if (verificaTiempoTimeOutSeAcabo() == true)
                            {
                                Log.mtdAddCheckTransaction(transac_Pagatae.username, getTRequestIDResponse.Body.GetTRequestIDResult.ToString(), "Log_Pagatae", "tipo");

                                Log.mtdAddCheckTransactionresponse(checkTransactionResponse.Body.CheckTransactionResult.op_account.ToString(),
                                                                   checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString(),
                                                                   "99", "El tiempo de espera para la transaccion ha expirado", Environment.NewLine
                                                                   + "La transaccion: " + getTRequestIDResponse.Body.GetTRequestIDResult.ToString()
                                                                   + " Agoto el tiempo de espera en el servidor", "Log_Pagatae", "tipo");

                                //Si se supera el tiempo del time out mandamos una respuesta de error al cliente
                                return respuestas(4, "");
                            }
                        }

                        //if (checkTransactionResponse.Body.CheckTransactionResult.rcode == 0 && banderaEntroA0 == false)
                        //{
                        //    Log.mtdAddCheckTransaction(transac_Pagatae.username, getTRequestIDResponse.Body.GetTRequestIDResult.ToString(), "Log_Pagatae", "tipo");

                        //    Log.mtdAddCheckTransactionresponse(checkTransactionResponse.Body.CheckTransactionResult.op_account,
                        //                                       mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                        //                                       checkTransactionResponse.Body.CheckTransactionResult.rcode.ToString(),
                        //                                       checkTransactionResponse.Body.CheckTransactionResult.rcode_description.ToString(),
                        //                                       checkTransactionResponse.Body.CheckTransactionResult.transaction_id.ToString(), "Log_Pagatae", "tipo");

                        //    if (banderaMonto == false)
                        //    {
                        //        Log.mtdAddConciliacion(transac_Pagatae.Op_Account, transac_Pagatae.Amount.ToString(), nombreTipoServicio.Trim(),
                        //                               mtdCaracteres(checkTransactionResponse.Body.CheckTransactionResult.op_authorization.ToString()),
                        //                               "Conciliacion_Pagatae", "Conciliacion");
                        //    }
                        //}
                    }
                    else
                    {

                        Log.mtdLogErrorresponse("Excedió el tiempo de espera de la operación", "Log_Pagatae", "tipo");

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

        public void mtdCodigoPendiente(int rcode, String id, string username, CheckTransactionResponse r, string strId)
        {
            String idcorrecto = "";

            // Se realizo un if-else para que cuando el id solo traiga 4 digitos agregue 2 ceros a la izquierda o segun sea el caso.  
            if (rcode == 1)
            {
                if (id.Length < 6)
                {
                    int id2 = int.Parse(id);
                    idcorrecto = String.Format("{0,10:D6}", id2);
                }
                // Caso contrario cuando el id traiga mas de 6 digitos solo traiga los primeros 6 de izquierda a derecha.  
                else
                {
                    idcorrecto = mtdCaracteres(id);
                }

                Log.mtdAddCheckTransaction(username, strId, "Log_Pagatae", "tipo");

                Log.mtdAddCheckTransactionresponse(r.Body.CheckTransactionResult.op_account, mtdCaracteres(idcorrecto.Trim()),
                                                   r.Body.CheckTransactionResult.rcode.ToString(),
                                                   r.Body.CheckTransactionResult.rcode_description.ToString(),
                                                   r.Body.CheckTransactionResult.transaction_id.ToString(),
                                                   "Log_Pagatae", "tipo");

                //Registro de Log de Conciliacion
                Log.mtdAddConciliacion(r.Body.CheckTransactionResult.op_account, monto, nombreTipoServicio.Trim(),
                                       mtdCaracteres(idcorrecto.Trim()), "Conciliacion_Pagatae", "Conciliacion");
                banderaMonto = true;
            }
        }


    }
}
