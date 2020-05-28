using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecargasElectronicas.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecargasElectronicas.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [EnableCors("AllowOrigins")]   
    public class JoinIDController : ControllerBase
    {
        private readonly string _connectionString;

        public JoinIDController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }



        //api/JoinID/mtdObtenerPorIdPVjoin?intIdPunVenta=1
        [HttpGet("mtdObtenerPorIdPVjoin")]
        public async Task<ActionResult<List<JoinID>>> mtdObtenerPorIdPVjoin(int intIdPunVenta)
        {
            JoinIDRepository _repository = new JoinIDRepository(_connectionString);
            var response = await _repository.mtdObtenerPorIdPVjoin(intIdPunVenta);
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/JoinID/mtdPVjoinUTodo
        [HttpGet("mtdPVjoinUTodo")]
        public async Task<ActionResult<List<JoinID>>> mtdPVjoinUTodo()
        {
            JoinIDRepository _repository = new JoinIDRepository(_connectionString);
            var response = await _repository.mtdPVjoinUTodo();
            if (response == null) { return NotFound(); }
            return response;
        }


    }
}
