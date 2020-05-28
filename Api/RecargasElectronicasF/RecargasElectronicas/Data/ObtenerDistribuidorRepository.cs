using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class ObtenerDistribuidorRepository
    {

        private readonly string _connectionString;
        public ObtenerDistribuidorRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        /*OBTENER ID Join*/
        public async Task<List<ObtenerDistribuidor>> mtdObtenerDistribuidor(int intIdDistribuidor)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuarios_Prueba", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdDistribuidor", intIdDistribuidor));
                        var response = new List<ObtenerDistribuidor>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueDistribuidor(reader));
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



        /*OBTENER ID 2*/
        public async Task<List<ObtenerDistribuidor>> mtdObtenerDistribuidor2(int intIdUsuario)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuarios_DistribuidorPrueba", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdUsuario", intIdUsuario));
                        var response = new List<ObtenerDistribuidor>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueDistribuidor(reader));
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


        public async Task<List<ObtenerDistribuidor>> mtdObtenerDistribuidor3(int intIdDistribuidor)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuarios_DistribuidorPrueba2", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdDistribuidor", intIdDistribuidor));
                        var response = new List<ObtenerDistribuidor>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueDistribuidor(reader));
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
        private ObtenerDistribuidor MapToValueDistribuidor(SqlDataReader reader)
        {
            return new ObtenerDistribuidor()
            {
                intIdUsuario = reader["intIdUsuario"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdUsuario"],
                Nombre = reader["Nombre"].ToString(),
                //intIdDistribuidor = reader["intIdDistribuidor"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdDistribuidor"],
            };
        }
    }
}