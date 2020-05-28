using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class NUsers
    {
        public int intId { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public string strNombre { get; set; }

        public string strApaterno { get; set; }
        public string strAmaterno { get; set; }

    }

    public class NUsers2 {
        public string Id { get; set; }
    }
}
