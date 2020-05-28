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
    public class AvisosDepositosController : ControllerBase
    {
        private readonly string _connectionString;

        public AvisosDepositosController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        //api/AvisosDepositos/mtdInsertar
        [HttpPost("mtdInsertar")]
        public async Task<ActionResult> mtdInsertar([FromBody] AvisosDepositos avDep)
        {
            AvisosDepositosRepository _repository = new AvisosDepositosRepository(_connectionString);
            if (await _repository.mtdInsertar(avDep) == true)
            {
                return Ok("Aviso de pago agregadoo correctamente");
            }
            else return NotFound();
        }

        //api/AvisosDepositos/mtdObtenerArchivoPorId?intIdAvisoPago=2
        [HttpGet("mtdObtenerArchivoPorId")]
        public async Task<ActionResult<List<AvisosDepositos>>> mtdObtenerArchivoPorId(int intIdAvisoPago)
        {
            AvisosDepositosRepository _repository = new AvisosDepositosRepository(_connectionString);
            var response = await _repository.mtdObtenerArchivoPorId(intIdAvisoPago);
            if (response == null) { return NotFound(); }
            return response;
        }

        //para realizar la consulyta de depositos
        //api/AvisosDepositos/mtdObtenerTodosUsuarios
        [HttpGet("mtdObtenerDepositos")]
        public async Task<ActionResult<List<AvisosDepositos>>> mtdObtenerTodosUsuarios()
        {
            AvisosDepositosRepository _repository = new AvisosDepositosRepository(_connectionString);
            var response = await _repository.mtdObtenerDepositos();
            if (response == null) { return NotFound(); }
            return response;
        }

        //Para realizar el cambio de estatus de deposito de abono.
        //api/AvisosDepositos/mtdCambiarStatus?
        [HttpPut("mtdCambiarStatus")]
        public async Task<ActionResult> mtdCambiarStatus(int intIdAvisoPago,bool bitStatus, string strObservaciones)
        {
            AvisosDepositosRepository _repository = new AvisosDepositosRepository(_connectionString);
            if (await _repository.mtdCambiarStatus(intIdAvisoPago,bitStatus,strObservaciones) == true)
            {
                return Ok("Se actualizo correctamente el status de deposito abono");
            }
            else return NotFound();
        }
        //
        //Para obtener los usuarios que tienen depositos de abono pendinetes
        //api/AvisosDepositos/mtdObtenerAbonosPendientes?bitStatus=0
        [HttpGet("mtdObtenerAbonosPendientes")]
        public async Task<ActionResult<List<AvisosDepositos>>> mtdObtenerPagosPendientes(bool bitStatus)
        {
            AvisosDepositosRepository _repository = new AvisosDepositosRepository(_connectionString);
            var response = await _repository.mtdObtenerUsuariosPendientes(bitStatus);
            if (response == null) { return NotFound(); }
            return response;
        }
        //Valida que una referencia del deposito no se duplique.
        //api/AvisosDepositos/VerificaReferencia?strReferencia=
        [HttpGet("VerificaReferencia")]
        public async Task<ActionResult<List<VerificarReferencia>>> VerificarReferencia(string strReferencia)
        {
            AvisosDepositosRepository _repository = new AvisosDepositosRepository(_connectionString);
            var response = await _repository.mtdVerificarReferencia(strReferencia);
            if (response == null) { return NotFound(); }
            return response;
        }
        //Metodo para un filtro de busqueda por fecha
        [HttpGet("FiltroBusquedaFechaInfoCuenta")]
        public async Task<ActionResult<List<AvisosDepositos>>> FiltroBusquedaFechaInfoCuenta(DateTime FechaInicio, DateTime FechaFin)
        {
            AvisosDepositosRepository _repository = new AvisosDepositosRepository(_connectionString);
            var response = await _repository.mtdFiltroBusquedaPorFechaInfoCuenta(FechaInicio, FechaFin);
            if (response == null) { return NotFound(); }
            return response;
        }
    }
}