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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PerfilController : ControllerBase
    {
        private readonly string _connectionString;

        public PerfilController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        /*OBTENER TODOS*/
        //api/Perfil/mtdObtenerPerfil
        [HttpGet("mtdObtenerPerfil")]
        public async Task<ActionResult<List<Perfil>>> mtdObtenerPuntosVenta()
        {
            PerfilRepository _repository = new PerfilRepository(_connectionString);
            var response = await _repository.mtdObtenerPerfil();
            if (response == null) { return NotFound(); }
            return response;
        }

        /*OBTENER POR ID*/
        //api/Perfil/mtdObtenerPorIdPerfil?intIdPerfil=1
        [HttpGet("mtdObtenerPorIdPerfil")]
        public async Task<ActionResult<List<Perfil>>> mtdObtenerPorIdPerfil(int intIdPerfil)
        {
            PerfilRepository _repository = new PerfilRepository(_connectionString);
            var response = await _repository.mtdObtenerPorIdPerfil(intIdPerfil);
            if (response == null) { return NotFound(); }
            return response;
        }

        /*insertar perfil*/
        //api/Perfil/mtdInsertarPerfil?strDescripcion=nombre
        [HttpPost("mtdInsertarPerfil")]
        public async Task<ActionResult> mtdInsertarPerfil(string strDescripcion)
        {
            PerfilRepository _repository = new PerfilRepository(_connectionString);
            if (await _repository.mtdInsertarPerfil(strDescripcion))
            {
                return Ok("Perfil agregado correctamente");
            }
            else return NotFound();
        }

        //api/Perfil/mtdCambiarPerfil?intIdPerfil=1&strDescripcion=Cadenacomercial
        [HttpPut("mtdCambiarPerfil")]
        public async Task<ActionResult> mtdCambiarPerfil(int intIdPerfil, string strDescripcion)
        {
            PerfilRepository _repository = new PerfilRepository(_connectionString);
            if (await _repository.mtdCambiarPerfil(intIdPerfil, strDescripcion)==true)
            {
                return Ok("Perfil actualizado");
            }
            else return NotFound();
        }
        /*Eliminar*/
        //api/Perfil/mtdEliminarPerfil?intIdPerfil=3
        [HttpPut("mtdEliminarPerfil")]
        public async Task<ActionResult> mtdEliminarPerfil(int intIdPerfil)
        {
            PerfilRepository _repository = new PerfilRepository(_connectionString);
            if (await _repository.mtdEliminarPerfil(intIdPerfil) == true)
            {
                return NoContent();
            }
            else return NotFound();
        }
        /*Desactivar*/
        //api/Perfil/mtdBajaPerfil?intIdPerfil=3
        [HttpPut("mtdBajaPerfil")]
        public async Task<ActionResult> mtdBajaPerfil(int intIdPerfil)
        {
            PerfilRepository _repository = new PerfilRepository(_connectionString);
            if (await _repository.mtdBajaPerfil(intIdPerfil) == true)
            {
                return NoContent();
            }
            else return NotFound();
        }

        /*ACTIVAR*/
        //api/Perfil/mtdActivarPerfil?intIdPerfil=3
        [HttpPut("mtdActivarPerfil")]
        public async Task<ActionResult> mtdActivarPerfil(int intIdPerfil)
        {
            PerfilRepository _repository = new PerfilRepository(_connectionString);
            if (await _repository.mtdActivarPerfil(intIdPerfil) == true)
            {
                return NoContent();
            }
            else return NotFound();
        }
    }
}