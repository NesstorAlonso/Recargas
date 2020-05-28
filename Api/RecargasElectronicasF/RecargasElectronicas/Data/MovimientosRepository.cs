using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class MovimientosRepository
    {
        private readonly string _connectionString;
        public MovimientosRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        //Metodo para almacenar informacion de Recargas de tiempo aire 
        public async Task<bool> mtdMovimientos(Movimientos movimientos)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spMovimientosRS", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuario", movimientos.strIdUsuario));
                        cmd.Parameters.Add(new SqlParameter("@strLatitud", movimientos.strLatitud));
                        cmd.Parameters.Add(new SqlParameter("@strLongitud", movimientos.strLongitud));
                        cmd.Parameters.Add(new SqlParameter("@strDireccionIP", movimientos.strDireccionIP));
                        cmd.Parameters.Add(new SqlParameter("@dtmFechaHora", movimientos.dtmFechaHora));
                        cmd.Parameters.Add(new SqlParameter("@strReferencia", movimientos.strReferencia));
                        cmd.Parameters.Add(new SqlParameter("@strTelefono", movimientos.strTelefono));
                        cmd.Parameters.Add(new SqlParameter("@strSKU", movimientos.strSKU));
                        cmd.Parameters.Add(new SqlParameter("@strNombre", movimientos.strNombre));
                        cmd.Parameters.Add(new SqlParameter("@dcmMonto", movimientos.dcmMonto));
                        cmd.Parameters.Add(new SqlParameter("@strTipo", movimientos.strTipo));
                        cmd.Parameters.Add(new SqlParameter("@strTbOrigen", movimientos.strTbOrigen));
                        cmd.Parameters.Add(new SqlParameter("@strMensaje", movimientos.strMensaje));

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

        //Metodo para obtener todos los movimientos
        public async Task<List<ObtenerMovimientos>> MtdObtenerTodosMovimientos(string strIdUsuario)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ObtenerTodos_Movimientos", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strIdUsuario", strIdUsuario));
                        var response = new List<ObtenerMovimientos>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueObtenerMovimientos(reader));
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
        //Metodo para obtener todos los movimientos por id
        public async Task<List<ObtenerMovimientos>> MtdObtenerTodosMovimientosPorId(int intIdMovimiento)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ObtenerTodos_Movimientos_PorId", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdMovimiento", intIdMovimiento));
                        var response = new List<ObtenerMovimientos>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueObtenerMovimientos(reader));
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

        //Metodo para obtener todos los movimientos por Mes
        public async Task<List<ObtenerMovimientos>> MtdObtenerTodosMovimientosPorMes(int Mes, int Año)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ObtenerTodos_Movimientos_PorMes", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Mes", Mes));
                        cmd.Parameters.Add(new SqlParameter("@Año", Año));
                        var response = new List<ObtenerMovimientos>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueObtenerMovimientos(reader));
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

        //Metodo para obtener todos los movimientos por dia actual y dia anterior
        public async Task<List<ObtenerMovimientos>> MtdObtenerTodosMovimientosPorDia(int Dia, int Mes, int Año)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ObtenerTodos_Movimientos_PorDia", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@DiaActual", Dia));
                        cmd.Parameters.Add(new SqlParameter("@MesActual", Mes));
                        cmd.Parameters.Add(new SqlParameter("@AñoActal", Año));
                        var response = new List<ObtenerMovimientos>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueObtenerMovimientos(reader));
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
        //Metodo para comision de servicios
        public async Task<bool> mtdCServicios(ComisionServicios cS)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spComisionServicios", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strUsuario", cS.strUsuario));
                        cmd.Parameters.Add(new SqlParameter("@dtmFecha", cS.dtmFecha));
                        cmd.Parameters.Add(new SqlParameter("@dcmMonto", cS.dcmMonto));
                        cmd.Parameters.Add(new SqlParameter("@strReferencia", cS.strReferencia));
                        cmd.Parameters.Add(new SqlParameter("@strSKU", cS.strSKU));
                        cmd.Parameters.Add(new SqlParameter("@strComision", cS.strComision));
                        cmd.Parameters.Add(new SqlParameter("@MontoInicial", cS.MontoInicial));
                        cmd.Parameters.Add(new SqlParameter("@MontoFinal", cS.MontoFinal));

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
        //
        /////////Mapeos
        private ObtenerMovimientos MapToValueObtenerMovimientos(SqlDataReader reader)
        {
            return new ObtenerMovimientos()
            {
                intIdMovimiento = reader["intIdMovimiento"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdMovimiento"],
                strIdUsuario = reader["strIdUsuario"].ToString(),
                Nombre = reader["Nombre"].ToString(),
                strLatitud = reader["strLatitud"].ToString(),
                strLongitud = reader["strLongitud"].ToString(),
                strDireccionIP = reader["strDireccionIP"].ToString(),
                dtmFechaHora = reader["dtmFechaHora"] == DBNull.Value ? Convert.ToDateTime(null) : (DateTime)reader["dtmFechaHora"],
                dcmMonto = reader["dcmMonto"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["dcmMonto"],
                strReferencia = reader["strReferencia"].ToString(),
                strTelefono = reader["strTelefono"].ToString(),
                strSKU = reader["strSKU"].ToString(),
                strNombre = reader["strNombre"].ToString(),
                strTipo = reader["strTipo"].ToString(),
                strTbOrigen = reader["strTbOrigen"].ToString(),
                strMensaje = reader["strMensaje"].ToString(),
            };
        }


    }
}
