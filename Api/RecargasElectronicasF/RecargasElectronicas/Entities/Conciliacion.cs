using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class Conciliacion
    {
        public int intIdConciliacion { get; set; }
        public string strCarrier { get; set; }
        public string strMonto { get; set; }
        public string strOpAccount { get; set; }
        public string strFecha { get; set; }
        public string strOpAuthorization { get; set; }
    }
}
