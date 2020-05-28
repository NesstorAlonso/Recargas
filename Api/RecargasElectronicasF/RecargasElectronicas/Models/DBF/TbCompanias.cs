using System;
using System.Collections.Generic;

namespace RecargasElectronicas.Models.DBF
{
    public partial class TbCompanias
    {
        public int IntIdCompania { get; set; }
        public string StrDescripcion { get; set; }
        public string StrStatus { get; set; }
        public string ImgLogo { get; set; }
    }
}
