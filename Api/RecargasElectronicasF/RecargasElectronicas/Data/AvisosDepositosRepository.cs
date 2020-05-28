using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class AvisosDepositosRepository
    {
        private readonly string _connectionString;
        public AvisosDepositosRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<bool> mtdInsertar(AvisosDepositos avDep)
        {
            SqlParameter blobParam = new SqlParameter("@imgComprobante", SqlDbType.VarBinary, avDep.imgComprobante.Length);
            blobParam.Value = avDep.imgComprobante;
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spAvisoPago_Alta2", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strReferencia", avDep.strReferencia));
                        cmd.Parameters.Add(new SqlParameter("@dtmFechaHoraDep", avDep.dtmFechaHoraDep));
                        cmd.Parameters.Add(new SqlParameter("@strBancoDep", avDep.strBancoDep));
                        cmd.Parameters.Add(new SqlParameter("@bitStatus", avDep.bitStatus));
                        cmd.Parameters.Add(new SqlParameter("@dcmMonto", avDep.dcmMonto));
                        cmd.Parameters.Add(new SqlParameter("@strObservaciones", avDep.strObservaciones));
                        cmd.Parameters.Add(new SqlParameter("@bitPagoValido", avDep.bitPagoValido));
                        cmd.Parameters.Add(new SqlParameter("@strCliente", avDep.strCliente));
                        cmd.Parameters.Add(new SqlParameter("@dtmFechaHoraCap", avDep.dtmFechaHoraCap));
                        cmd.Parameters.Add(new SqlParameter("@dtmFechaHoraValidacion", avDep.dtmFechaHoraValidacion));
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuarioValidacion", avDep.strIdUsuarioValidacion));
                        cmd.Parameters.Add(blobParam); //BASE 64 DE LA IMAGEN
                        cmd.Parameters.Add(new SqlParameter("@strNomArchivo", avDep.strNomArchivo));
                        cmd.Parameters.Add(new SqlParameter("@strExtension", avDep.strExtension));
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

        public async Task<List<AvisosDepositos>> mtdObtenerArchivoPorId(int intIdAvisoPago)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spAvisosPago_ObtenerArchivoPorId", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdAvisoPago", intIdAvisoPago));
                        var response = new List<AvisosDepositos>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueDepositos(reader));
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

        
        //Obtiene todos los depositos de abono del cliente 
        public async Task<List<AvisosDepositos>> mtdObtenerDepositos()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ObtenerTodosDepositos", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<AvisosDepositos>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueDepositos(reader));
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
        public async Task<List<AvisosDepositos>> mtdObtenerUsuariosPendientes(bool bitStatus)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtenerStatus_PorId", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@bitStatus", bitStatus));
                        var response = new List<AvisosDepositos>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueDepositos(reader));
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

        //
        //Metedo para actualizar el estatus del deposito de abono ya se pendiente o aceptado
        public async Task<bool> mtdCambiarStatus(int intIdAvisoPago,bool bitStatus, string strObservaciones)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spAvisoaAbono_ModificarStatus", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdAvisoPago", intIdAvisoPago));
                        cmd.Parameters.Add(new SqlParameter("@bitStatus", bitStatus));
                        cmd.Parameters.Add(new SqlParameter("@strObservaciones", strObservaciones));

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
        //Metodo para verificar que la referencia del deposito no se duplique.
        public async Task<List<VerificarReferencia>> mtdVerificarReferencia(string strReferencia)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spConsultaReferenciaExistente", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strReferencia", strReferencia));
                        var response = new List<VerificarReferencia>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueVReferencia(reader));
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
        //Metodo que realiza un filtro de busqueda por fecha
        public async Task<List<AvisosDepositos>> mtdFiltroBusquedaPorFechaInfoCuenta(DateTime FechaInicio, DateTime FechaFin)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtener_BusquedaPorFechaInformacionCuenta", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@FechaInicio", FechaInicio));
                        cmd.Parameters.Add(new SqlParameter("@FechaFin", FechaFin));
                        var response = new List<AvisosDepositos>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueDepositos(reader));
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
        //

        //Inicia los mapeos 
        private AvisosDepositos MapToValueArchivo(SqlDataReader reader)
        {
            return new AvisosDepositos()
            {
                intIdAvisoPago = reader["intIdAvisoPago"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdAvisoPago"],
                strReferencia = reader["strReferencia"].ToString(),
                dtmFechaHoraDep = Convert.ToDateTime(reader["dtmFechaHoraDep"].ToString()),
                strBancoDep = reader["strBancoDep"].ToString(),
                bitStatus = reader["bitStatus"] == DBNull.Value ? Convert.ToBoolean(false) : (bool)reader["bitStatus"],
                dcmMonto = reader["dcmMonto"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["dcmMonto"],
                strObservaciones = reader["strObservaciones"].ToString(),
                bitPagoValido = reader["bitPagoValido"] == DBNull.Value ? Convert.ToBoolean(false) : (bool)reader["bitPagoValido"],
                strCliente = reader["strCliente"].ToString(),
                dtmFechaHoraCap = Convert.ToDateTime(reader["dtmFechaHoraCap"].ToString()),
                dtmFechaHoraValidacion = Convert.ToDateTime(reader["dtmFechaHoraValidacion"].ToString()),
                strIdUsuarioValidacion = reader["strIdUsuarioValidacion"].ToString(),
                imgComprobante = (byte[])(reader["imgComprobante"]),               
                strNomArchivo = reader["strNomArchivo"].ToString(),
                strExtension = reader["strExtension"].ToString()
            };
        }
        //inicia el mapeo de los depositos para poder consultar
        private AvisosDepositos MapToValueDepositos(SqlDataReader reader)
        {
            return new AvisosDepositos()
            {
                intIdAvisoPago = reader["intIdAvisoPago"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdAvisoPago"],
                strReferencia = reader["strReferencia"].ToString(),
                dtmFechaHoraDep = Convert.ToDateTime(reader["dtmFechaHoraDep"].ToString()),
                strBancoDep = reader["strBancoDep"].ToString(),
                bitStatus = reader["bitStatus"] == DBNull.Value ? Convert.ToBoolean(false) : (bool)reader["bitStatus"],
                dcmMonto = reader["dcmMonto"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["dcmMonto"],
                strObservaciones = reader["strObservaciones"].ToString(),
                bitPagoValido = reader["bitPagoValido"] == DBNull.Value ? Convert.ToBoolean(false) : (bool)reader["bitPagoValido"],
                strCliente = reader["strCliente"].ToString(),
                dtmFechaHoraCap = Convert.ToDateTime(reader["dtmFechaHoraCap"].ToString()),
                dtmFechaHoraValidacion = Convert.ToDateTime(reader["dtmFechaHoraValidacion"].ToString()),
                strIdUsuarioValidacion = reader["strIdUsuarioValidacion"].ToString(),
                imgComprobante = (byte[])(reader["imgComprobante"]),
                strNomArchivo = reader["strNomArchivo"].ToString(),
                strExtension = reader["strExtension"].ToString(),
                Nombre = reader["Nombre"].ToString(),
                Id = reader["Id"].ToString()
            };
        }
        //

        //Mapeo del usuario para verificar si existe una referencia duplicada
        private VerificarReferencia MapToValueVReferencia(SqlDataReader reader)
        {
            return new VerificarReferencia()
            {
                strReferencia = reader["strReferencia"].ToString()
            };
        }
    }
}
