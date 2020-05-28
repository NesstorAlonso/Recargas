using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class SkuUnefonRepository
    {
        private readonly string _connectionString;
        public SkuUnefonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        /*OBTENER TODOS*/
        public async Task<List<SkuUnefon>> mtdObtenerSkuUnefon()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spSkuUnefon_ObtenerSku", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<SkuUnefon>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueSkuUnefon(reader));
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



        /*MAPEO*/
        private SkuUnefon MapToValueSkuUnefon(SqlDataReader reader)
        {
            return new SkuUnefon()
            {
                intIdSkuUnefon = reader["intIdSkuUnefon"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdSkuUnefon"],
                strSkuCodeUnefon = reader["strSkuCodeUnefon"].ToString(),
                strMontoUnefon = reader["strMontoUnefon"].ToString(),

            };
        }
    }
}
