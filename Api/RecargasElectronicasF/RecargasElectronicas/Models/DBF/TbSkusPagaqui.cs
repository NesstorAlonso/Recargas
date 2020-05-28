using System;
using System.Collections.Generic;

namespace RecargasElectronicas.Models.DBF
{
    public partial class TbSkusPagaqui
    {
        public int IntIdSkusPagaqui { get; set; }
        public string Nombre { get; set; }
        public string Sku { get; set; }
        public string Monto { get; set; }
        public string Minimo { get; set; }
        public string Maximo { get; set; }
        public string Checksku { get; set; }
        public string Regex { get; set; }
        public string Info { get; set; }
    }
}
