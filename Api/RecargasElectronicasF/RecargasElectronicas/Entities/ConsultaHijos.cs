using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class ConsultaHijos
    {
        public int intId { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string strNombre { get; set; }

        public string strApaterno { get; set; }
        public string strAmaterno { get; set; }
        public string strIdPadre { get; set; }
        public string strContacto { get; set; }
        public string strComercio { get; set; }
    }

    public class ObtenerInfoPorId
    {
        public string UserName { get; set; }
        public bool bitTipoPersona { get; set; }
        public string strNombre { get; set; }
        public string strApaterno { get; set; }
        public string strAmaterno { get; set; }
        public DateTime dtmFechaNacimiento { get; set; }
        public string strRfc { get; set; }
        public bool bitGenero { get; set; }
        public string strCompania { get; set; }
        public string strCp{ get; set; }
        public string strEstado { get; set; }
        public string strMunicipio { get; set; }
        public string strColonia { get; set; }
        public string strTVialidad { get; set; }
        public string strCalle { get; set; }
        public string strNumExt { get; set; }
        public string strNumInt { get; set; }
        public string strContacto { get; set; }
        public string strComercio { get; set; }
        public string PhoneNumber { get; set; }
        
    }
    public class ObtenerInfoVPorId
    {
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string strNombre { get; set; }
        public string strApaterno { get; set; }
        public string strAmaterno { get; set; }
        public DateTime dtmHoraInicio { get; set; }
        public DateTime dtmHoraFin { get; set; }
        //public string Id { get; set; }
        public string strIdPadre { get; set; }
        public int intNivel { get; set; }

    }
    public class VerificarUsuario
    {
        public string UserName { get; set; }
    }
    public class VerificarEmail
    {
        public string Email { get; set; }
    }

}
