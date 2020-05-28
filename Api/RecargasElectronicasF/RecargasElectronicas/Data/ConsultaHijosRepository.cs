using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class ConsultaHijosRepository
    {
        private readonly string _connectionString;
        public ConsultaHijosRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        //metodo que obtiene la consulta de distribuidores por hijos y activos
        public async Task<List<ConsultaHijos>> mtdObtenerConsultaHijos(string Id, char strEstatus)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ObtenerHijosDistribuidores", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", Id));
                        cmd.Parameters.Add(new SqlParameter("@strEstatus", strEstatus));
                        var response = new List<ConsultaHijos>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueConsultaHijos(reader));
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

        //Metodo para obtener por id los datos del usuario en este caso del hijo y poder modificar.
        public async Task<List<ObtenerInfoPorId>> mtdObtenerPorIdInfoHijos(string Id)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtenerHijo_PorId", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", Id));
                        var response = new List<ObtenerInfoPorId>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueHijosPorId(reader));
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

        //Se realiza la modificacacion de hijos
        //
        //
        public async Task<bool> mtdModificarUsuariosHijos(string Id, bool bitTipoPersona, string strNombre, string strApaterno, string strAmaterno, DateTime dtmFechaNacimiento, string strRFC,
           bool bitGenero, string strCompania, string strCp, string strEstado, string strMunicipio, string strColonia, string strTVialidad, string strCalle, string strNumExt, string strNumInt, string strContacto, string strComercio, string strTelefono)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuarioHijo_Modificar", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", Id));
                        cmd.Parameters.Add(new SqlParameter("@bitTipoPersona", bitTipoPersona));
                        cmd.Parameters.Add(new SqlParameter("@strNombre", strNombre));
                        cmd.Parameters.Add(new SqlParameter("@strApaterno", strApaterno));
                        cmd.Parameters.Add(new SqlParameter("@strAmaterno", strAmaterno));
                        cmd.Parameters.Add(new SqlParameter("@dtmFechaNacimiento", dtmFechaNacimiento));
                        cmd.Parameters.Add(new SqlParameter("@strRFC", strRFC));
                        cmd.Parameters.Add(new SqlParameter("@bitGenero", bitGenero));
                        cmd.Parameters.Add(new SqlParameter("@strCompania", strCompania));
                        cmd.Parameters.Add(new SqlParameter("@strCp", strCp));
                        cmd.Parameters.Add(new SqlParameter("@strEstado", strEstado));
                        cmd.Parameters.Add(new SqlParameter("@strMunicipio", strMunicipio));
                        cmd.Parameters.Add(new SqlParameter("@strColonia", strColonia));
                        cmd.Parameters.Add(new SqlParameter("@strTVialidad", strTVialidad));
                        cmd.Parameters.Add(new SqlParameter("@strCalle", strCalle));
                        cmd.Parameters.Add(new SqlParameter("@strNumExt", strNumExt));
                        cmd.Parameters.Add(new SqlParameter("@strNumInt", strNumInt));
                        cmd.Parameters.Add(new SqlParameter("@strContacto", strContacto));
                        cmd.Parameters.Add(new SqlParameter("@strComercio", strComercio));
                        cmd.Parameters.Add(new SqlParameter("@PhoneNumber", strTelefono));

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
        //Metodo para obtener por id los datos del usuario en este caso del hijo y poder modificar.
        public async Task<List<ObtenerInfoVPorId>> mtdObtenerPorIdHijosInfoV(string Id)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtenerVendedor_PorId", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", Id));
                        var response = new List<ObtenerInfoVPorId>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueHijosPorIdV(reader));
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
        //Metodo para verifica si el usuario es existente o es nuevo.
        public async Task<List<VerificarUsuario>> mtdVerificarUsuario(string UserName)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spConsultaUsuarioExistente", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                        var response = new List<VerificarUsuario>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueVUsuario(reader));
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
        //
        //
        //Metodo para deshabilitar el cliente del distribuidor
        //
        //
        public async Task<bool> mtdDeshabilitarCliente(string Id, char strEstatus, decimal dcmSaldo)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spDeshabilitar_ClienteDistribuidores", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", Id));
                        cmd.Parameters.Add(new SqlParameter("@strEstatus", strEstatus));
                        cmd.Parameters.Add(new SqlParameter("@dcmSaldo", dcmSaldo));

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
        //Consulta el padre del hijo para poder retroceder
        public async Task<List<ConsultaHijos>> mtdObtenerConsultaPadre(string strIdPadre, char strEstatus)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("sp_ObtenerPadreDistribuidores", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@strIdPadre", strIdPadre));
                        cmd.Parameters.Add(new SqlParameter("@strEstatus", strEstatus));
                        var response = new List<ConsultaHijos>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueConsultaHijos(reader));
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

        //Metodo para verifica si el Email es existente o es nuevo.
        public async Task<List<VerificarEmail>> mtdVerificarEmail(string Email)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spConsultaEmailExistente", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Email", Email));
                        var response = new List<VerificarEmail>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueVEmailExistente(reader));
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
        //


        //En esta parte se realiza el mapeo de los parametros mandados de la base de datos para despues leerlos.
        private ConsultaHijos MapToValueConsultaHijos(SqlDataReader reader)
        {
            return new ConsultaHijos()
            {
                intId = reader["intId"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intId"],
                UserName = reader["UserName"].ToString(),
                PhoneNumber = reader["PhoneNumber"].ToString(),
                Email = reader["Email"].ToString(),
                strNombre = reader["strNombre"].ToString(),
                strApaterno = reader["strApaterno"].ToString(),
                strAmaterno = reader["strAmaterno"].ToString(),
                strIdPadre = reader["strIdPadre"].ToString(),
                Id = reader["Id"].ToString(),
                strContacto = reader["strContacto"].ToString(),
                strComercio = reader["strComercio"].ToString()
            };
        }

        private ObtenerInfoPorId MapToValueHijosPorId(SqlDataReader reader)
        {
            return new ObtenerInfoPorId()
            {
                UserName = reader["UserName"].ToString(),
                bitTipoPersona = reader["bitTipoPersona"] == DBNull.Value ? Convert.ToBoolean(false) : (bool)reader["bitTipoPersona"],
                strNombre = reader["strNombre"].ToString(),
                strApaterno = reader["strApaterno"].ToString(),
                strAmaterno = reader["strAmaterno"].ToString(),
               // dtmFechaNacimiento = Convert.ToDateTime(reader["dtmFechaNacimiento"].ToString()),
                dtmFechaNacimiento = reader["dtmFechaNacimiento"] == DBNull.Value ? Convert.ToDateTime(null) : (DateTime)reader["dtmFechaNacimiento"],

                strRfc = reader["strRfc"].ToString(),
                bitGenero = reader["bitGenero"] == DBNull.Value ? Convert.ToBoolean(false) : (bool)reader["bitGenero"],
                strCompania = reader["strCompania"].ToString(),
                strCp = reader["strCp"].ToString(),
                strEstado = reader["strEstado"].ToString(),
                strMunicipio = reader["strMunicipio"].ToString(),
                strColonia = reader["strColonia"].ToString(),
                strTVialidad = reader["strTVialidad"].ToString(),
                strCalle = reader["strCalle"].ToString(),
                strNumExt = reader["strNumExt"].ToString(),
                strNumInt = reader["strNumInt"].ToString(),
                strContacto = reader["strContacto"].ToString(),
                strComercio = reader["strComercio"].ToString(),
                PhoneNumber = reader["PhoneNumber"].ToString()
                
            };
        }

        private ObtenerInfoVPorId MapToValueHijosPorIdV(SqlDataReader reader)
        {
            return new ObtenerInfoVPorId()
            {
                UserName = reader["UserName"].ToString(),
                strNombre = reader["strNombre"].ToString(),
                strApaterno = reader["strApaterno"].ToString(),
                strAmaterno = reader["strAmaterno"].ToString(),
                dtmHoraInicio = Convert.ToDateTime(reader["dtmHoraInicio"].ToString()),
                dtmHoraFin = Convert.ToDateTime(reader["dtmHoraFin"].ToString()),
                //Id = reader["Id"].ToString(),
                strIdPadre = reader["strIdPadre"].ToString(),
                intNivel = reader["intNivel"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intNivel"],

            };
        }

        //Maoeo para verificar si el usuario existe o es nuevo
        private VerificarUsuario MapToValueVUsuario(SqlDataReader reader)
        {
            return new VerificarUsuario()
            {
                UserName = reader["UserName"].ToString()
            };
        }
        //Maoeo para verificar si el email existe o es nuevo
        private VerificarEmail MapToValueVEmailExistente(SqlDataReader reader)
        {
            return new VerificarEmail()
            {
                Email = reader["Email"].ToString()
            };
        }

    }
}
