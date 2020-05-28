using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class AddCompaniaRepository
    {
        private readonly string _connectionString;
        public AddCompaniaRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public async Task<bool> mtdAgregarCompania(string strDescripcion, string strStatus, string imgLogo)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spAltaCompania", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strDescripcion", strDescripcion));
                        cmd.Parameters.Add(new SqlParameter("@strStatus", strStatus));
                        cmd.Parameters.Add(new SqlParameter("@imgLogo", imgLogo));                       
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

        //private AddCompania MapToValueAddCompania(SqlDataReader reader)
        //{
        //    return new AddCompania()
        //    {
        //        intIdCompania = reader["intIdCompania"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdCompania"],
        //        strDescripcion = reader["strDescripcion"].ToString(),
        //        strStatus = reader["strStatus"].ToString()
               
               
        //    };
        //}
    }
}
