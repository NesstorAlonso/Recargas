using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class DiasServicioRepository
    {
        private readonly string _connectionString;
        public DiasServicioRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<bool> mtdAgregarDia(string strVendedor, string strDia)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spDiasServicio_Alta", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strVendedor", strVendedor));
                        cmd.Parameters.Add(new SqlParameter("@strDia", strDia));
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
        //
        //metodo que obtiene los dias de servicio por el vendedor
        public async Task<List<DiasServicio>> mtdObtenerDiasServicio(string strVendedor)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtenerDiasServicioUsuario", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strVendedor", strVendedor));
                        var response = new List<DiasServicio>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueObtenerDias(reader));
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
        //
        /*ELIMINAR */
        public async Task<bool> mtdEliminarDia(string strVendedor, string strDia)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spDiasSErvicio_Eliminar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strVendedor", strVendedor));
                        cmd.Parameters.Add(new SqlParameter("@strDia", strDia));
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

        //
        //Hace el mapeo de los dias
        private DiasServicio MapToValueObtenerDias(SqlDataReader reader)
        {
            return new DiasServicio()
            {
                //dato que lee y devuelve.  
                strDia = reader["strDia"].ToString(),

            };
        }
        //

    }
}
