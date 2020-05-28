using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class UsuarioPVJoinRepository
    {

            private readonly string _connectionString;
            public UsuarioPVJoinRepository(string connectionString)
            {
                _connectionString = connectionString;
            }

            /*OBTENER ID Join*/
            public async Task<List<UsuarioPVJoin>> mtdUsuarioJoinPVTodo()
            {
                try
                {
                    using (SqlConnection sql = new SqlConnection(_connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand("spUsuario_PPVJoin", sql))
                        {
                            cmd.CommandType = System.Data.CommandType.StoredProcedure;
                            var response = new List<UsuarioPVJoin>();
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
            private UsuarioPVJoin MapToValueJoinID(SqlDataReader reader)
            {
                return new UsuarioPVJoin()
                {
                    intIdUsuario = reader["intIdUsuario"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdUsuario"],
                    Nombre = reader["Nombre"].ToString(),
                    strCorreo = reader["strCorreo"].ToString(),
                    strDescripcion = reader["strDescripcion"].ToString(),
                    NombrePerfil = reader["NombrePerfil"].ToString(),
                    intIdDistribuidor = reader["intIdDistribuidor"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdDistribuidor"],
                };
            }
     
    }
}
