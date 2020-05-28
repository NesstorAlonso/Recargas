using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class SkuRecargaquiRepository
    {
        private readonly string _connectionString;
        public SkuRecargaquiRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        


        public async Task<List<SkuRecargaqui>> mtdSkuRecargaqui_ObtenerSku(string name)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spSkuRecargaqui_ObtenerSku", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@name", name));
                        var response = new List<SkuRecargaqui>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueSkuRecargaqui(reader));
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
        private SkuRecargaqui MapToValueSkuRecargaqui(SqlDataReader reader)
        {
            return new SkuRecargaqui()
            {
                intIdRecargaqui = reader["intIdRecargaqui"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdRecargaqui"],
                name = reader["name"].ToString(),
                sku = reader["sku"].ToString(),
                monto = reader["monto"].ToString(),
                info = reader["info"].ToString(),

            };
        }
    }
}
