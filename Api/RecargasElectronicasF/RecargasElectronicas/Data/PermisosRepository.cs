using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class PermisosRepository
    {
        private readonly string _connectionString;
        public PermisosRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        /*OBTENER TODOS*/
        public async Task<List<Permisos>> mtdObtenerPermisos()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPermisos_obtener_todos", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<Permisos>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValuePermisos(reader));
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
        public async Task<bool> mtdInsertarPermisos(int intIdPerfil, int intIdOpcion)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPermisos_Alta", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdPerfil", intIdPerfil));
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
        
        /*ELIMINAR */
        public async Task<bool> mtdEliminarPermisos(int intIdPerfil, int intIdOpcion)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPermisos_Eliminar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdPerfil", intIdPerfil));
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
        

        /*MAPEO*/
        private Permisos MapToValuePermisos(SqlDataReader reader)
        {
            return new Permisos()
            {
                intIdPerfil = reader["intIdPerfil"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdPerfil"],
                intIdOpcion = reader["intIdOpcion"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdOpcion"]
            };
        }
    }
}
