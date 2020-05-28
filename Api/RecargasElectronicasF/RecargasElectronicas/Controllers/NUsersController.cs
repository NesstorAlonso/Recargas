using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
    //[Authorize(Roles ="Administrador, Cliente")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class NUsersController : ControllerBase
    {
        
            private readonly string _connectionString;

            public NUsersController(IConfiguration configuration)
            {
                _connectionString = configuration.GetConnectionString("DefaultConnectionString");
            }


        //api/NUsers/mtdObtenerNUsuarios
        [HttpGet("mtdObtenerNUsuarios")]
        public async Task<ActionResult<List<NUsers>>> mtdObtenerNUsuarios()
        {
            NUsersRepository _repository = new NUsersRepository(_connectionString);
            var response = await _repository.mtdObtenerNUsuarios();
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/NUsers/mtdNUsers_ID?UserName=GehoMP
        [HttpGet("mtdNUsers_ID")]
        public async Task<ActionResult<List<NUsers2>>> mtdNUsers_ID(string UserName)
        {
            NUsersRepository _repository = new NUsersRepository(_connectionString);
            var response = await _repository.mtdNUsers_ID(UserName);
            if (response == null) { return NotFound(); }
            return response;
        }


    }

    }
