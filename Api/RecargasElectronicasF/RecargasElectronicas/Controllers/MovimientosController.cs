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
    public class MovimientosController : ControllerBase
    {
        private readonly string _connectionString;

        public MovimientosController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        //Metodo de Recargas de tienpo aire
        //api/Movimientos/mtdMovimientosRecargasServicios
        [HttpPost("mtdMovimientosRecargasServicios")]
        public async Task<ActionResult> mtdMovimientosRecargasServicios([FromBody] Movimientos movimientos)
        {
            MovimientosRepository _repository = new MovimientosRepository(_connectionString);
            if (await _repository.mtdMovimientos(movimientos) == true)
            {
                return Ok("Registro exitoso");
            }
            else return NotFound();
        }

        //Metodo para obtener todos los movimientos del cliente
        [HttpGet("ObtenerMovimientos")]
        public async Task<ActionResult<List<ObtenerMovimientos>>> ObtenerMovimientos(string strIdUsuario)
        {
            MovimientosRepository _repository = new MovimientosRepository(_connectionString);
            var response = await _repository.MtdObtenerTodosMovimientos(strIdUsuario);
            if (response == null) { return NotFound(); }
            return response;
        }
        //Metodo para obtener todos los movimientos del cliente por id
        [HttpGet("ObtenerMovimientosPorId")]
        public async Task<ActionResult<List<ObtenerMovimientos>>> ObtenerMovimientosPorId(int intIdMovimiento)
        {
            MovimientosRepository _repository = new MovimientosRepository(_connectionString);
            var response = await _repository.MtdObtenerTodosMovimientosPorId(intIdMovimiento);
            if (response == null) { return NotFound(); }
            return response;
        }

        //Metodo para obtener todos los movimientos del cliente por Mes
        [HttpGet("ObtenerMovimientosPorMes")]
        public async Task<ActionResult<List<ObtenerMovimientos>>> ObtenerMovimientosPorMes(int Mes, int Año)
        {
            MovimientosRepository _repository = new MovimientosRepository(_connectionString);
            var response = await _repository.MtdObtenerTodosMovimientosPorMes(Mes, Año);
            if (response == null) { return NotFound(); }
            return response;
        }
        //Metodo para obtener todos los movimientos del cliente por dia actual y el de ayer
        [HttpGet("ObtenerMovimientosPorDia")]
        public async Task<ActionResult<List<ObtenerMovimientos>>> ObtenerMovimientosPorDia(int Dia, int Mes, int Año)
        {
            MovimientosRepository _repository = new MovimientosRepository(_connectionString);
            var response = await _repository.MtdObtenerTodosMovimientosPorDia(Dia, Mes, Año);
            if (response == null) { return NotFound(); }
            return response;
        }
        //Comision de servicios
        //api/Movimientos/mtdMovimientosRecargasServicios
        [HttpPost("mtdComsionServicios")]
        public async Task<ActionResult> mtdComisionSer([FromBody] ComisionServicios cS)
        {
            MovimientosRepository _repository = new MovimientosRepository(_connectionString);
            if (await _repository.mtdCServicios(cS) == true)
            {
                return Ok("Registro exitoso");
            }
            else return NotFound();
        }
    }
}