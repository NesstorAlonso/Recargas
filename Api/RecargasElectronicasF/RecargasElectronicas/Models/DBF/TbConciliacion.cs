using System;
using System.Collections.Generic;

namespace RecargasElectronicas.Models.DBF
{
    public partial class TbConciliacion
    {
        public int IntIdConciliacion { get; set; }
        public DateTime? StrFecha { get; set; }
        public string StrOpAccount { get; set; }
        public string StrMonto { get; set; }
        public string StrCarrier { get; set; }
        public string StrOpAuthorization { get; set; }
    }
}
