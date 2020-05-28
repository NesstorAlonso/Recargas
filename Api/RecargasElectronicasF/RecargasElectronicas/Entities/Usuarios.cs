using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class Usuarios
    {
        public int intIdUsuario { get; set; }
        public string strNombre { get; set; }
        public string strApp { get; set; }
        public string strApm { get; set; }
        public string strContrasena { get; set; }
        public string strCorreo { get; set; }
        public string strTelefono { get; set; }
        public int intIdTipoUsuario { get; set; }
        public int intIdPerfil { get; set; }
        public DateTime dtmFechaNac{ get; set; }
        public bool bitSexo { get; set; }
        public bool bitPersonaFiscal { get; set; }
        public string strRFC { get; set; }
        public int intIdPuntoVenta { get; set; }
        public int intIdDistribuidor { get; set; }
    }
}
