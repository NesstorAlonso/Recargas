using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class PuntosVenta
    {
        public int intIdPunVenta { get; set; }
        public String strDescripcion { get; set; }
        public String strCalle { get; set; }
        public String strNumExt { get; set; }
        public String strNumInt { get; set; }
        public String strCodPos { get; set; }
        public String strMunicipio { get; set; }
        public String strColonia { get; set; }
        public String strEstado { get; set; }
        public String strLatitud { get; set; }
        public String strLongitud { get; set; }
        public int intIdResponsable { get; set; }
    }
}
