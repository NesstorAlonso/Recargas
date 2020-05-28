using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class ComisionRepository
    {
        private readonly string _connectionString;
        public ComisionRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        /// <summary>
        public async Task<bool> mtdComision_Alta(string strIdUsuario, string strSku, decimal decComision, string strTipo, string strUnidad)
        {
                try
                {
                    using (SqlConnection sql = new SqlConnection(_connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand("spComisiones_Alta", sql))
                        {
                            cmd.CommandType = System.Data.CommandType.StoredProcedure;
                            cmd.Parameters.Add(new SqlParameter("@strIdUsuario", strIdUsuario));
                            cmd.Parameters.Add(new SqlParameter("@strSku", strSku));
                            cmd.Parameters.Add(new SqlParameter("@decComision", decComision));
                            cmd.Parameters.Add(new SqlParameter("@strTipo", strTipo));
                            cmd.Parameters.Add(new SqlParameter("@strUnidad", strUnidad));


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

        public async Task<List<Comision>> mtdComision_Obtener_ID(string strIdUsuario)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spComisiones_Obtener_ID", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuario", strIdUsuario));
                        var response = new List<Comision>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueComision(reader));
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

        public async Task<List<Comision>> mtdComision_ObtenerTodas()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spComisiones_ObtenerTodas", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<Comision>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueComision(reader));
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


        public async Task<bool> mtdModificarComision(int intIdComision, string strIdUsuario, string strSku, decimal decComision, string strTipo, string strUnidad)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spComisiones_Modificar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdComision", intIdComision));
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuario", strIdUsuario));
                        cmd.Parameters.Add(new SqlParameter("@strSku", strSku));
                        cmd.Parameters.Add(new SqlParameter("@decComision", decComision));
                        cmd.Parameters.Add(new SqlParameter("@strTipo", strTipo));
                        cmd.Parameters.Add(new SqlParameter("@strUnidad", strUnidad));

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




        /*MAPEO SkuPagaqui*/
        private Comision MapToValueComision(SqlDataReader reader)
        {
            return new Comision()
            {
                intIdComision = reader["intIdComision"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdComision"],
                strIdUsuario = reader["strIdUsuario"].ToString(),
                strSku = reader["strSku"].ToString(),
                decComision = reader["decComision"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["decComision"], 
                strTipo = reader["strTipo"].ToString(),
                strUnidad = reader["strUnidad"].ToString()
            };
        }


    }


    public class Comision2Repository
    {
        private readonly string _connectionString;
        public Comision2Repository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<Comision2>> mtdComision_Obtener_IDComision(int intIdComision)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spComisiones_Obtener_IDComision", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdComision", intIdComision));
                        var response = new List<Comision2>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueComision2(reader));
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
        private Comision2 MapToValueComision2(SqlDataReader reader)
        {
            return new Comision2()
            {
                intIdComision = reader["intIdComision"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdComision"],
                strSku = reader["strSku"].ToString(),
                strTipo = reader["strTipo"].ToString(),
                decComision = reader["decComision"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["decComision"],
                strUnidad = reader["strUnidad"].ToString()
            };
        }

    }


}
