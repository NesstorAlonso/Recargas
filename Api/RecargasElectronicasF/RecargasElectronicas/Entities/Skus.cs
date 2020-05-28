using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class SkusVirgin
    {
        public int intIdSkuVirgin { get; set; }
        public String strSkuCodeVirgin { get; set; }
        public String strMontoVirgin { get; set; }
    }
    public class SkusTuenti
    {
        
        public int intIdSkuTuenti { get; set; }
        public String strSkuCodeTuenti { get; set; }
        public String strMontoTuenti { get; set; }
    }

    public class SkusMazTi
    {

        public int intIdSkuMazTi { get; set; }
        public String strSkuCodeMazTi { get; set; }
        public String strMontoMazTi { get; set; }
    }

    public class SkusWeex
    {

        public int intIdSkuWeex { get; set; }
        public String strSkuCodeWeex { get; set; }
        public String strMontoWeex { get; set; }
    }

    public class SkusServicios
    {

        public int intIdSkuServicio { get; set; }
        public String strSkuDescripcion { get; set; }
        public String strSkuCodeServicio { get; set; }
    }
}
