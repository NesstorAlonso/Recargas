using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecargasElectronicas.Data;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModificarUsuarioController : ControllerBase
    {
        private string _connectionString;
        public ModificarUsuarioController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnectionString");
        }

        //Empieza la modificacion de insertar los datos de distribuidor
        //api/Usuarios/mtdCambiarUsuarios?
        [HttpPut("mtdInsertarUsuariosDistribuidor")]
        public async Task<ActionResult> mtdInsertarUsuariosDistribuidor(string UserName, bool bitTipoPersona, string strNombre, string strApaterno, string strAmaterno, DateTime dtmFechaNacimiento, string strRFC,
           bool bitGenero, string strCompania, string strCp, string strEstado, string strMunicipio, string strColonia, string strTVialidad, string strCalle, string strNumExt, string strNumInt, string strContacto, string strComercio, string strIdPadre, int intNivel)
        {
            ModificarUsuarioRepository _repository = new ModificarUsuarioRepository(_connectionString);
            if (await _repository.mtdModificarUsuariosDistribuidores(UserName, bitTipoPersona, strNombre, strApaterno, strAmaterno, dtmFechaNacimiento, strRFC,
           bitGenero, strCompania, strCp, strEstado, strMunicipio, strColonia, strTVialidad, strCalle, strNumExt, strNumInt, strContacto, strComercio,strIdPadre,intNivel) == true)
            {
                return Ok("Insercion correcta");
            }
            else return NotFound();
        }
        //
        //api/ModificarUsuario/mtdModificarVendedor?UserName=VendedorGeho&strNombre=Gehovany&strApaterno=Melo&strAmaterno=Perez&dtmHoraInicio=10:00&dtmHoraFin=22:00&strEstatus=A&strIdPadre=34653dce-e099-40bc-be24-992c2c0cceae&intNivel=2
        [HttpPut("mtdModificarVendedor")]
        public async Task<ActionResult> mtdModificarVendedor(string UserName, string strNombre, string strApaterno, string strAmaterno, DateTime dtmHoraInicio, DateTime dtmHoraFin, string strEstatus, string strIdPadre, int intNivel)
        {
            ModificarUsuarioRepository _repository = new ModificarUsuarioRepository(_connectionString);
            if (await _repository.mtdModificarVendedor(UserName, strNombre, strApaterno, strAmaterno, dtmHoraInicio, dtmHoraFin, strEstatus, strIdPadre, intNivel) == true)
            {
                return Ok("Insercion correcta");
            }
            else return NotFound();
        }

        //api/ModificarUsuario/mtdEditarVendedor?UserName=VendedorGeho&strNombre=Gehovany&strApaterno=Melo&strAmaterno=Perez&dtmHoraInicio=10:00&dtmHoraFin=22:00&strEstatus=A&strIdPadre=34653dce-e099-40bc-be24-992c2c0cceae&intNivel=2
        [HttpPut("mtdEditarVendedor")]
        public async Task<ActionResult> mtdEditarVendedor(string Id, string strNombre, string strApaterno, string strAmaterno, DateTime dtmHoraInicio, DateTime dtmHoraFin, string strEstatus)
        {
            ModificarUsuarioRepository _repository = new ModificarUsuarioRepository(_connectionString);
            if (await _repository.mtdEditarVendedor(Id, strNombre, strApaterno, strAmaterno, dtmHoraInicio, dtmHoraFin, strEstatus) == true)
            {
                return Ok("Modificacion correcta");
            }
            else return NotFound();
        }

        //

    }
}