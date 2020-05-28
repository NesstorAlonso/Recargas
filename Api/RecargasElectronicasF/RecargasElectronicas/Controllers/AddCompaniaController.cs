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
using System.Security.Claims;
using System.Threading.Tasks;



namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigins")]

    public class AddCompaniaController: ControllerBase
    {
        private readonly string _connectionString;

        public AddCompaniaController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        //api/AddCompania/mtdAgregarCompania?strDescripcion=Martin&strStatus=Quiahua&imgLogo=JHFHJF
        [HttpPost("mtdAgregarCompania")]
        public async Task<ActionResult> mtdAgregarCompania(string strDescripcion, string strStatus, string imgLogo)
        {
            AddCompaniaRepository _repository = new AddCompaniaRepository(_connectionString);
            if (await _repository.mtdAgregarCompania(strDescripcion, strStatus, imgLogo))
            {
                return Ok("Se agrego correctamente");
            }
            else return NotFound();
        }
    }
}
