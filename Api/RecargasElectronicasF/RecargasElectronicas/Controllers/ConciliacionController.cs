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
    public class ConciliacionController : ControllerBase
    {
        private readonly string _connectionString;

        public ConciliacionController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }


        //api/Conciliacion/mtdObtenerConciliacion
        [HttpGet("mtdObtenerConciliacion")]
        public async Task<ActionResult<List<Conciliacion>>> mtdObtenerConciliacion()
        {
            ConciliacionRepository _repository = new ConciliacionRepository(_connectionString);
            var response = await _repository.mtdObtenerConciliacion();
            if (response == null) { return NotFound(); }
            return response;
        }
    }
}