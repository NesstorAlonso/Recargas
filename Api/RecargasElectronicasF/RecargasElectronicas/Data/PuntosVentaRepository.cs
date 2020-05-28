using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class PuntosVentaRepository
    {
        private readonly string _connectionString;
        public PuntosVentaRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        /*OBTENER TODOS*/
        public async Task<List<PuntosVenta>> mtdObtenerPuntosVenta()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPuntoVenta_ObtenerTodos", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<PuntosVenta>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValuePuntosVenta(reader));
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
        /*OBTENER ID*/
        public async Task<List<PuntosVenta>> mtdObtenerPorIdPuntosVenta(int intIdPunVenta)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPuntoVenta_ObtenerID", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdPunVenta", intIdPunVenta));
                        var response = new List<PuntosVenta>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValuePuntosVenta(reader));
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
        /*INSERTAR*/
        public async Task<bool> mtdInsertarPuntoVenta(string strDescripcion, string strCalle, string strNumExt, string strNumInt, string strCodPos, string strMunicipio, string strColonia, string strEstado, string strLatitud, string strLongitud, int intIdResponsable)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPuntoVenta_Alta", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strDescripcion", strDescripcion));
                        cmd.Parameters.Add(new SqlParameter("@strCalle", strCalle));
                        cmd.Parameters.Add(new SqlParameter("@strNumExt", strNumExt));
                        cmd.Parameters.Add(new SqlParameter("@strNumInt", strNumInt));
                        cmd.Parameters.Add(new SqlParameter("@strCodPos", strCodPos));
                        cmd.Parameters.Add(new SqlParameter("@strMunicipio", strMunicipio));
                        cmd.Parameters.Add(new SqlParameter("@strColonia", strColonia));
                        cmd.Parameters.Add(new SqlParameter("@strEstado", strEstado));
                        cmd.Parameters.Add(new SqlParameter("@strLatitud", strLatitud));
                        cmd.Parameters.Add(new SqlParameter("@strLongitud", strLongitud));
                        cmd.Parameters.Add(new SqlParameter("@intIdResponsable", intIdResponsable));


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
        /*MODIFICAR */
        public async Task<bool> mtdCambiarPuntoVenta(int intIdPunVenta, string strDescripcion, string strCalle, string strNumExt, string strNumInt, string strCodPos, string strMunicipio, string strColonia, string strEstado, string strLatitud, string strLongitud, int intIdResponsable)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPuntoVenta_Modificar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdPunVenta", intIdPunVenta));
                        cmd.Parameters.Add(new SqlParameter("@strDescripcion", strDescripcion));
                        cmd.Parameters.Add(new SqlParameter("@strCalle", strCalle));
                        cmd.Parameters.Add(new SqlParameter("@strNumExt", strNumExt));
                        cmd.Parameters.Add(new SqlParameter("@strNumInt", strNumInt));
                        cmd.Parameters.Add(new SqlParameter("@strCodPos", strCodPos));
                        cmd.Parameters.Add(new SqlParameter("@strMunicipio", strMunicipio));
                        cmd.Parameters.Add(new SqlParameter("@strColonia", strColonia));
                        cmd.Parameters.Add(new SqlParameter("@strEstado", strEstado));
                        cmd.Parameters.Add(new SqlParameter("@strLatitud", strLatitud));
                        cmd.Parameters.Add(new SqlParameter("@strLongitud", strLongitud));
                        cmd.Parameters.Add(new SqlParameter("@intIdResponsable", intIdResponsable));

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
        /*ELIMINAR */
        public async Task<bool> mtdEliminarPuntoVenta(int intIdPunVenta)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPuntoVenta_Eliminar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdPunVenta", intIdPunVenta));
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
        /* */
        /*
        public async Task<bool> mtdActivarAcuedoSLA(int intIdAcuerdoSLA)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spAcuerdosSLA_Activar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdAcuerdoSLA", intIdAcuerdoSLA));
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
        */
        /*MAPEO*/
        private PuntosVenta MapToValuePuntosVenta(SqlDataReader reader)
        {
            return new PuntosVenta()
            {
                intIdPunVenta = reader["intIdPunVenta"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdPunVenta"],
                strDescripcion = reader["strDescripcion"].ToString(),
                strCalle = reader["strCalle"].ToString(),
                strNumExt = reader["strNumExt"].ToString(),
                strNumInt = reader["strNumInt"].ToString(),
                strCodPos = reader["strCodPos"].ToString(),
                strMunicipio = reader["strMunicipio"].ToString(),
                strColonia = reader["strColonia"].ToString(),
                strEstado = reader["strEstado"].ToString(),
                strLatitud = reader["strLatitud"].ToString(),
                strLongitud = reader["strLongitud"].ToString(),
                intIdResponsable = reader["intIdResponsable"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdResponsable"],
            };
        }
    }
}
/// <summary>
/// //////////
/// </summary>