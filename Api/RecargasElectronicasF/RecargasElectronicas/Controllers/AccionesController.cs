using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecargasElectronicas.Data;
using RecargasElectronicas.Entities;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccionesController : ControllerBase
    {
        private readonly string _connectionString;

        public AccionesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //Se agrega las Acciones del Usuario o hijo
        //api/AddCompania/mtdAgregarCompania?strDescripcion=Martin&strStatus=Quiahua&imgLogo=JHFHJF
        [HttpPost("mtdAgregarAccion")]
        public async Task<ActionResult> mtdAgregarCompania(string claveUsuario, string strPermiso)
        {
            AccionesRepository _repository = new AccionesRepository(_connectionString);
            if (await _repository.mtdAgregarAccion(claveUsuario, strPermiso))
            {
                return Ok("Se agrego correctamente");
            }
            else return NotFound();
        }

        //Se obtinen las acciones de los usuarios o hijos
        //api/Acciones/ObtenerAcciones?UserName=Martin_Q
        [HttpGet("ObtenerAcciones")]
        public async Task<ActionResult<List<AsignaAcciones>>> ObtenerRol(string claveUsuario)
        {
            AccionesRepository _repository = new AccionesRepository(_connectionString);
            var response = await _repository.mtdObtenerAsignaAcciones(claveUsuario);
            if (response == null) { return NotFound(); }
            return response;
        }

        //Se Eliminan las acciones del usuario o hijo.
        //api/Acciones/mtdEliminarHijo?claveUsuario=Admin1&strPermiso=CrearClientes  
        [HttpDelete("mtdEliminarHijo")]
        public async Task<ActionResult> mtdEliminarHijo(string claveUsuario, string strPermiso)
        {
            AccionesRepository _repository = new AccionesRepository(_connectionString);
            if (await _repository.mtdEliminarAccion(claveUsuario,strPermiso) == true)
            {
                return Ok("Accion eliminada");
            }
            else return NotFound();
        }

    }
}