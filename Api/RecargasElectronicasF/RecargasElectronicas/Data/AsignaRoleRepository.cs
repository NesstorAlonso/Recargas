using RecargasElectronicas.Entities;
using RecargasElectronicas.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Data
{
    public class AsignaRoleRepository
    {
        private readonly string _connectionString;
        public AsignaRoleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        //metodo que obtiene el rol del usuario
        public async Task<List<AsignarRole>> mtdObtenerAsignaRolees(string UserName)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtenerRolUsuario", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                        var response = new List<AsignarRole>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueUsuarios(reader));
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

        //metodo que obtiene todos los usuarios con roles
        //
        public async Task<List<UsuarioRol>> mtdObtenerTodosUsuariosRol()
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spRolTodos", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        var response = new List<UsuarioRol>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValueTodosUsuariosRol(reader));
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
        //metodo que obtiene permiso de usuario por rol
        public async Task<List<ObtenerPermisoRol>> mtdObtenerPermisoRol(string intIdRol)

        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spObtenerOpcionesRol", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@intIdRol", intIdRol));
                        var response = new List<ObtenerPermisoRol>();
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.Add(MapToValuePermisoRol(reader));
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


        public async Task<bool> mtdAltaUsuario(string Id)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuario_EmailConfirmed", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", Id));
                     
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

        public async Task<bool> mtdCambiarNip(string Id, int intNip, bool bitNip)
        {
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spUsuario_CambiarNip", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", Id));
                        cmd.Parameters.Add(new SqlParameter("@intNip", intNip));
                        cmd.Parameters.Add(new SqlParameter("@bitNip", bitNip));

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




        private AsignarRole MapToValueUsuarios(SqlDataReader reader)
        {
            return new AsignarRole()
            {
                //dato que lee y devuelve.  
                Name = reader["Name"].ToString(),
                UserName = reader["UserName"].ToString(),
                 RoleId = reader["RoleId"].ToString(),
                Id = reader["Id"].ToString(),
                intNivel = reader["intNivel"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intNivel"],
                intNip = reader["intNip"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intNip"],
                strIdPadre = reader["strIdPadre"].ToString(),
                Padre = reader["Padre"].ToString(),
                strComercio = reader["strComercio"].ToString(),
                strNombre = reader["strNombre"].ToString(),
                strApaterno = reader["strApaterno"].ToString(),
                strAmaterno = reader["strAmaterno"].ToString(),
                strEstatus = reader["strEstatus"].ToString(),
                EmailConfirmed = reader["EmailConfirmed"] == DBNull.Value ? false : (bool)reader["EmailConfirmed"],
                bitNip = reader["bitNip"] == DBNull.Value ? false : (bool)reader["bitNip"],
                dcmSaldo = reader["dcmSaldo"] == DBNull.Value ? Convert.ToDecimal(0.000) : (decimal)reader["dcmSaldo"],
                strCp = reader["strCp"].ToString(),
                strEstado = reader["strEstado"].ToString(),
                strMunicipio = reader["strMunicipio"].ToString(),
                strColonia = reader["strColonia"].ToString(),
                strCalle = reader["strCalle"].ToString(),
                strNumExt = reader["strNumExt"].ToString(),
                strNumInt = reader["strNumInt"].ToString(),
                strContacto = reader["strContacto"].ToString(),

            };
        }
        //MAPEA LOS DATOS DE ASIGNARROL class UsuarioRol
        private UsuarioRol MapToValueTodosUsuariosRol(SqlDataReader reader)
        {
            return new UsuarioRol()
            {
                //dato que lee y devuelve.
                intId = reader["intId"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intId"],
                UserName = reader["UserName"].ToString(),
                Email = reader["Email"].ToString(),
                PhoneNumber = reader["PhoneNumber"].ToString(),
                Name = reader["Name"].ToString()

            };
        }
        //MAPEA LOS DATOS para llamar las opciones de permiso por rol
        private ObtenerPermisoRol MapToValuePermisoRol(SqlDataReader reader)
        {
            return new ObtenerPermisoRol()
            {
                //dato que lee y devuelve.
                intIdRol = reader["intIdRol"].ToString(),
                intIdOpcion = reader["intIdOpcion"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdOpcion"],
                intIdPermiso = reader["intIdPermiso"] == DBNull.Value ? Convert.ToInt32(0) : (int)reader["intIdPermiso"]

            };
        }
    }
}
