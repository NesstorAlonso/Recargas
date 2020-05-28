using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class SkuAttRepository
    {
        private readonly string _connectionString;
        public SkuAttRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        /*OBTENER TODOS*/
        public async Task<List<SkuAtt>> mtdObtenerSkuAtt()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spSkuAtt_ObtenerSku", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<SkuAtt>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueSkuAtt(reader));
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
        private SkuAtt MapToValueSkuAtt(SqlDataReader reader)
        {
            return new SkuAtt()
            {
                intIdSkuAtt = reader["intIdSkuAtt"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdSkuAtt"],
                strSkuCodeAtt = reader["strSkuCodeAtt"].ToString(),
                strMontoAtt = reader["strMontoAtt"].ToString(),

            };
        }
    }
}
