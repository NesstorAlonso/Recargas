using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class ModificarUsuarioRepository
    {
        private readonly string _connectionString;
        public ModificarUsuarioRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        //En esta parte se realiza la insercion y a la vez modificacion de la tabla asp net user.
        //
        //
        public async Task<bool> mtdModificarUsuariosDistribuidores(string UserName, bool bitTipoPersona, string strNombre, string strApaterno, string strAmaterno, DateTime dtmFechaNacimiento, string strRFC,
           bool bitGenero, string strCompania, string strCp, string strEstado, string strMunicipio, string strColonia, string strTVialidad, string strCalle, string strNumExt, string strNumInt, string strContacto, string strComercio, string strIdPadre, int intNivel)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuarioDistribuidor_Modificar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                        cmd.Parameters.Add(new SqlParameter("@bitTipoPersona", bitTipoPersona));
                        cmd.Parameters.Add(new SqlParameter("@strNombre", strNombre));
                        cmd.Parameters.Add(new SqlParameter("@strApaterno", strApaterno));
                        cmd.Parameters.Add(new SqlParameter("@strAmaterno", strAmaterno));
                        cmd.Parameters.Add(new SqlParameter("@dtmFechaNacimiento", dtmFechaNacimiento));
                        cmd.Parameters.Add(new SqlParameter("@strRFC", strRFC));
                        cmd.Parameters.Add(new SqlParameter("@bitGenero", bitGenero));
                        cmd.Parameters.Add(new SqlParameter("@strCompania", strCompania));
                        cmd.Parameters.Add(new SqlParameter("@strCp", strCp));
                        cmd.Parameters.Add(new SqlParameter("@strEstado", strEstado));
                        cmd.Parameters.Add(new SqlParameter("@strMunicipio", strMunicipio));
                        cmd.Parameters.Add(new SqlParameter("@strColonia", strColonia));
                        cmd.Parameters.Add(new SqlParameter("@strTVialidad", strTVialidad));
                        cmd.Parameters.Add(new SqlParameter("@strCalle", strCalle));
                        cmd.Parameters.Add(new SqlParameter("@strNumExt", strNumExt));
                        cmd.Parameters.Add(new SqlParameter("@strNumInt", strNumInt));
                        cmd.Parameters.Add(new SqlParameter("@strContacto", strContacto));
                        cmd.Parameters.Add(new SqlParameter("@strComercio", strComercio));
                        cmd.Parameters.Add(new SqlParameter("@strIdPadre", strIdPadre));
                        cmd.Parameters.Add(new SqlParameter("@intNivel", intNivel));

                        await sql.OpenAsync();
                        await cmd.ExecuteNonQueryAsync();
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                return false;
                throw new Exception("Error", e);
            }
        }

        //
        public async Task<bool> mtdModificarVendedor(string UserName, string strNombre, string strApaterno, string strAmaterno, DateTime dtmHoraInicio, DateTime dtmHoraFin, string strEstatus, string strIdPadre, int intNivel)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuarioVendedor_Modificar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                        cmd.Parameters.Add(new SqlParameter("@strNombre", strNombre));
                        cmd.Parameters.Add(new SqlParameter("@strApaterno", strApaterno));
                        cmd.Parameters.Add(new SqlParameter("@strAmaterno", strAmaterno));

                        cmd.Parameters.Add(new SqlParameter("@dtmHoraInicio", dtmHoraInicio));
                        cmd.Parameters.Add(new SqlParameter("@dtmHoraFin", dtmHoraFin));
                        cmd.Parameters.Add(new SqlParameter("@strEstatus", strEstatus));
                        cmd.Parameters.Add(new SqlParameter("@strIdPadre", strIdPadre));
                        cmd.Parameters.Add(new SqlParameter("@intNivel", intNivel));

                        await sql.OpenAsync();
                        await cmd.ExecuteNonQueryAsync();
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                return false;
                throw new Exception("Error", e);
            }
        }
        //

        public async Task<bool> mtdEditarVendedor(string Id, string strNombre, string strApaterno, string strAmaterno, DateTime dtmHoraInicio, DateTime dtmHoraFin, string strEstatus)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuarioVendedorEditar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", Id));
                        cmd.Parameters.Add(new SqlParameter("@strNombre", strNombre));
                        cmd.Parameters.Add(new SqlParameter("@strApaterno", strApaterno));
                        cmd.Parameters.Add(new SqlParameter("@strAmaterno", strAmaterno));

                        cmd.Parameters.Add(new SqlParameter("@dtmHoraInicio", dtmHoraInicio));
                        cmd.Parameters.Add(new SqlParameter("@dtmHoraFin", dtmHoraFin));
                        cmd.Parameters.Add(new SqlParameter("@strEstatus", strEstatus));

                        await sql.OpenAsync();
                        await cmd.ExecuteNonQueryAsync();
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                return false;
                throw new Exception("Error", e);
            }
        }
        //


    }
}
