using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class PerfilRepository
    {
        private readonly string _connectionString;
        public PerfilRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        /*OBTENER TODOS*/
        public async Task<List<Perfil>> mtdObtenerPerfil()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPerfil_obtener_todos", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<Perfil>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValuePerfil(reader));
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
        /*OBTENER ID*/
        public async Task<List<Perfil>> mtdObtenerPorIdPerfil(int intIdPerfil)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPerfil_ObtenerID", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdPerfil", intIdPerfil));
                        var response = new List<Perfil>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValuePerfil(reader));
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
        /*INSERTAR*/
        public async Task<bool> mtdInsertarPerfil(string strDescripcion)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPerfil_Alta", sql))
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
        /*MODIFICAR */
        public async Task<bool> mtdCambiarPerfil(int intIdPerfil, string strDescripcion)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPerfil_Modificar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdPerfil", intIdPerfil));
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
        /*ELIMINAR */
        public async Task<bool> mtdEliminarPerfil(int intIdPerfil)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPerfil_Eliminar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdPerfil", intIdPerfil));
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
        /*DESACTIVAR */
        public async Task<bool> mtdBajaPerfil(int intIdPerfil)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPerfil_Baja", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdPerfil", intIdPerfil));
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

        /*ACTIVAR */
        public async Task<bool> mtdActivarPerfil(int intIdPerfil)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPerfil_Activar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdPerfil", intIdPerfil));
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
       
        /*MAPEO*/
        private Perfil MapToValuePerfil(SqlDataReader reader)
        {
            return new Perfil()
            {
                intIdPerfil = reader["intIdPerfil"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdPerfil"],
                strDescripcion = reader["strDescripcion"].ToString(),
                bitStatus = reader["bitStatus"] == DBNull.Value ? Convert.ToBoolean(false) : (bool)reader["bitStatus"]
            };
        }
    }
}