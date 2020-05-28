using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class UsuariosRepository
    {
        private readonly string _connectionString;
        public UsuariosRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<Usuarios>> mtdObtenerUsuarios()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuarios_obtener_todos", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<Usuarios>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueUsuarios(reader));
                            }
                        }
                        return response;
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception("Error", e);
            }
        }

        public async Task<List<Usuarios>> mtdObtenerPorIdUsuarios(int intIdUsuario)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuario_ObtenerID", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdUsuario", intIdUsuario));
                        var response = new List<Usuarios>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueUsuarios(reader));
                            }
                        }
                        return response;
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception("Error", e);
            }
        }


        ///
        public async Task<List<Usuarios>> mtdObtenerPorIdPuntoVenta(int intIdPuntoVenta)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spOpciones_ObtenerPorIdPuntoVenta", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdPuntoVenta", intIdPuntoVenta));
                        var response = new List<Usuarios>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueUsuarios(reader));
                            }
                        }
                        return response;
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception("Error", e);
            }
        }

        ///



        public async Task<bool> mtdInsertarUsuarios(string strNombre, string strApp, string strApm, string strContrasena, string strCorreo, string strTelefono,
            int intIdTipoUsuario, int intIdPerfil, DateTime dtmFechaNac, bool bitSexo, bool bitPersonaFiscal, string strRFC, int intIdPuntoVenta, int intIdDistribuidor)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuario_Alta", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strNombre", strNombre));
                        cmd.Parameters.Add(new SqlParameter("@strApp", strApp));
                        cmd.Parameters.Add(new SqlParameter("@strApm", strApm));
                        cmd.Parameters.Add(new SqlParameter("@strContrasena", strContrasena));
                        cmd.Parameters.Add(new SqlParameter("@strCorreo", strCorreo));
                        cmd.Parameters.Add(new SqlParameter("@strTelefono", strTelefono));
                        cmd.Parameters.Add(new SqlParameter("@intIdTipoUsuario", intIdTipoUsuario));
                        cmd.Parameters.Add(new SqlParameter("@intIdPerfil", intIdPerfil));
                        cmd.Parameters.Add(new SqlParameter("@dtmFechaNac", dtmFechaNac));
                        cmd.Parameters.Add(new SqlParameter("@bitSexo", bitSexo));
                        cmd.Parameters.Add(new SqlParameter("@bitPersonaFiscal", bitPersonaFiscal));
                        cmd.Parameters.Add(new SqlParameter("@strRFC", strRFC));
                        cmd.Parameters.Add(new SqlParameter("@intIdPuntoVenta", intIdPuntoVenta));
                        cmd.Parameters.Add(new SqlParameter("@intIdDistribuidor", intIdDistribuidor));
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

        public async Task<bool> mtdCambiarUsuarios(int intIdUsuario, string strNombre, string strApp, string strApm, string strContrasena, string strCorreo, string strTelefono,
            int intIdTipoUsuario, int intIdPerfil, DateTime dtmFechaNac, bool bitSexo, bool bitPersonaFiscal, string strRFC, int intIdPuntoVenta, int intIdDistribuidor)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuario_Modificar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdUsuario", intIdUsuario));
                        cmd.Parameters.Add(new SqlParameter("@strNombre", strNombre));
                        cmd.Parameters.Add(new SqlParameter("@strApp", strApp));
                        cmd.Parameters.Add(new SqlParameter("@strApm", strApm));
                        cmd.Parameters.Add(new SqlParameter("@strContrasena", strContrasena));
                        cmd.Parameters.Add(new SqlParameter("@strCorreo", strCorreo));
                        cmd.Parameters.Add(new SqlParameter("@strTelefono", strTelefono));
                        cmd.Parameters.Add(new SqlParameter("@intIdTipoUsuario", intIdTipoUsuario));
                        cmd.Parameters.Add(new SqlParameter("@intIdPerfil", intIdPerfil));
                        cmd.Parameters.Add(new SqlParameter("@dtmFechaNac", dtmFechaNac));
                        cmd.Parameters.Add(new SqlParameter("@bitSexo", bitSexo));
                        cmd.Parameters.Add(new SqlParameter("@bitPersonaFiscal", bitPersonaFiscal));
                        cmd.Parameters.Add(new SqlParameter("@strRFC", strRFC));
                        cmd.Parameters.Add(new SqlParameter("@intIdPuntoVenta", intIdPuntoVenta));
                        cmd.Parameters.Add(new SqlParameter("@intIdDistribuidor", intIdDistribuidor));

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

        /*ELIMINAR */
        public async Task<bool> mtdEliminarUsuario(int intIdUsuario)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuario_Eliminar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdUsuario", intIdUsuario));
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

        //INGRESO AL LOGIN

        public async Task<bool> mtdLogin(string strCorreo, string strContrasena)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuario_Login", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strCorreo", strCorreo));
                        cmd.Parameters.Add(new SqlParameter("@strContrasena", strContrasena));                        
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

        //TERMINA LOGIN

        private Usuarios MapToValueUsuarios(SqlDataReader reader)
        {
            return new Usuarios()
            {
                intIdUsuario = reader["intIdUsuario"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdUsuario"],
                strNombre = reader["strNombre"].ToString(),
                strApp = reader["strApp"].ToString(),
                strApm = reader["strApm"].ToString(),
                strContrasena = reader["strContrasena"].ToString(),
                strCorreo = reader["strCorreo"].ToString(),
                strTelefono = reader["strTelefono"].ToString(),
                intIdTipoUsuario = reader["intIdTipoUsuario"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdTipoUsuario"],
                intIdPerfil = reader["intIdPerfil"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdPerfil"],
                dtmFechaNac = Convert.ToDateTime( reader["dtmFechaNac"].ToString()),
                bitSexo = reader["bitSexo"] == DBNull.Value ? Convert.ToBoolean(false) : (bool)reader["bitSexo"],
                bitPersonaFiscal = reader["bitPersonaFiscal"] == DBNull.Value ? Convert.ToBoolean(false) : (bool)reader["bitPersonaFiscal"],
                strRFC = reader["strRFC"].ToString(),
                intIdPuntoVenta = reader["intIdPuntoVenta"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdPuntoVenta"],
                intIdDistribuidor = reader["intIdDistribuidor"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdDistribuidor"]
            };
        }
    }
}
