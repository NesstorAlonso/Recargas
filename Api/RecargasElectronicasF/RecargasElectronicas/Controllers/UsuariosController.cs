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
using System.Security.Claims;
using System.Threading.Tasks;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [EnableCors("AllowOrigins")]  
    public class UsuariosController : ControllerBase
    {
        private readonly string _connectionString;

        public UsuariosController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }


        //api/Usuarios/mtdObtenerTodosUsuarios
        [HttpGet("mtdObtenerTodosUsuarios")]
        public async Task<ActionResult<List<Usuarios>>> mtdObtenerTodosUsuarios()
        {
            //var claims = User.Claims.ToList();
            //var esAdmin = claims.Any(x => x.Type == "Admin" && x.Value == "Y");
            //if (esAdmin){ 
            UsuariosRepository _repository = new UsuariosRepository(_connectionString);
            var response = await _repository.mtdObtenerUsuarios();
            if (response == null) { return NotFound(); }
            return response;
           // }
            //else
            //{
             //   return NotFound("No eres Administrador");
            //}
        }

        //api/Usuarios/mtdObtenerPorIdUsuarios?intIdUsuario=1
        [HttpGet("mtdObtenerPorIdUsuarios")]
        public async Task<ActionResult<List<Usuarios>>> mtdObtenerPorIdUsuarios(int intIdUsuario)
        {
            UsuariosRepository _repository = new UsuariosRepository(_connectionString);
            var response = await _repository.mtdObtenerPorIdUsuarios(intIdUsuario);
            if (response == null) { return NotFound(); }
            return response;
        }

        ////
        //api/Usuarios/mtdObtenerPorIdPuntoVenta?intIdPuntoVenta=1
        [HttpGet("mtdObtenerPorIdPuntoVenta")]
        public async Task<ActionResult<List<Usuarios>>> mtdObtenerPorIdPuntoVenta(int intIdPuntoVenta)
        {
            UsuariosRepository _repository = new UsuariosRepository(_connectionString);
            var response = await _repository.mtdObtenerPorIdPuntoVenta(intIdPuntoVenta);
            if (response == null) { return NotFound(); }
            return response;
        }
        ///

        //api/Usuarios/mtdInsertarUsuarios?strNombre=Martin&strApp=Quiahua&strApm=Calihua&strContrasena=1234&strCorreo=prueba@gmail.com&strTelefono=123456789&intIdTipoUsuario=1&intIdPerfil=1&dtmFechaNac=2019-08-02 00:00:00&bitSexo=true&bitPersonaFiscal=true&strRFC=12121212&intIdPuntoVenta=1&intIdDistribuidor=1
        [HttpPost("mtdInsertarUsuarios")]
        public async Task<ActionResult> mtdInsertarUsuarios(string strNombre, string strApp, string strApm, string strContrasena, string strCorreo, string strTelefono,
            int intIdTipoUsuario, int intIdPerfil, DateTime dtmFechaNac, bool bitSexo, bool bitPersonaFiscal, string strRFC, int intIdPuntoVenta, int intIdDistribuidor)
        {
            UsuariosRepository _repository = new UsuariosRepository(_connectionString);
            if (await _repository.mtdInsertarUsuarios(strNombre, strApp, strApm, strContrasena, strCorreo, strTelefono,intIdTipoUsuario, intIdPerfil, dtmFechaNac, bitSexo, bitPersonaFiscal, strRFC, intIdPuntoVenta, intIdDistribuidor))
            {
                return Ok("Se agrego correctamente el Acuerdo SLA");
            }
            else return NotFound();
        }

        //api/Usuarios/mtdCambiarUsuarios?
        [HttpPut("mtdCambiarUsuarios")]
        public async Task<ActionResult> mtdCambiarUsuarios(int intIdUsuario, string strNombre, string strApp, string strApm, string strContrasena, string strCorreo, string strTelefono,
            int intIdTipoUsuario, int intIdPerfil, DateTime dtmFechaNac, bool bitSexo, bool bitPersonaFiscal, string strRFC, int intIdPuntoVenta, int intIdDistribuidor)
        {
            UsuariosRepository _repository = new UsuariosRepository(_connectionString);
            if (await _repository.mtdCambiarUsuarios(intIdUsuario, strNombre, strApp, strApm, strContrasena, strCorreo, strTelefono, intIdTipoUsuario, intIdPerfil, dtmFechaNac, bitSexo, bitPersonaFiscal, strRFC, intIdPuntoVenta, intIdDistribuidor) == true)
            {
                return Ok("Se actualizo correctamente el Acuerdo SLA");
            }
            else return NotFound();
        }

        //api/Usuarios/mtdEliminarUsuario?intIdUsuario=4  
        [HttpDelete("mtdEliminarUsuario")]
        public async Task<ActionResult> mtdEliminarUsuario(int intIdUsuario)
        {
            UsuariosRepository _repository = new UsuariosRepository(_connectionString);
            if (await _repository.mtdEliminarUsuario(intIdUsuario) == true)
            {
                return NoContent();
            }
            else return NotFound();
        }

        //controlador de login
        //api/Usuarios/mtdLogin?strCorreo=martin@hotmail.com&strContrasena=1234567890
        [HttpPost("mtdLogin")]
        public async Task<ActionResult> mtdLogin(string strCorreo, string strContrasena)
        {
            UsuariosRepository _repository = new UsuariosRepository(_connectionString);
            if (await _repository.mtdLogin(strCorreo, strContrasena))
            {
                return Ok("Bienvenido");
            }
            else return NotFound("");
        }

        //termina login
    }
}
