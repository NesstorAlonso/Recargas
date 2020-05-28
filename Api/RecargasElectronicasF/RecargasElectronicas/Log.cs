
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Configuration;

namespace APIRecargasJob
{
   
        public static class Log
    {

        private static string path = @"C:\inetpub\wwwroot\ApiRecargas";
        private static string CadenaConexion = "Data Source=VM0417043\\SQLEXPRESS;Initial Catalog=bdRecargas2;User ID=sa;Password=Rodas$01;";


        public static void Add(string slog, string carpeta, string tipo)
        {
            CreateDirectory();
            string nombre = GetNameFile(tipo);
            string cadena = "";

            cadena += "" + slog + Environment.NewLine;


            StreamWriter sw = new StreamWriter(path + @"\" + carpeta + "/" + nombre, true);
            sw.Write(cadena);
            sw.Close();
        }

        private static string GetNameFile(string tipo)
        {                       
            string nombre = " ";
            string defini = "";
            if (tipo.Equals("Conciliacion"))
            {
                defini = "00001";
                nombre = defini + String.Format("{0:yyyyMMdd}", DateTime.Now) + ".txt";                
            }
            else
            {
                defini = "log_";
                nombre = defini + DateTime.Now.Day + "_" + DateTime.Now.Month + "_" + DateTime.Now.Year + ".txt";
            }
            return nombre;
        }

        private static void CreateDirectory()
        {
            try
            {
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);
            }
            catch (DirectoryNotFoundException ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
        /// <summary>
        /// Metodo que agrega una peticion de RequestID en el LOG del servidor
        /// </summary>
        /// <param name="strUserName">Nombre de usuario</param>
        /// <param name="strPassword">Password</param>
        /// <param name="strIdResult">ID de confirmacion que envia el proveedor al validar la peticion</param>
        public static void mtdAddRequestID(string strUserName, string strPassword, string carpeta, string tipo)
        {
            DateTime momento = DateTime.Now;
            string tiempo = momento.Hour + ":" + momento.Minute + ":" + momento.Second + ":" + momento.Millisecond;
            string fecha = momento.Day + "/" + momento.Month + "/" + momento.Year;
            Add(System.Environment.NewLine + "GetTResquestID" + "," + "request" + "," + fecha + " "+ tiempo + "," + strUserName + "," + strPassword + ",,,," + ";", carpeta, tipo);
        }

        public static void mtdAddRequestIDresponse(string strIdResult, string carpeta, string tipo)
        {
            DateTime momento = DateTime.Now;
            string tiempo = momento.Hour + ":" + momento.Minute + ":" + momento.Second + ":" + momento.Millisecond;
            Add("response" + "," + tiempo + "," + strIdResult + ";", carpeta, tipo);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="strUserName">Nombre de usuario</param>
        /// <param name="strIdResult">Id de peticion autorizada</param>
        /// <param name="strSKU">Codigo de la recarga</param>
        /// <param name="strOpAccount">Numero de telefono al que se se recarga</param>
        /// <param name="strAmount">Monto a recargar</param>
        /// <param name="strOpAccounResponse">Numero de telefono de respesta de proveedor</param>
        /// <param name="strRcodeResponse">Codigo de error de respuesta del proveedor</param>
        /// <param name="strRcodeDescriptionResponse">Descripcion del codigo de respuesta del proveedor</param>
        /// <param name="strOpAuthorizationResponse">Codigo de autorizacion de la transaccion</param>
        public static void mtdAddDot(string strUserName, string strIdResult, string strSKU, string strOpAccount, string strAmount, string carpeta, string tipo)
        {

            DateTime momento = DateTime.Now;
            string tiempo = momento.Hour + ":" + momento.Minute + ":" + momento.Second + ":" + momento.Millisecond;
            string fecha = momento.Day + "/" + momento.Month + "/" + momento.Year;
            Add(System.Environment.NewLine +
            "DoT" + "," + "request" + "," + fecha + Environment.NewLine + tiempo + "," + strUserName + "," + strIdResult + "," + strSKU +
            "," + strOpAccount + "," + strAmount + ";", carpeta, tipo);
            
        }

        public static void mtdAddDotresponse(string strOpAccountResponse, string strOpAuthorizationResponse, string strRcodeResponse, string strRcodeDescriptionResponse, 
                                             string strTransaccionid, string carpeta, string tipo)
        {
            DateTime momento = DateTime.Now;
            string tiempo = momento.Hour + ":" + momento.Minute + ":" + momento.Second + ":" + momento.Millisecond;
            string fecha = momento.Day + "/" + momento.Month + "/" + momento.Year;

            Add("response" + ", " + fecha +" "+ tiempo + "," + strOpAccountResponse + "," + strOpAuthorizationResponse + "," + strRcodeResponse + "," + strRcodeDescriptionResponse +
            "," + strTransaccionid + ";", carpeta, tipo);


            // aqui va la conexion a la base de datosp para la respuesta
            //string CadenaConexion = "Data Source=DESKTOP-MSP4R7M ;Initial Catalog=bdRecargas2; Integrated Security=True;";
           
                SqlConnection conexionSql = new SqlConnection(CadenaConexion);
                SqlCommand cmd = new SqlCommand("spRespuestaTel", conexionSql);
            cmd.CommandType = CommandType.StoredProcedure;
            //estaba empezando a insertar datos y ver de donde provenia los datos
            cmd.Parameters.Add("@transaction_id", SqlDbType.NVarChar);
            cmd.Parameters.Add("@rcode", SqlDbType.NVarChar);
            cmd.Parameters.Add("@rcode_description", SqlDbType.NVarChar);
            cmd.Parameters.Add("@op_account", SqlDbType.NVarChar);
            cmd.Parameters.Add("@op_authorization", SqlDbType.NVarChar);
            //asignamos el valor de los textbox a los parametros
            cmd.Parameters["@transaction_id"].Value = strTransaccionid;
            cmd.Parameters["@rcode"].Value = strRcodeResponse;
            cmd.Parameters["@rcode_description"].Value = strRcodeDescriptionResponse;
            cmd.Parameters["@op_account"].Value = strOpAccountResponse;
            cmd.Parameters["@op_authorization"].Value = strOpAuthorizationResponse;

            conexionSql.Open();
            cmd.ExecuteNonQuery();
            conexionSql.Close();
            //

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="strUserName">Nombre de usuario</param>
        /// <param name="strID">Id de usuario</param>
        /// <param name="strOpAccountResponse">Numero de telefono al que se se recarga</param>
        /// <param name="strRcodeResponse">Codigo de respuesta del proveedor</param>
        /// <param name="strRcodeDescriptionResponse">Descripcion del codigo de respuesta del proveedor</param>
        /// <param name="strstrOpAuthorizationResponse">Codigo de autorizacion de la transaccion</param>
        public static void mtdAddCheckTransaction(string strUserName, string strID, string carpeta, string tipo)
        {
            DateTime momento = DateTime.Now;
            string tiempo = momento.Hour + ":" + momento.Minute + ":" + momento.Second + ":" + momento.Millisecond;
            string fecha = momento.Day + "/" + momento.Month + "/" + momento.Year;
            Add(System.Environment.NewLine +
            "CheckTransaction" + "," + "request" + "," + fecha + " "+ tiempo + "," + strUserName + "," + strID + ",,,," + ";", carpeta, tipo);
        }

        public static void mtdAddCheckTransactionresponse(string strOpAccountResponse, string strOpAuthorizationResponse, string strRcodeResponse, 
                                                          string strRcodeDescriptionResponse, string strTransaccionid, string carpeta, string tipo)
        {
            DateTime momento = DateTime.Now;
            string tiempo = momento.Hour + ":" + momento.Minute + ":" + momento.Second + ":" + momento.Millisecond;
            string fecha = momento.Day + "/" + momento.Month + "/" + momento.Year;

            Add("response" + "," + fecha +" "+ tiempo + "," + strOpAccountResponse + "," + strOpAuthorizationResponse + "," + strRcodeResponse + "," + strRcodeDescriptionResponse 
                + "," + strTransaccionid + ";", carpeta, tipo);
        }

        public static void mtdAddConciliacion(string strop_account, string monto, string strCarriel, string op_authorization, string carpeta, string tipo)
        {
            
            Add(DateTime.Now + "," + strop_account + "," + monto + "," + strCarriel + "," + op_authorization + ";", carpeta, tipo);

            // aqui va la conexion a la base de datosp para la respuesta
            //string CadenaConexion = "Data Source=DESKTOP-MSP4R7M ;Initial Catalog=bdRecargas2; Integrated Security=True;";

            SqlConnection conexionSql = new SqlConnection(CadenaConexion);
            SqlCommand cmd = new SqlCommand("spConciliacion", conexionSql);
            cmd.CommandType = CommandType.StoredProcedure;
            //estaba empezando a insertar datos y ver de donde provenia los datos
            cmd.Parameters.Add("@strFecha", SqlDbType.DateTime);
            cmd.Parameters.Add("@strOpAccount", SqlDbType.NVarChar);
            cmd.Parameters.Add("@strMonto", SqlDbType.NVarChar);
            cmd.Parameters.Add("@strCarrier", SqlDbType.NVarChar);
            cmd.Parameters.Add("@strOpAuthorization", SqlDbType.NVarChar);
            //asignamos el valor de los textbox a los parametros
            cmd.Parameters["@strFecha"].Value = DateTime.Now;
            cmd.Parameters["@strOpAccount"].Value = strop_account;
            cmd.Parameters["@strMonto"].Value = monto;
            cmd.Parameters["@strCarrier"].Value = strCarriel;
            cmd.Parameters["@strOpAuthorization"].Value = op_authorization;

            conexionSql.Open();
            cmd.ExecuteNonQuery();
            conexionSql.Close();
            //
        }

        public static void mtdLogErrorresponse(string strError, string carpeta, string tipo)
        {
            DateTime momento = DateTime.Now;
            string tiempo = momento.Hour + ":" + momento.Minute + ":" + momento.Second + ":" + momento.Millisecond;
            string fecha = momento.Day + "/" + momento.Month + "/" + momento.Year;
            Add("CheckTransaction" + "," + "response" + "," + fecha +" "+ tiempo + "," + strError + ";", carpeta, tipo);
        }
    }
}

                          
    
   
                                                