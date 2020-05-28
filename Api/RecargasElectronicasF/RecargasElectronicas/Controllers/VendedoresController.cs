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
    public class VendedoresController : ControllerBase
    {
        private readonly string _connectionString;

        public VendedoresController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //api/Vendedores/ObtenerVendedores?Name=Vendedor
        [HttpGet("ObtenerVendedores")]
        public async Task<ActionResult<List<Vendedores>>> ObtenerVendedores(string Id, char strEstatus)
        {
            VendedoresRepository _repository = new VendedoresRepository(_connectionString);
            var response = await _repository.mtdObtenerVendedores(Id, strEstatus);
            if (response == null) { return NotFound(); }
            return response;
        }
    }
}