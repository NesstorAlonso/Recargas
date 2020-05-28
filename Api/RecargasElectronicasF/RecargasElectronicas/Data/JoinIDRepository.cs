using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class JoinIDRepository
    {
        private readonly string _connectionString;
        public JoinIDRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        /*OBTENER ID Join*/
        public async Task<List<JoinID>> mtdObtenerPorIdPVjoin(int intIdPunVenta)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPuntoVenta_PVJoinU", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdPunVenta", intIdPunVenta));
                        var response = new List<JoinID>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueJoinID(reader));
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

        /*OBTENER TODO Join*/
        public async Task<List<JoinID>> mtdPVjoinUTodo()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spPuntoVenta_PVJoinUTodo", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<JoinID>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueJoinID(reader));
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
        private JoinID MapToValueJoinID(SqlDataReader reader)
        {
            return new JoinID()
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
                Nombre = reader["Nombre"].ToString(),
                intIdUsuario = reader["intIdUsuario"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdUsuario"],
            };
        }
    }
}
