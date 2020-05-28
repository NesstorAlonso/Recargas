using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols;
using OfficeOpenXml;
using OfficeOpenXml.Table;
using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class NUsersRepository
    {
        private readonly string _connectionString;
        public NUsersRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<NUsers>> mtdObtenerNUsuarios()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spNUsers_ObtenerTodos", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<NUsers>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueNUsers(reader));
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

        public async Task<List<NUsers2>> mtdNUsers_ID(string UserName)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spNUsers_ID", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                        var response = new List<NUsers2>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueNUsers2(reader));
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



        private NUsers MapToValueNUsers(SqlDataReader reader)
        {
            return new NUsers()
            {
                intId = reader["intId"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intId"],
                Id = reader["Id"].ToString(),
                UserName = reader["UserName"].ToString(),
                Email = reader["Email"].ToString(),
                PhoneNumber = reader["PhoneNumber"].ToString(),
                strNombre = reader["strNombre"].ToString(),
                strApaterno = reader["strApaterno"].ToString(),
                strAmaterno = reader["strAmaterno"].ToString()
            };
        }

        private NUsers2 MapToValueNUsers2(SqlDataReader reader)
        {
            return new NUsers2()
            {
                Id = reader["Id"].ToString()
            };
        }





    }
}
