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
    public class NotificacionesController : ControllerBase
    {
        private readonly string _connectionString;

        public NotificacionesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        //Se agrega las Acciones del Usuario o hijo
        //api/Notificaciones/mtdAgregarNotificaciones?strDescripcion=Martin&strStatus=Quiahua&imgLogo=JHFHJF
        [HttpPost("mtdAgregarNotificacion")]
        public async Task<ActionResult> mtdAgregarNotificacion(string strUsuario, string strNotificacion, decimal dcmSaldoMinimo)
        {
            NotificacionesRepository _repository = new NotificacionesRepository(_connectionString);
            if (await _repository.mtdAgregarNotificacion(strUsuario, strNotificacion,dcmSaldoMinimo))
            {
                return Ok("Notificacion agregada");
            }
            else return NotFound();
        }

        //Se obtinen las Notificaciones de los usuarios o hijos
        //api/Notificaciones/ObtenerNotificaciones?strUsuario=Martin_Q
        [HttpGet("ObtenerNotificaciones")]
        public async Task<ActionResult<List<Notificaciones>>> ObtenerNotificacion(string strUsuario)
        {
            NotificacionesRepository _repository = new NotificacionesRepository(_connectionString);
            var response = await _repository.mtdObtenerNotificaciones(strUsuario);
            if (response == null) { return NotFound(); }
            return response;
        }

        //Se Eliminan las Notificaciones del usuario o hijo.
        //api/Notificaciones/mtdEliminarNotifiHijo?strUsuario=Admin1&strNotificacion=CrearClientes  
        [HttpDelete("mtdEliminarNotifiHijo")]
        public async Task<ActionResult> mtdEliminarNotifiHijo(string strUsuario, string strNotificacion)
        {
            NotificacionesRepository _repository = new NotificacionesRepository(_connectionString);
            if (await _repository.mtdEliminarNotificacion(strUsuario, strNotificacion) == true)
            {
                return Ok("Notificacion eliminada");
            }
            else return NotFound();
        }

        //api/Notificaciones/mtdCambiarSaldominimo?strUsuario=MartinNotificacion1&dcmSaldoMinimo=110.00
        [HttpPut("mtdCambiarSaldominimo")]
        public async Task<ActionResult> mtdCambiarSaldominimo(string strUsuario, decimal dcmSaldoMinimo)
        {
            NotificacionesRepository _repository = new NotificacionesRepository(_connectionString);
            if (await _repository.mtdCambiarSaldoMinimo(strUsuario, dcmSaldoMinimo) == true)
            {
                return Ok("Se actualizo correctamente el Saldo minimo");
            }
            else return NotFound();
        }

    }
}