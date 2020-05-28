
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class Comision
    {
            public int intIdComision { get; set; }
            public string strIdUsuario { get; set; }
            public string strSku { get; set; }
            public decimal decComision { get; set; }
            public string strTipo { get; set; }
            public string strUnidad { get; set; }
    }

    public class Comision2
    {
        public int intIdComision { get; set; }
        public string strSku { get; set; }
        public string strTipo { get; set; }
        public decimal decComision { get; set; }
        public string strUnidad { get; set; }
    }

}
