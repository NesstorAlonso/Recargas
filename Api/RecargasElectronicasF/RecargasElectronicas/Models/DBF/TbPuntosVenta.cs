using System;
using System.Collections.Generic;

namespace RecargasElectronicas.Models.DBF
{
    public partial class TbPuntosVenta
    {
        public TbPuntosVenta()
        {
            TbUsuarios = new HashSet<TbUsuarios>();
        }

        public int IntIdPunVenta { get; set; }
        public string StrDescripcion { get; set; }
        public string StrCalle { get; set; }
        public string StrNumExt { get; set; }
        public string StrNumInt { get; set; }
        public string StrCodPos { get; set; }
        public string StrMunicipio { get; set; }
        public string StrColonia { get; set; }
        public string StrEstado { get; set; }
        public string StrLatitud { get; set; }
        public string StrLongitud { get; set; }
        public int? IntIdResponsable { get; set; }

        public virtual ICollection<TbUsuarios> TbUsuarios { get; set; }
    }
}
