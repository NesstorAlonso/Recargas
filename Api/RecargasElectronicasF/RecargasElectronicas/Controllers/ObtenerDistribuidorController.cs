using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecargasElectronicas.Data;
using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigins")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ObtenerDistribuidorController : ControllerBase
    {
        private readonly string _connectionString;

        public ObtenerDistribuidorController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //api/ObtenerDistribuidor/mtdObtenerDistribuidor?intIdDistribuidor=55
        [HttpGet("mtdObtenerDistribuidor")]
        public async Task<ActionResult<List<ObtenerDistribuidor>>> mtdObtenerDistribuidor(int intIdDistribuidor)
        {
            ObtenerDistribuidorRepository _repository = new ObtenerDistribuidorRepository(_connectionString);
            var response = await _repository.mtdObtenerDistribuidor(intIdDistribuidor);
            if (response == null) { return NotFound(); }
            return response;
        }


        //api/ObtenerDistribuidor/mtdObtenerDistribuidor2?intIdUsuario=55
        [HttpGet("mtdObtenerDistribuidor2")]
        public async Task<ActionResult<List<ObtenerDistribuidor>>> mtdObtenerDistribuidor2(int intIdUsuario)
        {
            ObtenerDistribuidorRepository _repository = new ObtenerDistribuidorRepository(_connectionString);
            var response = await _repository.mtdObtenerDistribuidor2(intIdUsuario);
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/ObtenerDistribuidor/mtdObtenerDistribuidor3?intIdUsuario=55
        [HttpGet("mtdObtenerDistribuidor3")]
        public async Task<ActionResult<List<ObtenerDistribuidor>>> mtdObtenerDistribuidor3(int intIdDistribuidor)
        {
            ObtenerDistribuidorRepository _repository = new ObtenerDistribuidorRepository(_connectionString);
            var response = await _repository.mtdObtenerDistribuidor3(intIdDistribuidor);
            if (response == null) { return NotFound(); }
            return response;
        }
    }
}
