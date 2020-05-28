using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class SkuMovistarRepository
    {
        private readonly string _connectionString;
        public SkuMovistarRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        /*OBTENER TODOS*/
        public async Task<List<SkuMovistar>> mtdObtenerSkuMovistar()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spSkuMovistar_ObtenerSku", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<SkuMovistar>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueSkuMovistar(reader));
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
        private SkuMovistar MapToValueSkuMovistar(SqlDataReader reader)
        {
            return new SkuMovistar()
            {
                intIdSkuMovistar = reader["intIdSkuMovistar"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdSkuMovistar"],
                strSkuCodeMovi = reader["strSkuCodeMovi"].ToString(),
                strMontoMovi = reader["strMontoMovi"].ToString(),

            };
        }
    }
}
