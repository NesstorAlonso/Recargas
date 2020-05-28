using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.ViewModels
{
    public class ResetPasswordViewModel
    {
        //[Required]
        //[EmailAddress]
        public string strCorreo { get; set; }

        //[Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password",
            ErrorMessage = "Password and Confirm Password must match")]
        public string ConfirmPassword { get; set; }

        public string recToken { get; set; }
    }
}
