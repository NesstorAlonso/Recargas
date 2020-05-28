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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [EnableCors("AllowOrigins")]
    
    public class TipoUsuarioController : ControllerBase
    {
        private readonly string _connectionString;

        public TipoUsuarioController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }


        //api/TipoUsuario/mtdObtenerTipoUsuario
        [HttpGet("mtdObtenerTipoUsuario")]
        public async Task<ActionResult<List<TipoUsuario>>> mtdObtenerTipoUsuario()
        {
            TipoUsuarioRepository _repository = new TipoUsuarioRepository(_connectionString);
            var response = await _repository.mtdObtenerTipoUsuario();
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/Opciones/mtdObtenerPorIdOpciones?intIdOpcion=1
        //[HttpGet("mtdObtenerPorIdOpciones")]
        //public async Task<ActionResult<List<Opciones>>> mtdObtenerPorIdOpciones(int intIdOpcion)
        //{
        //    OpcionesRepository _repository = new OpcionesRepository(_connectionString);
        //    var response = await _repository.mtdObtenerPorIdOpciones(intIdOpcion);
        //    if (response == null) { return NotFound(); }
        //    return response;
        //}

        //api/TipoUsuario/mtdInsertarTipoUsuario?strDescripcion=nombre
        [HttpPost("mtdInsertarTipoUsuario")]
        public async Task<ActionResult> mtdInsertarTipoUsuario(string strDescripcion)
        {
            TipoUsuarioRepository _repository = new TipoUsuarioRepository(_connectionString);
            if (await _repository.mtdInsertarTipoUsuario(strDescripcion))
            {
                return Ok("Se agrego correctamente el Acuerdo SLA");
            }
            else return NotFound();
        }

        //api/TipoUsuario/mtdCambiarTipoUsuario?Descripcion=Nombre1
        [HttpPut("mtdCambiarTipoUsuario")]
        public async Task<ActionResult> mtdCambiarTipoUsuario(int intIdTipoUsuario, string strDescripcion)
        {
            TipoUsuarioRepository _repository = new TipoUsuarioRepository(_connectionString);
            if (await _repository.mtdCambiarTipoUsuario(intIdTipoUsuario, strDescripcion) == true)
            {
                return Ok("Se actualizo correctamente el Acuerdo SLA");
            }
            else return NotFound();
        }

        //api/TipoUsuario/mtdBajaTipoUsuarios?intIdTipoUsuario=1
        [HttpPut("mtdBajaTipoUsuario")]
        public async Task<ActionResult> mtdBajaTipoUsuario(int intIdTipoUsuario)
        {
            TipoUsuarioRepository _repository = new TipoUsuarioRepository(_connectionString);
            if (await _repository.mtdBajaTipoUsuario(intIdTipoUsuario) == true)
            {
                return NoContent();
            }
            else return NotFound();
        }

        //api/TipoUsuario/mtdActivarTipoUsuarios?intIdTipoUsuario=1
        [HttpPut("mtdActivarTipoUsuario")]
        public async Task<ActionResult> mtdActivarTipoUsuario(int intIdTipoUsuario)
        {
            TipoUsuarioRepository _repository = new TipoUsuarioRepository(_connectionString);
            if (await _repository.mtdActivarTipoUsuario(intIdTipoUsuario) == true)
            {
                return NoContent();
            }
            else return NotFound();
        }
    }
}
