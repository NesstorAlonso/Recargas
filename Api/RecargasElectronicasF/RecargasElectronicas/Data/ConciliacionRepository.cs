using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class ConciliacionRepository
    {
        private readonly string _connectionString;
        public ConciliacionRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        /*OBTENER TODOS virgin*/
        public async Task<List<Conciliacion>> mtdObtenerConciliacion()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spConciliacion_ObtenerTodos", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<Conciliacion>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueConciliacion(reader));
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
        /*MAPEO Virgin*/
        private Conciliacion MapToValueConciliacion(SqlDataReader reader)
        {
            return new Conciliacion()
            {
                intIdConciliacion = reader["intIdConciliacion"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdConciliacion"],
                strCarrier = reader["strCarrier"].ToString(),
                strMonto = reader["strMonto"].ToString(),
                strOpAccount = reader["strOpAccount"].ToString(),
                strFecha = reader["strFecha"].ToString(),
                strOpAuthorization = reader["strOpAuthorization"].ToString()

            };
        }
    }
}
