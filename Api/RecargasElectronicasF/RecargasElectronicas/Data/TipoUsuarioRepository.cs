using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class TipoUsuarioRepository
    {
        private readonly string _connectionString;
        public TipoUsuarioRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<TipoUsuario>> mtdObtenerTipoUsuario()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spTipoUsuario_obtener_todos", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<TipoUsuario>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueTipoUsuario(reader));
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
        //Inicia siguiente metodo

        //public async Task<List<TipoUsuario>> mtdObtenerPorIdTipoUsuario(int intIdTipoUsuario)
        //{
        //    try
        //    {
        //        using (SqlConnection sql = new SqlConnection(_connectionString))
        //        {
        //            using (SqlCommand cmd = new SqlCommand("spOpciones_ObtenerPorId", sql))
        //            {
        //                cmd.CommandType = System.Data.CommandType.StoredProcedure;
        //                cmd.Parameters.Add(new SqlParameter("@intIdOpcion", intIdOpcion));
        //                var response = new List<Opciones>();
        //                await sql.OpenAsync();
        //                using (var reader = await cmd.ExecuteReaderAsync())
        //                {
        //                    while (await reader.ReadAsync())
        //                    {
        //                        response.Add(MapToValueOpciones(reader));
        //                    }
        //                }
        //                return response;
        //            }
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        throw new Exception("Error", e);
        //    }
        //}

        //Inicia siguiente metodo

        public async Task<bool> mtdInsertarTipoUsuario(string strDescripcion)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spTipoUsuario_Alta", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strDescripcion", strDescripcion));
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

        public async Task<bool> mtdCambiarTipoUsuario(int intIdTipoUsuario, string strDescripcion)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spTipoUsuario_Modificar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdTipoUsuario", intIdTipoUsuario));
                        cmd.Parameters.Add(new SqlParameter("@strDescripcion", strDescripcion));

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

        public async Task<bool> mtdBajaTipoUsuario(int intIdTipoUsuario)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spTipoUsuario_Baja", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdTipoUsuario", intIdTipoUsuario));
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

        public async Task<bool> mtdActivarTipoUsuario(int @intIdTipoUsuario)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spTipoUsuario_Activar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdTipoUsuario", intIdTipoUsuario));
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

        private TipoUsuario MapToValueTipoUsuario(SqlDataReader reader)
        {
            return new TipoUsuario()
            {
                intIdTipoUsuario = reader["intIdTipoUsuario"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdTipoUsuario"],
                strDescripcion = reader["strDescripcion"].ToString(),
                bitStatus = reader["bitStatus"] == DBNull.Value ? Convert.ToBoolean(false) : (bool)reader["bitStatus"]
            };
        }
    }
}
