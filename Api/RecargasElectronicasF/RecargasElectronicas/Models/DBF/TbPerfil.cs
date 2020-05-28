using System;
using System.Collections.Generic;

namespace RecargasElectronicas.Models.DBF
{
    public partial class TbPerfil
    {
        public int IntIdPerfil { get; set; }
        public string StrDescripcion { get; set; }
        public bool BitStatus { get; set; }
    }
}
