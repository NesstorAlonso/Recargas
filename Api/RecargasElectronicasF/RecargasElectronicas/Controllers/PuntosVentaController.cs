using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecargasElectronicas.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigins")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PuntosVentaController : ControllerBase
    {
        private readonly string _connectionString;

        public PuntosVentaController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }


        //api/PuntosVenta/mtdObtenerPuntosVenta
        [HttpGet("mtdObtenerPuntosVenta")]
        public async Task<ActionResult<List<PuntosVenta>>> mtdObtenerPuntosVenta()
        {
            PuntosVentaRepository _repository = new PuntosVentaRepository(_connectionString);
            var response = await _repository.mtdObtenerPuntosVenta();
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/PuntosVenta/mtdObtenerPorIdPuntosVenta?intIdPunVenta=1
        [HttpGet("mtdObtenerPorIdPuntosVenta")]
        public async Task<ActionResult<List<PuntosVenta>>> mtdObtenerPorIdPuntosVenta(int intIdPunVenta)
        {
           PuntosVentaRepository _repository = new PuntosVentaRepository(_connectionString);
            var response = await _repository.mtdObtenerPorIdPuntosVenta(intIdPunVenta);
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/PuntosVenta/mtdInsertarPuntoVenta?strDescripcion=Cadenacomercial&strCalle=CalleHill&strNumExt=135&strNumInt=1&strCodPos=94462&strMunicipio=Orizaba&strColonia=Centro&strEstado=Veracruz&strLatitud=18.845269&strLongitud=-97.106132&intIdResponsable=2
        [HttpPost("mtdInsertarPuntoVenta")]
        public async Task<ActionResult> mtdInsertarPuntoVenta(string strDescripcion, string strCalle, string strNumExt, string strNumInt, string strCodPos, string strMunicipio, string strColonia, string strEstado, string strLatitud, string strLongitud, int intIdResponsable)
        {
            PuntosVentaRepository _repository = new PuntosVentaRepository(_connectionString);
            if (await _repository.mtdInsertarPuntoVenta(strDescripcion, strCalle, strNumExt, strNumInt, strCodPos, strMunicipio, strColonia, strEstado, strLatitud, strLongitud, intIdResponsable))
            {
                return Ok("Punto de venta agregado correctamente");
            }
            else return NotFound();
        }

        //api/PuntosVenta/mtdCambiarPuntoVenta?intIdPunVenta=5&strDescripcion=Cadenacomercial&strCalle=CalleHill&strNumExt=135&strNumInt=1&strCodPos=94462&strMunicipio=Orizaba&strColonia=Centro&strEstado=Veracruz&strLatitud=18.845269&strLongitud=-97.106132&intIdResponsable=2
        [HttpPut("mtdCambiarPuntoVenta")]
        public async Task<ActionResult> mtdCambiarPuntoVenta(int intIdPunVenta, string strDescripcion, string strCalle, string strNumExt, string strNumInt, string strCodPos, string strMunicipio, string strColonia, string strEstado, string strLatitud, string strLongitud, int intIdResponsable)
        {
            PuntosVentaRepository _repository = new PuntosVentaRepository(_connectionString);
            if (await _repository.mtdCambiarPuntoVenta(intIdPunVenta, strDescripcion, strCalle, strNumExt, strNumInt, strCodPos, strMunicipio, strColonia, strEstado, strLatitud, strLongitud, intIdResponsable) == true)
            {
                return Ok("Punto de venta actualizado");
            }
            else return NotFound();
        }

        //api/PuntosVenta/mtdEliminarPuntoVenta?intIdPunVenta=4
        [HttpDelete("mtdEliminarPuntoVenta")]
        public async Task<ActionResult> mtdEliminarPuntoVenta(int intIdPunVenta)
        {
            PuntosVentaRepository _repository = new PuntosVentaRepository(_connectionString);
            if (await _repository.mtdEliminarPuntoVenta(intIdPunVenta) == true)
            {
                return NoContent();
            }
            else return NotFound();
        }
    }
}
