using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecargasElectronicas.Data;
using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigins")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PermisosController : ControllerBase
    {
        private readonly string _connectionString;

        public PermisosController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        /*OBTENER TODOS*/
        //api/Permisos/mtdObtenerPermisos
        [HttpGet("mtdObtenerPermisos")]
        public async Task<ActionResult<List<Permisos>>> mtdObtenerPuntosVenta()
        {
            PermisosRepository _repository = new PermisosRepository(_connectionString);
            var response = await _repository.mtdObtenerPermisos();
            if (response == null) { return NotFound(); }
            return response;
        }

        /*insertar permisos*/
        //api/Perfil/mtdInsertarPermisos?intIdPerfil=3&intIdOpcion=6 
        [HttpPost("mtdInsertarPermisos")]
        public async Task<ActionResult> mtdInsertarPermisos(int intIdPerfil, int intIdOpcion)
        {
            PermisosRepository _repository = new PermisosRepository(_connectionString);
            if (await _repository.mtdInsertarPermisos(intIdPerfil, intIdOpcion))
            {
                return Ok("Permiso agregado correctamente");
            }
            else return NotFound();
        }


        /*Eliminar*/
        //api/Perfil/mtdEliminarPermisos?intIdPerfil=3&intIdOpcion=6 
        [HttpPut("mtdEliminarPermisos")]
        public async Task<ActionResult> mtdEliminarPermisos(int intIdPerfil, int intIdOpcion)
        {
            PermisosRepository _repository = new PermisosRepository(_connectionString);
            if (await _repository.mtdEliminarPermisos(intIdPerfil, intIdOpcion) == true)
            {
                return NoContent();
            }
            else return NotFound();
        }
        
    }
}