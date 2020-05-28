using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class VendedoresRepository
    {
        private readonly string _connectionString;
        public VendedoresRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<Vendedores>> mtdObtenerVendedores(string Id, char strEstatus)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtenerVendedoresPorRol", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", Id));
                        cmd.Parameters.Add(new SqlParameter("@strEstatus", strEstatus));
                        var response = new List<Vendedores>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueConsultaVendedores(reader));
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

        private Vendedores MapToValueConsultaVendedores(SqlDataReader reader)
        {
            return new Vendedores()
            {
                intId= reader["intId"]== DBNull.Value ? Convert.ToInt32(0) : (int)reader["intId"],
                UserName = reader["UserName"].ToString(),
                Email = reader["Email"].ToString(),
                PhoneNumber = reader["PhoneNumber"].ToString(),
                strNombre = reader["strNombre"].ToString(),
                strApaterno = reader["strApaterno"].ToString(),
                strAmaterno = reader["strAmaterno"].ToString(),
                Id = reader["Id"].ToString(),
                intNivel = reader["intNivel"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intNivel"],
                strIdPadre = reader["strIdPadre"].ToString(),
            };
        }

    }
}
