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
    public class DiasServicioController : ControllerBase
    {
        private readonly string _connectionString;

        public DiasServicioController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        
        //api/DiasServicio/mtdAgregarDia?strVendedor=Martin&strDia=Lunes
        [HttpPost("mtdAgregarDia")]
        public async Task<ActionResult> mtdAgregarDia(string strVendedor, string strDia)
        {
            DiasServicioRepository _repository = new DiasServicioRepository(_connectionString);
            if (await _repository.mtdAgregarDia(strVendedor, strDia))
            {
                return Ok("Se agrego correctamente");
            }
            else return NotFound();
        }
        //
        //Se obtinen las acciones de los usuarios o hijos
        //api/DiasServicio/ObtenerDia?strVendedor=Martin
        [HttpGet("ObtenerDia")]
        public async Task<ActionResult<List<DiasServicio>>> ObtenerDias(string strVendedor)
        {
            DiasServicioRepository _repository = new DiasServicioRepository(_connectionString);
            var response = await _repository.mtdObtenerDiasServicio(strVendedor);
            if (response == null) { return NotFound(); }
            return response;
        }
        //
        //Se Eliminan los dias del vendedor
        //api/DiasServicio/mtdEliminarDia?strVendedor=MartinQuiahua&strDia='Lunes' 
        [HttpDelete("mtdEliminarDia")]
        public async Task<ActionResult> mtdEliminarDia(string strVendedor, string strDia)
        {
            DiasServicioRepository _repository = new DiasServicioRepository(_connectionString);
            if (await _repository.mtdEliminarDia(strVendedor, strDia) == true)
            {
                return Ok("Dia eliminado");
            }
            else return NotFound();
        }
        //

    }
}