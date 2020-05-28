using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class SkuPagaquiRepository
    {
        private readonly string _connectionString;
        public SkuPagaquiRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        /// <summary>
        public async Task<List<SkuPagaqui>> mtdSkuPagaqui_ObtenerSku(string Nombre)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spSkuPagaqui_ObtenerSku", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Nombre", Nombre));
                        var response = new List<SkuPagaqui>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueSkuPagaqui(reader));
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
        private SkuPagaqui MapToValueSkuPagaqui(SqlDataReader reader)
        {
            return new SkuPagaqui()
            {
                intIdSkusPagaqui = reader["intIdSkusPagaqui"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdSkusPagaqui"],
                Sku = reader["Sku"].ToString(),
                Monto = reader["Monto"].ToString(),
                Nombre = reader["Nombre"].ToString()


            };
        }

        /// </summary>

    }
}
