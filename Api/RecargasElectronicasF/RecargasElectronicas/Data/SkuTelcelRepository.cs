using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class SkuTelcelRepository
    {
        private readonly string _connectionString;
        public SkuTelcelRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        /// <summary>
        public async Task<List<SkuTelcel>> mtdSkuPagatae_ObtenerSku(string Sku)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spSkuPagatae_ObtenerSku", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Sku", Sku));
                        var response = new List<SkuTelcel>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueSkuTelcel(reader));
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

        /*MAPEO SkuPagaqui*/
        private SkuTelcel MapToValueSkuTelcel(SqlDataReader reader)
        {
            return new SkuTelcel()
            {
                intIdSkuTelcel = reader["intIdSkuTelcel"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdSkuTelcel"],
                Sku = reader["Sku"].ToString(),
                Monto = reader["Monto"].ToString()

            };
        }

        /// </summary>
    }
}
