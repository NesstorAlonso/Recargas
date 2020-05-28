using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecargasElectronicas.Entities;
using RecargasElectronicas.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace RecargasElectronicas.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        [EnableCors("AllowOrigins")]
       [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class OpcionesController : ControllerBase
        {
            private readonly string _connectionString;

            public OpcionesController(IConfiguration configuration)
            {
                _connectionString = configuration.GetConnectionString("DefaultConnectionString");
            }


            //api/Opciones/mtdObtenerTodosOpciones
            [HttpGet("mtdObtenerTodosOpciones")]
            public async Task<ActionResult<List<Opciones>>> mtdObtenerTodosOpciones()
            {
                OpcionesRepository _repository = new OpcionesRepository(_connectionString);
                var response = await _repository.mtdObtenerOpciones();
                if (response == null) { return NotFound(); }
                return response;
            }

        //api/Opciones/mtdObtenerPorIdOpciones?intIdOpcion=1
        [HttpGet("mtdObtenerPorIdOpciones")]
            public async Task<ActionResult<List<Opciones>>> mtdObtenerPorIdOpciones(int intIdOpcion)
            {
                OpcionesRepository _repository = new OpcionesRepository(_connectionString);
                var response = await _repository.mtdObtenerPorIdOpciones(intIdOpcion);
                if (response == null) { return NotFound(); }
                return response;
            }

        //api/Opciones/mtdInsertarOpciones?strOpcion=nombre
        [HttpPost("mtdInsertarOpciones")]
            public async Task<ActionResult> mtdInsertarOpciones(string strOpcion)
            {
            OpcionesRepository _repository = new OpcionesRepository(_connectionString);
                if (await _repository.mtdInsertarOpciones(strOpcion))
                {
                    return Ok("Se agrego correctamente el Acuerdo SLA");
                }
                else return NotFound();
            }

            //api/AcuerdosSLA/mtdCambiarAcuerdoSLA?
            [HttpPut("mtdCambiarOpciones")]
            public async Task<ActionResult> mtdCambiarOpcion(int intIdOpcion, string strOpcion)
            {
            OpcionesRepository _repository = new OpcionesRepository(_connectionString);
                if (await _repository.mtdCambiarOpciones(intIdOpcion, strOpcion) == true)
                {
                    return Ok("Se actualizo correctamente el Acuerdo SLA");
                }
                else return NotFound();
            }

        //api/Opciones/mtdBajaOpciones?intIdOpcion=1
        [HttpPut("mtdBajaOpciones")]
            public async Task<ActionResult> mtdBajaOpciones(int intIdOpcion)
            {
                OpcionesRepository _repository = new OpcionesRepository(_connectionString);
                if (await _repository.mtdBajaOpciones(intIdOpcion) == true)
                {
                    return NoContent();
                }
                else return NotFound();
            }


            [HttpPut("mtdActivarOpciones")]
            public async Task<ActionResult> mtdActivarOpciones(int intIdOpcion)
            {
                OpcionesRepository _repository = new OpcionesRepository(_connectionString);
                if (await _repository.mtdActivarOpciones(intIdOpcion) == true)
                {
                    return NoContent();
                }
                else return NotFound();
            }
        }
    }
