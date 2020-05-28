using System;
using System.Collections.Generic;

namespace RecargasElectronicas.Models.DBF
{
    public partial class TbRespuesta
    {
        public int IntIdRespuesta { get; set; }
        public string TransactionId { get; set; }
        public string Rcode { get; set; }
        public string RcodeDescription { get; set; }
        public string OpAccount { get; set; }
        public string OpAuthorization { get; set; }
    }
}
