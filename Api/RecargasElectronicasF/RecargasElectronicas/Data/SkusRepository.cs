using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class SkusRepository
    {
        private readonly string _connectionString;
        public SkusRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        /*OBTENER TODOS virgin*/
        public async Task<List<SkusVirgin>> mtdObtenerSkuVirgin()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spSkuVirgin_ObtenerSku", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<SkusVirgin>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueSkusVirgin(reader));
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

        /*OBTENER TODOS tuenti*/
        public async Task<List<SkusTuenti>> mtdObtenerSkuTuenti()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spSkuTuenti_ObtenerSku", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<SkusTuenti>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueSkusTuenti(reader));
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

        /*OBTENER TODOS MazTi*/
        public async Task<List<SkusMazTi>> mtdObtenerSkuMazTi()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spSkuMazTi_ObtenerSku", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<SkusMazTi>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueSkusMazTi(reader));
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

        /*OBTENER TODOS Weex*/
        public async Task<List<SkusWeex>> mtdObtenerSkuWeex()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spSkuWeex_ObtenerSku", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<SkusWeex>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueSkusWeex(reader));
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

        /*OBTENER TODOS Servicios*/
        public async Task<List<SkusServicios>> mtdObtenerSkuServicios()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spSkuServicios_ObtenerSku", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<SkusServicios>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueSkusServicios(reader));
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
        private SkusVirgin MapToValueSkusVirgin(SqlDataReader reader)
        {
            return new SkusVirgin()
            {
                intIdSkuVirgin = reader["intIdSkuVirgin"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdSkuVirgin"],
                strSkuCodeVirgin = reader["strSkuCodeVirgin"].ToString(),
                strMontoVirgin = reader["strMontoVirgin"].ToString(),

            };
        }


        /*MAPEO Tuenti*/
        private SkusTuenti MapToValueSkusTuenti(SqlDataReader reader)
        {
            return new SkusTuenti()
            {
               
                intIdSkuTuenti = reader["intIdSkuTuenti"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdSkuTuenti"],
                strSkuCodeTuenti = reader["strSkuCodeTuenti"].ToString(),
                strMontoTuenti = reader["strMontoTuenti"].ToString(),

            };
        }

        /*MAPEO MazTiempo*/
        private SkusMazTi MapToValueSkusMazTi(SqlDataReader reader)
        {
            return new SkusMazTi()
            {

                intIdSkuMazTi = reader["intIdSkuMazTi"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdSkuMazTi"],
                strSkuCodeMazTi = reader["strSkuCodeMazTi"].ToString(),
                strMontoMazTi = reader["strMontoMazTi"].ToString(),

            };
        }

        /*MAPEO Weex*/
        private SkusWeex MapToValueSkusWeex(SqlDataReader reader)
        {
            return new SkusWeex()
            {

                intIdSkuWeex = reader["intIdSkuWeex"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdSkuWeex"],
                strSkuCodeWeex = reader["strSkuCodeWeex"].ToString(),
                strMontoWeex = reader["strMontoWeex"].ToString(),

            };
        }

        /*MAPEO SkusServicios*/
        private SkusServicios MapToValueSkusServicios(SqlDataReader reader)
        {
            return new SkusServicios()
            {

                intIdSkuServicio = reader["intIdSkuServicio"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdSkuServicio"],
                strSkuDescripcion = reader["strSkuDescripcion"].ToString(),
                strSkuCodeServicio = reader["strSkuCodeServicio"].ToString(),

            };
        }

    }
}
