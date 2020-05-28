using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class NotificacionesRepository
    {
        private readonly string _connectionString;
        public NotificacionesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        //metodo para insertar notificaciones 
        public async Task<bool> mtdAgregarNotificacion(string strUsuario, string strNotificacion, decimal dcmSaldoMinimo)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spNotificaciones_Alta", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strUsuario", strUsuario));
                        cmd.Parameters.Add(new SqlParameter("@strNotificacion", strNotificacion));
                        cmd.Parameters.Add(new SqlParameter("@dcmSaldoMinimo", dcmSaldoMinimo));
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

        //metodo que obtiene las Notificaciones por usuario
        public async Task<List<Notificaciones>> mtdObtenerNotificaciones(string strUsuario)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtenerNotificacionesUsuario", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strUsuario", strUsuario));
                        var response = new List<Notificaciones>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueObtenerNotificaciones(reader));
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
        public async Task<bool> mtdEliminarNotificacion(string strUsuario, string strNotificacion)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spNotificaciones_Eliminar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strUsuario", strUsuario));
                        cmd.Parameters.Add(new SqlParameter("@strNotificacion", strNotificacion));
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



        //Modificar solo el monto del saldo minimo p
        public async Task<bool> mtdCambiarSaldoMinimo(string strUsuario, decimal dcmSaldoMinimo)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spNotificaciones_ModificarSaldoM", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strUsuario", strUsuario));
                        cmd.Parameters.Add(new SqlParameter("@dcmSaldoMinimo", dcmSaldoMinimo));

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
        private Notificaciones MapToValueObtenerNotificaciones(SqlDataReader reader)
        {
            return new Notificaciones()
            {
                //dato que lee y devuelve.  
                strNotificacion = reader["strNotificacion"].ToString(),
                dcmSaldoMinimo = reader["dcmSaldoMinimo"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["dcmSaldoMinimo"]

            };
        }

      

    }
}
