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
    public class MovimientosRComisionController : ControllerBase
    {
        private readonly string _connectionString;

        public MovimientosRComisionController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        //Metodo de Recargas de tienpo aire
        //api/MovimientosRComision/mtdMovimientosReComision
        [HttpPost("mtdMovimientosReComision")]
        public async Task<ActionResult> mtdMovimientosRComisi([FromBody] MovimientosRComision movimientosComision)
        {
            MovimientosRComisionRepository _repository = new MovimientosRComisionRepository(_connectionString);
            if (await _repository.mtdMovimientosRComision(movimientosComision) == true)
            {
                return Ok("Registro de comision guardada");
            }
            else return NotFound();
        }

        //Metodo para obtener todos los movimientos del cliente
        [HttpGet("ObtenerMovimientosRComision")]
        public async Task<ActionResult<List<ObtenerTodosMovimientosComisionRecarga>>> ObtenerMovimientos(string strIdUsuario)
        {
            MovimientosRComisionRepository _repository = new MovimientosRComisionRepository(_connectionString);
            var response = await _repository.MtdObtenerTodosMovimientosComisionR(strIdUsuario);
            if (response == null) { return NotFound(); }
            return response;
        }
        //api/MovimientosRComision/mtdInsertarTranferenciaComision? strEqComision=0 & strComisionVigente=0&strUtilidadRecarga=0&strCostoRecarga=0&dcmMontoInicialR=0&dcmMontoFinalR=0&dcmMontoRecarga=1&strUsuario=Martin&dcmTraspasoAbono=12&dtmFecha=2019-08-02 00:00:00
        //insertar el movimiento en comision de recarga
        [HttpPost("mtdInsertarTranferenciaComision")]
        public async Task<ActionResult> mtdInsertarTransferencia(string strEqComision, string strComisionVigente, string strUtilidadRecarga, string strCostoRecarga, decimal dcmMontoInicialR, decimal dcmMontoFinalR,
             decimal dcmMontoRecarga, string strUsuario, string TraspasoAbono, DateTime dtmFecha)
        {
            MovimientosRComisionRepository _repository = new MovimientosRComisionRepository(_connectionString);
            if (await _repository.mtdInsertarTransferencia(strEqComision, strComisionVigente, strUtilidadRecarga, strCostoRecarga, dcmMontoInicialR, dcmMontoFinalR, dcmMontoRecarga, strUsuario, TraspasoAbono, dtmFecha))
            {
                return Ok("Se agrego correctamente");
            }
            else return NotFound();
        }
        //Obtener por dia

        //Metodo para obtener los datos por dia o el dia actual
        [HttpGet("ObtenerComisionRecargasPorDia")]
        public async Task<ActionResult<List<ObtenerTodosMovimientosComisionRecargaPorDia>>> ObtenerComisionRecargasPorDia(int Dia, int Mes, int Año)
        {
            MovimientosRComisionRepository _repository = new MovimientosRComisionRepository(_connectionString);
            var response = await _repository.MtdObtenerTodosComisionRPorDia(Dia, Mes, Año);
            if (response == null) { return NotFound(); }
            return response;
        }
    }
}