using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class LogoRepository
    {
        private readonly string _connectionString;
        public LogoRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        //mtd para agregar un logo.
        public async Task<bool> mtdSubirLogo(Logo logo)
        {
            SqlParameter blobParam = new SqlParameter("@imgLogo", SqlDbType.VarBinary, logo.imgLogo.Length);
            blobParam.Value = logo.imgLogo;
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spSubir_Logo", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuario", logo.strIdUsuario));
                        cmd.Parameters.Add(blobParam); //BASE 64 DE LA IMAGEN
                        cmd.Parameters.Add(new SqlParameter("@strNomLogo", logo.strNomLogo));
                        cmd.Parameters.Add(new SqlParameter("@strExtensionLG", logo.strExtensionLG));
                        cmd.Parameters.Add(new SqlParameter("@strLeyenda", logo.strLeyenda));
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
        //Metodo para obtener el logo del usuario logeado.
        public async Task<List<Obtenerlogo>> mtdObtenerLogo(string strIdUsuario)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtener_logo", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuario", strIdUsuario));
                        var response = new List<Obtenerlogo>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueObtenerLogo(reader));
                            }
                        }
                        return response;
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception("Error: ", e);
            }
        }

        //inicia el mapeo de los depositos para poder consultar
        private Obtenerlogo MapToValueObtenerLogo(SqlDataReader reader)
        {
            return new Obtenerlogo()
            {
                strIdUsuario = reader["strIdUsuario"].ToString(),
                imgLogo = (byte[])(reader["imgLogo"]),
                strNomLogo = reader["strNomLogo"].ToString(),
                strExtensionLG = reader["strExtensionLG"].ToString(),
                strLeyenda = reader["strLeyenda"].ToString()
            };
        }
        //
    }
}
