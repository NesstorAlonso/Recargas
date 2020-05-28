using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecargasElectronicas.Data;
using RecargasElectronicas.Entities;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    //[EnableCors("AllowOrigins")]
    public class ComisionController : ControllerBase
    {
        private readonly string _connectionString;

        public ComisionController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        //api/Comision/mtdComision_Obtener_ID?strIdUsuario=34653dce-e099-40bc-be24-992c2c0cceae
        [HttpGet("mtdComision_Obtener_ID")]
        public async Task<ActionResult<List<Comision>>> mtdComision_Obtener_ID(string strIdUsuario)
        {
            ComisionRepository _repository = new ComisionRepository(_connectionString);
            var response = await _repository.mtdComision_Obtener_ID(strIdUsuario);
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/Comision/mtdComision_ObtenerTodas
        [HttpGet("mtdComision_ObtenerTodas")]
        public async Task<ActionResult<List<Comision>>> mtdComision_ObtenerTodas()
        {
            ComisionRepository _repository = new ComisionRepository(_connectionString);
            var response = await _repository.mtdComision_ObtenerTodas();
            if (response == null) { return NotFound(); }
            return response;
        }

        //api/Comision/mtdComision_Alta?strIdUsuario=34653dce-e099-40bc-be24-992c2c0cceae&strSku=073&decComision=1.231&strTipo=Recarga&strUnidad=%
        [HttpPost("mtdComision_Alta")]
        public async Task<ActionResult> mtdComision_Alta(string strIdUsuario, string strSku, decimal decComision, string strTipo, string strUnidad)
        {
            ComisionRepository _repository = new ComisionRepository(_connectionString);
            if (await _repository.mtdComision_Alta( strIdUsuario, strSku, decComision, strTipo, strUnidad))
            {
                return Ok("Se agrego correctamente la comision");
            }
            else return NotFound();
        }


        //api/Comision/mtdModificarComision?intIdComision=2114&strIdUsuario=7a4046fb-0adf-4434-8022-4c794cf981d1&strSku=0&decComision=4&strTipo=Servicio& strUnidad=$
        [HttpPut("mtdModificarComision")]
        public async Task<ActionResult> mtdModificarComision(int intIdComision, string strIdUsuario, string strSku, decimal decComision, string strTipo, string strUnidad)
        {
            ComisionRepository _repository = new ComisionRepository(_connectionString);
            if (await _repository.mtdModificarComision(intIdComision, strIdUsuario, strSku, decComision, strTipo, strUnidad) == true)
            {
                return Ok("Se actualizo correctamente la comision");
            }
            else return NotFound();
        }

        //api/Comision/mtdComision_Obtener_IDComision?intIdComision=2098
        [HttpGet("mtdComision_Obtener_IDComision")]
        public async Task<ActionResult<List<Comision2>>> mtdComision_Obtener_IDComision(int intIdComision)
        {
            Comision2Repository _repository = new Comision2Repository(_connectionString);
            var response = await _repository.mtdComision_Obtener_IDComision(intIdComision);
            if (response == null) { return NotFound(); }
            return response;
        }


    }
}

