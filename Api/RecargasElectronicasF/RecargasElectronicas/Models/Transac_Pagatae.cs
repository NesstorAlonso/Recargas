using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIRecargasJob.Models
{
    public class Transac_Pagatae
    {
        public string username { get; set; }
        public string password { get; set; }
        public string Licence { get; set; }
        public string TRequestID { get; set; }
        public string SkuCode { get; set; } // SKU del producto
        [Required]
        [MinLength(10, ErrorMessage = "El número de telefono debe de ser de 10 digitos, el valor ES MENOR al limite")]
        [MaxLength(10, ErrorMessage = "El número de telefono debe de ser de 10 digitos, el valor REBASA el limite")]
        public string Op_Account { get; set; } //Numero de telefono
        public float Amount { get; set; } //Monto del servicio requerido
    }
}
