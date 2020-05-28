using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class Logo
    {
      
        public string strIdUsuario { get; set; }
        public Byte[] imgLogo { get; set; }
        public string strNomLogo { get; set; }
        public string strExtensionLG { get; set; }
        public string strLeyenda { get; set; }
    }
    public class Obtenerlogo
    {
        public string strIdUsuario { get; set; }
        public Byte[] imgLogo { get; set; }
        public string strNomLogo { get; set; }
        public string strExtensionLG { get; set; }
        public string strLeyenda { get; set; }
    }
}
