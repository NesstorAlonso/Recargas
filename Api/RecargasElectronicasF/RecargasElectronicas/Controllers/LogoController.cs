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
    public class LogoController : ControllerBase
    {
        private readonly string _connectionString;

        public LogoController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //api/AvisosDepositos/mtdInsertar
        [HttpPost("mtdSubirLogoU")]
        public async Task<ActionResult> subirLogo([FromBody] Logo logo)
        {
            LogoRepository _repository = new LogoRepository(_connectionString);
            if (await _repository.mtdSubirLogo(logo) == true)
            {
                return Ok("Logo subido correctamente.");
            }
            else return NotFound();
        }
        //Mtd para obtener el logo del usuario logeado
        //api/log/mtdObtenerLogo?strIdUsuario=
        [HttpGet("mtdObtenerLogo")]
        public async Task<ActionResult<List<Obtenerlogo>>> mtdObtenerLogo(string strIdUsuario)
        {
            LogoRepository _repository = new LogoRepository(_connectionString);
            var response = await _repository.mtdObtenerLogo(strIdUsuario);
            if (response == null) { return NotFound(); }
            return response;
        }
    }
}