using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using RecargasElectronicas.Entities;

namespace RecargasElectronicas.Data
{
    public class OpcionesRepository
    {
        private readonly string _connectionString;
        public OpcionesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<Opciones>> mtdObtenerOpciones()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spOpciones_obtener_todos", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<Opciones>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueOpciones(reader));
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

        public async Task<List<Opciones>> mtdObtenerPorIdOpciones(int intIdOpcion)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spOpciones_ObtenerPorId", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdOpcion", intIdOpcion));
                        var response = new List<Opciones>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueOpciones(reader));
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

     
        public async Task<bool> mtdInsertarOpciones(string strOpcion)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spOpciones_Ingresar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strOpcion", strOpcion));
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

        public async Task<bool> mtdCambiarOpciones(int intIdOpcion, string strOpcion)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spOpciones_Cambiar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdOpcion", intIdOpcion));
                        cmd.Parameters.Add(new SqlParameter("@strOpcion", strOpcion));
                        
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

        public async Task<bool> mtdBajaOpciones(int intIdOpcion)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spAcuerdosSLA_Baja", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdOpcion", intIdOpcion));
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

        public async Task<bool> mtdActivarOpciones(int @intIdOpcion)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spOpciones_Activar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdOpcion", intIdOpcion));
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

        private Opciones MapToValueOpciones(SqlDataReader reader)
        {
            return new Opciones()
            {
                intIdOpcion = reader["intIdOpcion"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdOpcion"],
                strOpcion = reader["strOpcion"].ToString(),
                bitStatus = reader["bitStatus"] == DBNull.Value ? Convert.ToBoolean(false) : (bool)reader["bitStatus"]
            };
        }
    }
}
