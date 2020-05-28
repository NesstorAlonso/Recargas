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
    public class TraspasoSaldoController : ControllerBase
    {
        private readonly string _connectionString;

        public TraspasoSaldoController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
       
        //mtdPara seleccionar un cliente

        [HttpGet("ObtenerSaldoCliente")]
        public async Task<ActionResult<List<ConsultaHijosSaldo>>> ObtenerSaldoCliente(string Id)
        {
            TraspasoSaldoRepository _repository = new TraspasoSaldoRepository(_connectionString);
            var response = await _repository.ObtenerSaldoCliente(Id);
            if (response == null) { return NotFound(); }
            return response;
        }  

        //TRANSFERENCIA TRANSACCIONAL DE SALDO
        //api/TraspasoSaldo/mtdTransacTransferirSaldo
        [HttpPost("mtdTransacTransferirSaldo")]
        public async Task<ActionResult> mtdTransacTransferirSaldo([FromBody] TraspasoSaldo traspasoSaldo)
        {
            TraspasoSaldoRepository _repository = new TraspasoSaldoRepository(_connectionString);
            if (await _repository.mtdTransacTransferirSaldo(traspasoSaldo) == true)
            {
                return Ok("Saldo transferido exitosamente");
            }
            else return NotFound();
        }
        //Mostrar los dartos del mes actual de traspasos
        //api/TraspasoSaldo/mtdObtenerTodasTransferencias
        [HttpGet("mtdObtenerTodasTransferencias")]
        public async Task<ActionResult<List<TraspasoSaldo2>>> mtdObtenerTodasTransferencias()
        {
            TraspasoSaldoRepository _repository = new TraspasoSaldoRepository(_connectionString);
            var response = await _repository.mtdObtenerTodasTransferencias();
            if (response == null) { return NotFound(); }
            return response;
        }


        //Mostrar los dartos del mes actual de traspasos
        //api/TraspasoSaldo/mtdTodosTraspasos
        [HttpGet("mtdTodosTraspasos")]
        public async Task<ActionResult<List<TraspasoSaldo2>>> mtdmtdTodosTraspasos()
        {
            TraspasoSaldoRepository _repository = new TraspasoSaldoRepository(_connectionString);
            var response = await _repository.mtdTodosTraspasos();
            if (response == null) { return NotFound(); }
            return response;
        }

        //Metodo para obtener el saldo actual del usuario logeado
        [HttpGet("ObtenerSaldoClienteLogin")]
        public async Task<ActionResult<List<ConsultaSaldoActual>>> ObtenerSaldoClienteLogin(string strIdUsuarioLog)
        {
            TraspasoSaldoRepository _repository = new TraspasoSaldoRepository(_connectionString);
            var response = await _repository.ObtenerSaldoClienteLogin(strIdUsuarioLog);
            if (response == null) { return NotFound(); }
            return response;
        }

        //Metodo para un filtro de busqueda por fecha
        [HttpGet("FiltroBusquedaFecha")]
        public async Task<ActionResult<List<TraspasoSaldo2>>> FiltroBusquedaFecha(DateTime FechaInicio, DateTime FechaFin)
        {
            TraspasoSaldoRepository _repository = new TraspasoSaldoRepository(_connectionString);
            var response = await _repository.mtdFiltroBusquedaPorFecha(FechaInicio, FechaFin);
            if (response == null) { return NotFound(); }
            return response;
        }

        //TRANSFERENCIA DE ABONO
        //api/TraspasoSaldo/mtdTransacTransferirAbono
        [HttpPost("mtdTransacTransferirAbono")]
        public async Task<ActionResult> mtdTransacTransferirAbono([FromBody] AbonoSaldo abonoSaldo)
        {
            TraspasoSaldoRepository _repository = new TraspasoSaldoRepository(_connectionString);
            if (await _repository.mtdTransacTransferirAbono(abonoSaldo) == true)
            {
                return Ok("Saldo abonado exitosamente");
            }
            else return NotFound();
        }

        //TRANSFERENCIA DE ABONO REchazado
        //api/TraspasoSaldo/mtdTransacTransferirAbonoRechazado
        [HttpPost("mtdTransacTransferirAbonoRechazado")]
        public async Task<ActionResult> mtdTransacTransferirAbonoRechazado([FromBody] AbonoSaldo abonoSaldo)
        {
            TraspasoSaldoRepository _repository = new TraspasoSaldoRepository(_connectionString);
            if (await _repository.mtdTransacTransferirAbonoRechazo(abonoSaldo) == true)
            {
                return Ok("Saldo Rechazado exitosamente");
            }
            else return NotFound();
        }
    }
}
