using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIRecargasJob.Models
{
    public class Transac_Recargaqui
    {
        public string username { get; set; }
        public string password { get; set; }
        public string licence { get; set; }
        public string terminalID { get; set; }
        public string skuCode { get; set; }
        [Required(ErrorMessage = "El campo es requerido no se puede quedar vacío")]
        [MinLength(10, ErrorMessage = "El número de teléfono debe de ser de 10 dígitos, el valo ES MENOR al limite")]
        [MaxLength(10, ErrorMessage = "El número de teléfono debe de ser de 10 dígitos, el valor REBASA el limite")]
        public string op_account { get; set; }
        public float amount { get; set; }
    }
}
