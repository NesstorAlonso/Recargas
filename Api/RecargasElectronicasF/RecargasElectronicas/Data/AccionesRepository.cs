using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class AccionesRepository
    {
        private readonly string _connectionString;
        public AccionesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<bool> mtdAgregarAccion(string claveUsuario, string strPermiso)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spAcciones_Alta", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@claveUsuario", claveUsuario));
                        cmd.Parameters.Add(new SqlParameter("@strPermiso", strPermiso));
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

        //metodo que obtiene las Acciones(Permisos,Complementos) por usuario
        public async Task<List<AsignaAcciones>> mtdObtenerAsignaAcciones(string claveUsuario)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtenerAccionesUsuario", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@claveUsuario", claveUsuario));
                        var response = new List<AsignaAcciones>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueObtenerAcciones(reader));
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

        /*ELIMINAR */
        public async Task<bool> mtdEliminarAccion(string claveUsuario, string strPermiso)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spAcciones_Eliminar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@claveUsuario", claveUsuario));
                        cmd.Parameters.Add(new SqlParameter("@strPermiso", strPermiso));
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


        //Hace el mapeo de las acciones
        private AsignaAcciones MapToValueObtenerAcciones(SqlDataReader reader)
        {
            return new AsignaAcciones()
            {
                //dato que lee y devuelve.  
                strPermiso = reader["strPermiso"].ToString(),
               
            };
        }




    }
}
