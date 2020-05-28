using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class MovimientosRComisionRepository
    {
        private readonly string _connectionString;
        public MovimientosRComisionRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        //Metodo para almacenar informacion de Recargas de tiempo aire 
        public async Task<bool> mtdMovimientosRComision(MovimientosRComision movimientosComision)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spMovimientosRComision", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuario", movimientosComision.strIdUsuario));
                        cmd.Parameters.Add(new SqlParameter("@strEqComision", movimientosComision.strEqComision));
                        cmd.Parameters.Add(new SqlParameter("@strComisionVigente", movimientosComision.strComisionVigente));
                        cmd.Parameters.Add(new SqlParameter("@strUtilidadRecarga", movimientosComision.strUtilidadRecarga));
                        cmd.Parameters.Add(new SqlParameter("@strCostoRecarga", movimientosComision.strCostoRecarga));
                        cmd.Parameters.Add(new SqlParameter("@dcmMonto", movimientosComision.dcmMonto));
                        cmd.Parameters.Add(new SqlParameter("@dcmMontoInicialR", movimientosComision.dcmMontoInicialR));
                        cmd.Parameters.Add(new SqlParameter("@dcmMontoFinalR", movimientosComision.dcmMontoFinalR));
                        cmd.Parameters.Add(new SqlParameter("@TraspasoAbono", movimientosComision.TraspasoAbono));
                        cmd.Parameters.Add(new SqlParameter("@dtmFecha", movimientosComision.dtmFecha));

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

        //Metodo para obtener todos los movimientos de las comisiones de recarga
        public async Task<List<ObtenerTodosMovimientosComisionRecarga>> MtdObtenerTodosMovimientosComisionR(string strIdUsuario)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ObtenerTodos_MovimientosPorComisiones", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuario", strIdUsuario));
                        var response = new List<ObtenerTodosMovimientosComisionRecarga>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueObtenerMovimientosComisionRe(reader));
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
        //insertarTraspaso
        public async Task<bool> mtdInsertarTransferencia(string strEqComision, string strComisionVigente, string strUtilidadRecarga, string strCostoRecarga, decimal dcmMontoInicialR, decimal dcmMontoFinalR,
             decimal dcmMontoRecarga, string strUsuario, string TraspasoAbono, DateTime dtmFecha)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spInsertar_TraspasoSaldo", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strEqComision", strEqComision));
                        cmd.Parameters.Add(new SqlParameter("@strComisionVigente", strComisionVigente));
                        cmd.Parameters.Add(new SqlParameter("@strUtilidadRecarga", strUtilidadRecarga));
                        cmd.Parameters.Add(new SqlParameter("@strCostoRecarga", strCostoRecarga));
                        cmd.Parameters.Add(new SqlParameter("@dcmMontoInicialR", dcmMontoInicialR));
                        cmd.Parameters.Add(new SqlParameter("@dcmMontoFinalR", dcmMontoFinalR));
                        cmd.Parameters.Add(new SqlParameter("@dcmMontoRecarga", dcmMontoRecarga));
                        cmd.Parameters.Add(new SqlParameter("@strUsuario", strUsuario));
                        cmd.Parameters.Add(new SqlParameter("@TraspasoAbono", TraspasoAbono));
                        cmd.Parameters.Add(new SqlParameter("@dtmFecha", dtmFecha));
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
        //Por dia
        //Metodo para obtener todos los movimientos por dia actual y dia anterior
        public async Task<List<ObtenerTodosMovimientosComisionRecargaPorDia>> MtdObtenerTodosComisionRPorDia(int Dia, int Mes, int Año)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ObtenerTodos_Comision_Recarga_XDia", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@DiaActual", Dia));
                        cmd.Parameters.Add(new SqlParameter("@MesActual", Mes));
                        cmd.Parameters.Add(new SqlParameter("@AñoActal", Año));
                        var response = new List<ObtenerTodosMovimientosComisionRecargaPorDia>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueObtenerPordia(reader));
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

        /////////Mapeos
        private ObtenerTodosMovimientosComisionRecarga MapToValueObtenerMovimientosComisionRe(SqlDataReader reader)
        {
            return new ObtenerTodosMovimientosComisionRecarga()
            {
                intIdMovimientoComision = reader["intIdMovimientoComision"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdMovimientoComision"],
                strUsuario = reader["strUsuario"].ToString(),
                strEqComision = reader["strEqComision"].ToString(),
                strComisionVigente = reader["strComisionVigente"].ToString(),
                strUtilidadRecarga = reader["strUtilidadRecarga"].ToString(),
                strCostoRecarga = reader["strCostoRecarga"].ToString(),
                dcmMontoRecarga = reader["dcmMontoRecarga"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["dcmMontoRecarga"],
                dcmMontoInicialR = reader["dcmMontoInicialR"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["dcmMontoInicialR"],
                dcmMontoFinalR = reader["dcmMontoFinalR"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["dcmMontoFinalR"],
                TraspasoAbono = reader["TraspasoAbono"].ToString(),
                dtmFecha = reader["dtmFecha"] == DBNull.Value ? Convert.ToDateTime(null) : (DateTime)reader["dtmFecha"],
                ComisionServicio = reader["ComisionServicio"].ToString(),
                MontoServicio = reader["MontoServicio"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["MontoServicio"]
            };
        }
        //Por dia
        private ObtenerTodosMovimientosComisionRecargaPorDia MapToValueObtenerPordia(SqlDataReader reader)
        {
            return new ObtenerTodosMovimientosComisionRecargaPorDia()
            {
                intIdMovimientoComision = reader["intIdMovimientoComision"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdMovimientoComision"],
                strUsuario = reader["strUsuario"].ToString(),
                strEqComision = reader["strEqComision"].ToString(),
                strComisionVigente = reader["strComisionVigente"].ToString(),
                strUtilidadRecarga = reader["strUtilidadRecarga"].ToString(),
                strCostoRecarga = reader["strCostoRecarga"].ToString(),
                dcmMontoRecarga = reader["dcmMontoRecarga"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["dcmMontoRecarga"],
                dcmMontoInicialR = reader["dcmMontoInicialR"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["dcmMontoInicialR"],
                dcmMontoFinalR = reader["dcmMontoFinalR"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["dcmMontoFinalR"],
                TraspasoAbono = reader["TraspasoAbono"].ToString(),
                dtmFecha = reader["dtmFecha"] == DBNull.Value ? Convert.ToDateTime(null) : (DateTime)reader["dtmFecha"],
                ComisionServicio = reader["ComisionServicio"].ToString(),
                MontoServicio = reader["MontoServicio"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["MontoServicio"]
            };
        }
    }
}
