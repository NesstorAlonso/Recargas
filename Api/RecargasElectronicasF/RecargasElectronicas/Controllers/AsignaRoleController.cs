using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecargasElectronicas.Data;
using RecargasElectronicas.Entities;
using RecargasElectronicas.Models;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsignaRoleController : ControllerBase
    {
        private readonly string _connectionString;

        public AsignaRoleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        //https://apirecargas.recargacelulares.com.mx/api/AsignaRole/ObtenerRol?UserName=Martin_Q
        [HttpGet("ObtenerRol")]
        public async Task<ActionResult<List<AsignarRole>>> ObtenerRol(string UserName)
        {
            AsignaRoleRepository _repository = new AsignaRoleRepository(_connectionString);
            var response = await _repository.mtdObtenerAsignaRolees(UserName);
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/AsignaRole/ObtenerTodoUsuarioRol
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize (Roles = "Administrador")]
        [HttpGet("ObtenerTodoUsuarioRol")]
        public async Task<ActionResult<List<UsuarioRol>>> ObtenerTodoUsuarioRol()
        {
            AsignaRoleRepository _repository = new AsignaRoleRepository(_connectionString);
            var response = await _repository.mtdObtenerTodosUsuariosRol();
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/AsignaRole/PermisoRol?intIdRol=58206fa9-6455-442d-99c5-0c6469698cdd
        [HttpGet("PermisoRol")]
        public async Task<ActionResult<List<ObtenerPermisoRol>>> PermisoRol(string intIdRol)
        {
            AsignaRoleRepository _repository = new AsignaRoleRepository(_connectionString);
            var response = await _repository.mtdObtenerPermisoRol(intIdRol);
            if (response == null) { return NotFound(); }
            return response;
        }


        [HttpPut("mtdAltaUsuario")]
        public async Task<ActionResult> mtdAltaUsuario(string id)
        {
            try
            {
                AsignaRoleRepository _repository = new AsignaRoleRepository(_connectionString);
              
                if (await _repository.mtdAltaUsuario(id)== true)
                    {
                    return Ok("Se actualizo correctamente el usuario");
                }
                else return NotFound();

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpPut("mtdCambiarNip")]
        public async Task<ActionResult> mtdCambiarNip(string id, int intNip, bool bitNip )
        {
            try
            {
                AsignaRoleRepository _repository = new AsignaRoleRepository(_connectionString);

                if (await _repository.mtdCambiarNip(id, intNip, bitNip) == true)
                {
                    return Ok("Se actualizo correctamente el Nip");
                }
                else return NotFound();

            }
            catch (Exception ex)
            {

                throw;
            }
        }




    }
}