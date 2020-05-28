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
    
    public class UsuarioPVJoinController : ControllerBase
    {
        private readonly string _connectionString;

        public UsuarioPVJoinController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }


        //api/UsuarioPVJoin/mtdUsuarioJoinPVTodo
        [HttpGet("mtdUsuarioJoinPVTodo")]
        public async Task<ActionResult<List<UsuarioPVJoin>>> mtdUsuarioJoinPVTodo()
        {
            UsuarioPVJoinRepository _repository = new UsuarioPVJoinRepository(_connectionString);
            var response = await _repository.mtdUsuarioJoinPVTodo();
            if (response == null) { return NotFound(); }
            return response;
        }


    }
}
