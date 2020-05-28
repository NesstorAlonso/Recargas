using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SkusController : ControllerBase
    {
        private readonly string _connectionString;

        public SkusController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //api/Skus/mtdObtenerSkuVirgin
        [HttpGet("mtdObtenerSkuVirgin")]
        public async Task<ActionResult<List<SkusVirgin>>> mtdObtenerSkuVirgin()
        {
            SkusRepository _repository = new SkusRepository(_connectionString);
            var response = await _repository.mtdObtenerSkuVirgin();
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/Skus/mtdObtenerSkuTuenti
        [HttpGet("mtdObtenerSkuTuenti")]
        public async Task<ActionResult<List<SkusTuenti>>> mtdObtenerSkuTuenti()
        {
            SkusRepository _repository = new SkusRepository(_connectionString);
            var response = await _repository.mtdObtenerSkuTuenti();
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/Skus/mtdObtenerSkuMazTi
        [HttpGet("mtdObtenerSkuMazTi")]
        public async Task<ActionResult<List<SkusMazTi>>> mtdObtenerSkuMazTi()
        {
            SkusRepository _repository = new SkusRepository(_connectionString);
            var response = await _repository.mtdObtenerSkuMazTi();
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/Skus/mtdObtenerSkuWeex
        [HttpGet("mtdObtenerSkuWeex")]
        public async Task<ActionResult<List<SkusWeex>>> mtdObtenerSkuWeex()
        {
            SkusRepository _repository = new SkusRepository(_connectionString);
            var response = await _repository.mtdObtenerSkuWeex();
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/Skus/mtdObtenerSkuServicios
        [HttpGet("mtdObtenerSkuServicios")]
        public async Task<ActionResult<List<SkusServicios>>> mtdObtenerSkuServicios()
        {
            SkusRepository _repository = new SkusRepository(_connectionString);
            var response = await _repository.mtdObtenerSkuServicios();
            if (response == null) { return NotFound(); }
            return response;
        }


    }
}
