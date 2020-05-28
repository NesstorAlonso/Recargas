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
    public class ConsultaHijosController : ControllerBase
    {
        private readonly string _connectionString;

        public ConsultaHijosController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }
        //api/ConsultaHijos/ObtenerHijos?Id=76cdfa8c-0c7e-40c9-839c-4803b556652a&strEstatus=A
        [HttpGet("ObtenerHijos")]
        public async Task<ActionResult<List<ConsultaHijos>>> ObtenerHijos(string Id, char strEstatus)
        {
            ConsultaHijosRepository _repository = new ConsultaHijosRepository(_connectionString);
            var response = await _repository.mtdObtenerConsultaHijos(Id, strEstatus);
            if (response == null) { return NotFound(); }
            return response;
        }
        //Para Obtener por id los datos del usuario y depues poder modificarlos
        //api/ConsultaHijos/mtdObtenerPorIdHijosInfo?Id=76cdfa8c-0c7e-40c9-839c-4803b556652a
        [HttpGet("mtdObtenerPorIdHijosInfo")]
        public async Task<ActionResult<List<ObtenerInfoPorId>>> mtdObtenerPorIdUsuarios(string Id)
        {
            ConsultaHijosRepository _repository = new ConsultaHijosRepository(_connectionString);
            var response = await _repository.mtdObtenerPorIdInfoHijos(Id);
            if (response == null) { return NotFound(); }
            return response;
        }


        //Empieza la modificacion de insertar los datos de los hijos.
        //api/ConsultaHijos/mtdInsertarUsuariosHijos?Id=
        [HttpPut("mtdInsertarUsuariosHijos")]
        public async Task<ActionResult> mtdInsertarUsuariosDistribuidor(string Id, bool bitTipoPersona, string strNombre, string strApaterno, string strAmaterno, DateTime dtmFechaNacimiento, string strRFC,
           bool bitGenero, string strCompania, string strCp, string strEstado, string strMunicipio, string strColonia, string strTVialidad, string strCalle, string strNumExt, string strNumInt, string strContacto, string strComercio, string strTelefono)
        {
            ConsultaHijosRepository _repository = new ConsultaHijosRepository(_connectionString);
            if (await _repository.mtdModificarUsuariosHijos(Id, bitTipoPersona, strNombre, strApaterno, strAmaterno, dtmFechaNacimiento, strRFC,
           bitGenero, strCompania, strCp, strEstado, strMunicipio, strColonia, strTVialidad, strCalle, strNumExt, strNumInt, strContacto, strComercio, strTelefono) == true)
            {
                return Ok("Modificacion correcta");
            }
            else return NotFound();
        }
        //
        //Para Obtener por id los datos del usuario y depues poder modificarlos
        //api/ConsultaHijos/mtdObtenerPorIdHijosInfoV?Id=80d8220b-a518-46c5-92f3-44f4636149a4
        [HttpGet("mtdObtenerPorIdHijosInfoV")]
        public async Task<ActionResult<List<ObtenerInfoVPorId>>> mtdObtenerPorIdHijosInfoV(string Id)
        {
            ConsultaHijosRepository _repository = new ConsultaHijosRepository(_connectionString);
            var response = await _repository.mtdObtenerPorIdHijosInfoV(Id);
            if (response == null) { return NotFound(); }
            return response;
        }
        //
        //Valida si un usuario ya existe o es nuevo
        //api/ConsultaHijos/VerificaUsuarioNuevo?UserName=
        [HttpGet("VerificaUsuarioNuevo")]
        public async Task<ActionResult<List<VerificarUsuario>>> VerificarUsuario(string UserName)
        {
            ConsultaHijosRepository _repository = new ConsultaHijosRepository(_connectionString);
            var response = await _repository.mtdVerificarUsuario(UserName);
            if (response == null) { return NotFound(); }
            return response;
        }

        //Metodo para deshabilitar un cliente de distribuidor.
        //api/ConsultaHijos/mtdDeshabilitarCliente?Id=76cdfa8c-0c7e-40c9-839c-4803b556652a&strEstatus=A
        [HttpPut("mtdDeshabilitarCliente")]
        public async Task<ActionResult> mtdDeshabilitarcliente(string Id, char strEstatus, decimal dcmSaldo)
        {
            ConsultaHijosRepository _repository = new ConsultaHijosRepository(_connectionString);
            if (await _repository.mtdDeshabilitarCliente(Id, strEstatus,dcmSaldo) == true)
            {
                return Ok("Cliente Deshabilitado");
            }
            else return NotFound();
        }

        //Consulta el padre del cliente para poder retroceder
        //api/ConsultaHijos/ObtenerPadre?Id=76cdfa8c-0c7e-40c9-839c-4803b556652a
        [HttpGet("ObtenerPadre")]
        public async Task<ActionResult<List<ConsultaHijos>>> ObtenerPadre(string strIdPadre, char strEstatus)
        {
            ConsultaHijosRepository _repository = new ConsultaHijosRepository(_connectionString);
            var response = await _repository.mtdObtenerConsultaPadre(strIdPadre, strEstatus);
            if (response == null) { return NotFound(); }
            return response;
        }
        //
        //
        //Valida si el email ya existe o es nuevo
        //api/ConsultaHijos/VerificaEmailNuevo?Email=
        [HttpGet("VerificaEmailNuevo")]
        public async Task<ActionResult<List<VerificarEmail>>> VerificarEmail(string Email)
        {
            ConsultaHijosRepository _repository = new ConsultaHijosRepository(_connectionString);
            var response = await _repository.mtdVerificarEmail(Email);
            if (response == null) { return NotFound(); }
            return response;
        }
        //
    }
}