using System;
using System.Collections.Generic;

namespace RecargasElectronicas.Models.DBF
{
    public partial class TbTickets
    {
        public int IntIdTicket { get; set; }
        public string StrTelefono { get; set; }
        public int IntIdCompania { get; set; }
        public string StrTipo { get; set; }
        public int IntIdCodProm { get; set; }
        public string DtmFecha { get; set; }
        public int IntIdUsuario { get; set; }
    }
}
