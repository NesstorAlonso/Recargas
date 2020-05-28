using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIRecargasJob.Models
{
    public class Transac_Pagaqui
    {
        public string username { get; set; }
        public string password { get; set; }
        public string sku_Code { get; set; }
        public string licence { get; set; }
        public string TRequestID { get; set; }
        public string op_account { get; set; }
        public string op_account2 { get; set; }
        public float monto { get; set; }
        public string pv { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
