using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class TraspasoSaldoRepository
    {
        private readonly string _connectionString;
        public TraspasoSaldoRepository(string connectionString)
        {
            _connectionString = connectionString;
        }       
        public async Task<List<TraspasoSaldo2>> mtdObtenerTodasTransferencias()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtenerTodasTransferencias", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<TraspasoSaldo2>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueTraspasaSaldo(reader));
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

        public async Task<List<TraspasoSaldo2>> mtdTodosTraspasos()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spTodosTraspasos", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<TraspasoSaldo2>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueTraspasaSaldo(reader));
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

        public async Task<List<ConsultaHijosSaldo>> ObtenerSaldoCliente(string Id)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ObtenerHijosDistribuidoresSaldo", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", Id));
                        var response = new List<ConsultaHijosSaldo>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueConsultaHijosSaldo(reader));
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
        //Metodo para saber el saldo alctual del logeado
        public async Task<List<ConsultaSaldoActual>> ObtenerSaldoClienteLogin(string Saldo)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ObtenerSaldoLogeado", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuarioLog", Saldo));
                        var response = new List<ConsultaSaldoActual>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueConsultaSaldoClienteLogin(reader));
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
        //
        //Metodo funcional de traspaso de saldo, 
        public async Task<bool> mtdTransacTransferirSaldo(TraspasoSaldo traspasoSaldo)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("sptTransferirSaldo", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", traspasoSaldo.Id));
                        cmd.Parameters.Add(new SqlParameter("@dcmMonto", traspasoSaldo.dcmMonto));
                        cmd.Parameters.Add(new SqlParameter("@strIdCliente", traspasoSaldo.strIdCliente));
                        cmd.Parameters.Add(new SqlParameter("@dtmFecha", traspasoSaldo.dtmFecha));
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuarioLog", traspasoSaldo.strIdUsuarioLog));
                        cmd.Parameters.Add(new SqlParameter("@intIdUsuarioOrigen", traspasoSaldo.intIdUsuarioOrigen));
                        cmd.Parameters.Add(new SqlParameter("@bitStatus", traspasoSaldo.bitStatus));

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

        //Metodo que realiza un filtro de busqueda por fecha
        public async Task<List<TraspasoSaldo2>> mtdFiltroBusquedaPorFecha(DateTime FechaInicio, DateTime FechaFin)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtener_BusquedaPorFecha", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@FechaInicio", FechaInicio));
                        cmd.Parameters.Add(new SqlParameter("@FechaFin", FechaFin));
                        var response = new List<TraspasoSaldo2>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueTraspasaSaldo(reader));
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

        //Metodo funcional de Deposito de abono, 
        public async Task<bool> mtdTransacTransferirAbono(AbonoSaldo abonoSaldo)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spDepositoAbonoSaldo", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", abonoSaldo.Id));
                        cmd.Parameters.Add(new SqlParameter("@intIdAvisoPago", abonoSaldo.intIdAvisoPago));
                        cmd.Parameters.Add(new SqlParameter("@dcmMonto", abonoSaldo.dcmMonto));
                        cmd.Parameters.Add(new SqlParameter("@strIdCliente", abonoSaldo.strIdCliente));
                        cmd.Parameters.Add(new SqlParameter("@dtmFecha", abonoSaldo.dtmFecha));
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuarioLog", abonoSaldo.strIdUsuarioLog));
                        cmd.Parameters.Add(new SqlParameter("@intIdUsuarioOrigen", abonoSaldo.intIdUsuarioOrigen));
                        cmd.Parameters.Add(new SqlParameter("@bitStatus", abonoSaldo.bitStatus));

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
        //Metodo funcional de Rechazo Deposito de abono, 
        public async Task<bool> mtdTransacTransferirAbonoRechazo(AbonoSaldo abonoSaldo)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spDepositoAbonoSaldoRechazo", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", abonoSaldo.Id));
                        cmd.Parameters.Add(new SqlParameter("@intIdAvisoPago", abonoSaldo.intIdAvisoPago));
                        cmd.Parameters.Add(new SqlParameter("@dcmMonto", abonoSaldo.dcmMonto));
                        cmd.Parameters.Add(new SqlParameter("@strIdCliente", abonoSaldo.strIdCliente));
                        cmd.Parameters.Add(new SqlParameter("@dtmFecha", abonoSaldo.dtmFecha));
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuarioLog", abonoSaldo.strIdUsuarioLog));
                        cmd.Parameters.Add(new SqlParameter("@intIdUsuarioOrigen", abonoSaldo.intIdUsuarioOrigen));
                        cmd.Parameters.Add(new SqlParameter("@bitStatus", abonoSaldo.bitStatus));

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
        private TraspasoSaldo2 MapToValueTraspasaSaldo(SqlDataReader reader)
        {
            return new TraspasoSaldo2()
            {
                intIdSaldo = reader["intIdSaldo"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdSaldo"],
                intIdAvisoPago = reader["intIdAvisoPago"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdAvisoPago"],
                dcmMonto = reader["dcmMonto"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["dcmMonto"],
                strIdCliente = reader["strIdCliente"].ToString(),
                dtmFecha = reader["dtmFecha"] == DBNull.Value ? Convert.ToDateTime(null) : (DateTime)reader["dtmFecha"],
                strIdUsuarioLog = reader["strIdUsuarioLog"].ToString(),
                strTipo = reader["strTipo"].ToString(),
                intIdUsuarioOrigen = reader["intIdUsuarioOrigen"].ToString(),
                bitStatus = reader["bitStatus"] == DBNull.Value ? Convert.ToBoolean(false) : (bool)reader["bitStatus"],
                Nombre = reader["Nombre"].ToString(),
            };
        }

        private ConsultaHijosSaldo MapToValueConsultaHijosSaldo(SqlDataReader reader)
        {
            return new ConsultaHijosSaldo()
            {
                intId = reader["intId"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intId"],
                UserName = reader["UserName"].ToString(),
                PhoneNumber = reader["PhoneNumber"].ToString(),
                strNombre = reader["strNombre"].ToString(),
                strApaterno = reader["strApaterno"].ToString(),
                strAmaterno = reader["strAmaterno"].ToString(),
                strIdPadre = reader["strIdPadre"].ToString(),
                Id = reader["Id"].ToString(),
                strContacto = reader["strContacto"].ToString(),
                strComercio = reader["strComercio"].ToString()
            };
        }
        private ConsultaSaldoActual MapToValueConsultaSaldoClienteLogin(SqlDataReader reader)
        {
            return new ConsultaSaldoActual()
            {
                Saldo = reader["Saldo"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["Saldo"]
            };
        }
    }
}
