using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using RecargasElectronicas.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;

using RecargasElectronicas.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using RecargasElectronicas.ViewModels;
using RecargasElectronicas.Contexts;
using RecargasElectronicas.Data;

namespace RecargasElectronicas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentasController : Controller //Base
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager; //<--
        private readonly IConfiguration _configuration;
        //
        private readonly ILogger<CuentasController> _logger;

        private readonly IEmailSender _emailSender;
        //
        private readonly ApplicationDbContext context;
        public CuentasController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
             RoleManager<IdentityRole> roleManager,  //<--
            IConfiguration configuration,
            ILogger<CuentasController> logger,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;   //<--
            //
            _logger = logger;
            _emailSender = emailSender;
         
            //

        }

        [HttpPost("Crear")]
        public async Task<ActionResult<UserToken>> CreateUser([FromBody] UserInfo model, string returnUrl)
        {
            try
            {
                Random obj = new Random();
              
                string posibles = "abcdefghijklmnopqrstuvwxyz";
            
                int longitud = posibles.Length;
             
                char letra;
            
                int longitudnuevacadena = 7;
           
                string contrasena = "";

                for (int i = 0; i < longitudnuevacadena; i++)

                {

                    letra = posibles[obj.Next(longitud)];

                    contrasena += letra.ToString();

                }

                var user = new ApplicationUser
                {
                    UserName = model.Usuario,
                    Email = model.strCorreo,
                    PhoneNumber = model.Tel, 
                    EmailConfirmed = false
                };
                var result = await _userManager.CreateAsync(user, contrasena);
                if (result.Succeeded)
                {
                    //se crea rol cliente por defecto al registrarse
                    user.SecurityStamp = Guid.NewGuid().ToString();
                    var rol = new IdentityRole { Name = model.Rol };
                    await _roleManager.CreateAsync(rol);
                    await _userManager.AddToRoleAsync(user, model.Rol);  //<--Termina creacion de rol por defecto
                                                                         //
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

                    var confirmationLink = Url.Action("ConfirmarEmail", "Cuentas",
                    new { userId = user.Id, code = code }, Request.Scheme);

                    _logger.Log(LogLevel.Warning, confirmationLink);

                    //CUERPO DEL MENSAJE
                    await _emailSender.SendEmailAsync(user.Email, "Bienvenido al portal",
                        "<body>" +
                        "<div align='center'>" +
                        //"<img >" +
                        "</div>" +
                        "<h2 align='Center'>Bienvenido al portal</h2>" +
                          "<p align='Center'>¡Bienvenido a Recarga Celulares!<br/>" +
                          "Esta plataforma ofrece servicios de recargas electronicas," +
                          "pagos de servicios, compra de diversos tipo de entretenimiento, entre muchas opciones más.<br/>" +
                          "Usted puede ingresar al portal "+ " " + " con los siguientes datos de acceso: <br/>" +
                          "Usuario:"+ model.Usuario+ "<br/>"+
                          "Contraseña:" + contrasena+" <br/>"+
                           "La contraseña que se le ha proporcionado es temporal, al iniciar sesión usted debera cambiar su contraseña." +
                          "<br/> Gracias por asociarte con nosotros.<br/>" +
                          // "Para continuar porfavor presiona el boton Confirmar Cuenta.<br/><br/>" +
                          // "<a href =\"" + confirmationLink + "\">" +
                          //"<button style='border-radius:50px;background:green;width:20vw;height:50px;color:white; '> Confimar cuenta </button></a>" +
                          "</p>" +
                          "</body>"
                        );
                    //


                    return BuildToken(model);
                }
                else
                {
                    return BadRequest("Username or password invalid");
                }
            }
            catch (Exception ex)
            {
                return Json(new { token = ex.Message });
            }

        }     


        // se crean y borran roles de usuario
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "Administrador")]
        [HttpPost("CrearRol")]
        public async Task<ActionResult> CreateRol([FromBody] UserInfo model)
        {

            ApplicationUser user = _userManager.Users.Where(u => u.UserName.Equals(model.Usuario, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();
            user.SecurityStamp = Guid.NewGuid().ToString();
            var rol = new IdentityRole { Name = model.Rol };
            await _roleManager.CreateAsync(rol);
            IdentityResult result = await _userManager.AddToRoleAsync(user, model.Rol);


            if (result.Succeeded)
            {
                //return BuildToken(model);
                return Ok("Rol Creado");

            }
            else
            {
                return BadRequest("Rol existente");
            }

        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Authorize(Roles = "Administrador")]
        [HttpPost("BorrarRol")]
        public async Task<ActionResult> BorrarRol([FromBody] UserInfo model)
        {
            ApplicationUser user = _userManager.Users.Where(u => u.UserName.Equals(model.Usuario, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();
            user.SecurityStamp = Guid.NewGuid().ToString();
            var role = new IdentityRole { Name = model.Rol };
            IdentityResult result = await _userManager.RemoveFromRoleAsync(user, model.Rol);
            await _roleManager.DeleteAsync(role);
            if (result.Succeeded)
            {
                return Ok("Rol Eliminido");
            }
            else
            {
                return NotFound("Rol no existente");
            }

        }
        //




        [HttpPost("Login")]
        public async Task<ActionResult<UserToken>> Login([FromBody] UserInfo userInfo)
        {

            var result = await _signInManager.PasswordSignInAsync(userInfo.Usuario, userInfo.strContrasena, isPersistent: false, lockoutOnFailure: false);
            

            ///PARA VERIFICAR QUE EL CORREO CON EL QUE SE HACE Login este verificado
            ///
            var user = await _userManager.FindByEmailAsync(userInfo.Usuario);

            if (user != null && !user.EmailConfirmed &&
                        (await _userManager.CheckPasswordAsync(user, userInfo.strContrasena)))
            {
                ModelState.AddModelError(string.Empty, "Email not confirmed yet");
                return BadRequest(ModelState);
            }
            ///

            if (result.Succeeded)
            {
                return BuildToken(userInfo);
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Usuario invalido o Ingrese datos correctos.");
                return BadRequest(ModelState);
            }
        }


        private UserToken BuildToken(UserInfo userInfo)
        {
            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.UniqueName, userInfo.Usuario),
        new Claim("miValor", "Lo que yo quiera"),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        //se crea un claim para guardar un rol.
         new Claim(ClaimTypes.Role, userInfo.Rol)

    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Tiempo de expiraci�n del token. En nuestro caso lo hacemos de un mes.
            var expiration = DateTime.UtcNow.AddMonths(1);

            JwtSecurityToken token = new JwtSecurityToken(
               issuer: null,
               audience: null,
               claims: claims,
               expires: expiration,
               signingCredentials: creds);

            return new UserToken()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration,
                Role = userInfo.Rol
            };



        }

        //[HttpGet]
        [HttpGet("ConfirmarEmail")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmarEmail(string userId, string code)
        {
            //si no hay usuario o token de verifiacion
            if (userId == null || code == null)
            {
                ModelState.AddModelError(string.Empty, "ERROR: No hay un link de validacion valido.");
                return BadRequest(ModelState);
                //return RedirectToAction("index", "home");
            }

            var user = await _userManager.FindByIdAsync(userId);
            //si el usuario es nulo
            if (user == null)
            {
                //_logger.Log(LogLevel.Warning, $"The User ID {userId} is invalid");
                //return RedirectToAction("NotFound");
                ModelState.AddModelError(string.Empty, $"El ID de usuario { userId} no es valido");
                return BadRequest(ModelState);
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);
            //si el resultado es exitoso
            if (result.Succeeded)
            {
                return View("EmailVerificationConfirmation");
            }
            //_logger.Log(LogLevel.Warning, "Email cannot be confirmed");
            //return RedirectToAction("Error");

            ModelState.AddModelError(string.Empty, "No se puede confirmar el Email.");
            return BadRequest(ModelState);
        }
        ////
        ////
        [HttpPost("ConOlvidada")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                // Find the user by email
                var user = await _userManager.FindByEmailAsync(model.strCorreo);
                // If the user is found AND Email is confirmed
                if (user != null && await _userManager.IsEmailConfirmedAsync(user))
                {
                    // Generate the reset password token
                    var recToken = await _userManager.GeneratePasswordResetTokenAsync(user);

                    // Build the password reset link
                    var passwordResetLink = Url.Action("ResetPassword", "Cuentas",
                            new { strCorreo = model.strCorreo, recToken = recToken }, Request.Scheme);

                    // Log the password reset link
                    _logger.Log(LogLevel.Warning, passwordResetLink);

                    //CUERPO DEL MENSAJE
                    await _emailSender.SendEmailAsync(user.Email, "Reseteo de contrase�a",
                       "Hola \"" + user + "\". Recibimos una solicitud para recuperar su contrase�a, entre en el siguiente enlace para reestablecerla: <a href=\"" + passwordResetLink + "\">link</a> <br/> Si no fue usted le sugerimos ignore este mensaje.");
                    // "Recibimos una solicitud para recuperar su contrase�a, entre en el siguiente enlace para reestablecerla: <a href=\"" + passwordResetLink + "\">link</a> <br/> Si no fue usted le sugerimos ignore este mensaje.");
                    //



                    // Send the user to Forgot Password Confirmation view
                    return Ok("Restablecimiento correcto");
                }

                // To avoid account enumeration and brute force attacks, don't
                // reveal that the user does not exist or is not confirmed
                return Ok("Restablecimiento correcto");
            }

            ModelState.AddModelError(string.Empty, "No se enviaron datos.");
            return BadRequest(ModelState);
        }



        //[HttpGet("ResetPassword")]
        [AllowAnonymous]
        public IActionResult ResetPassword(string recToken, string strCorreo)
        {
            // If password reset token or email is null, most likely the
            // user tried to tamper the password reset link
            if (recToken == null || strCorreo == null)
            {
                ModelState.AddModelError("", "Invalid password reset token");
            }
            // return View("ForgotPasswordConfirmation");

            ResetPasswordViewModel model = new ResetPasswordViewModel() { strCorreo = strCorreo, recToken = recToken };
            return View(model);
            // return Ok("Vista ResetPassword");
        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromForm]ResetPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Find the user by email

                var user = await _userManager.FindByEmailAsync(model.strCorreo);

                if (user != null)
                {
                    // reset the user password
                    var result = await _userManager.ResetPasswordAsync(user, model.recToken, model.Password);
                    if (result.Succeeded)
                    {
                        //return View("ResetPasswordConfirmation");
                        return View("ResetPasswordConfirmation");
                    }
                    // Display validation errors. For example, password reset token already
                    // used to change the password or password complexity rules not met
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                    return Ok("Error");
                }

                // To avoid account enumeration and brute force attacks, don't
                // reveal that the user does not exist
                return View("ResetPasswordConfirmation");
            }
            // Display validation errors if model state is not valid
            return View(model);
        }
        //
        //
        ///VENDEDORES
        ///
        [HttpPost("CrearVendedor")]
        public async Task<ActionResult<UserToken>> CrearVendedor([FromBody] UserInfo model, string returnUrl)
        {

            //DateTime inicio = model.dtmHoraInicio;
            //  DateTime.TryParse("13:00", out inicio);

            var user = new ApplicationUser
            {
                UserName = model.Usuario,
                Email = model.strCorreo,
                PhoneNumber = model.Tel,
                EmailConfirmed = true/*,*/
                //dtmHoraInicio = model.inicio,
                //dtmHoraFin = model.txtHoraFin
            };
            var result = await _userManager.CreateAsync(user, model.strContrasena);
            if (result.Succeeded)
            {
                //se crea rol cliente por defecto al registrarse
                user.SecurityStamp = Guid.NewGuid().ToString();
                var rol = new IdentityRole { Name = model.Rol };
                await _roleManager.CreateAsync(rol);
                await _userManager.AddToRoleAsync(user, model.Rol);  //<--Termina creacion de rol por defecto

                user = await _userManager.FindByEmailAsync(model.strCorreo);
                // If the user is found AND Email is confirmed
                if (user != null && await _userManager.IsEmailConfirmedAsync(user))
                {
                    // Generate the reset password token
                    var recToken = await _userManager.GeneratePasswordResetTokenAsync(user);

                    // Build the password reset link
                    var passwordResetLink = Url.Action("EstablecePassword", "Cuentas",
                            new { strCorreo = model.strCorreo, recToken = recToken }, Request.Scheme);

                    // Log the password reset link
                    _logger.Log(LogLevel.Warning, passwordResetLink);

                    //CUERPO DEL MENSAJE
                    await _emailSender.SendEmailAsync(user.Email, "Bienvenido",
                       "Hola \"" + user + "\". Le damos la bienvenida. Para crear su contraseña, ingrese en el siguiente enlace : <a href=\"" + passwordResetLink + "\">link</a> <br/> ");
                    // "Recibimos una solicitud para recuperar su contraseña, entre en el siguiente enlace para reestablecerla: <a href=\"" + passwordResetLink + "\">link</a> <br/> Si no fue usted le sugerimos ignore este mensaje.");
                    //



                    // Send the user to Forgot Password Confirmation view
                    return Ok("Restablecimiento correcto");
                }


                return BuildToken(model);
            }
            else
            {
                return BadRequest("Username or password invalid");
            }

        }


        [HttpGet("EstablecePassword")]
        [AllowAnonymous]
        public IActionResult EstablecePassword(string recToken, string strCorreo)
        {
            // If password reset token or email is null, most likely the
            // user tried to tamper the password reset link
            if (recToken == null || strCorreo == null)
            {
                ModelState.AddModelError("", "Invalid password reset token");
            }
            // return View("ForgotPasswordConfirmation");

            ResetPasswordViewModel model = new ResetPasswordViewModel() { strCorreo = strCorreo, recToken = recToken };
            return View(model);
            // return Ok("Vista ResetPassword");
        }


        [HttpPost("EstablecePassword")]
        [AllowAnonymous]
        public async Task<IActionResult> EstablecePassword([FromForm]ResetPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Find the user by email

                var user = await _userManager.FindByEmailAsync(model.strCorreo);

                if (user != null)
                {
                    // reset the user password
                    var result = await _userManager.ResetPasswordAsync(user, model.recToken, model.Password);
                    if (result.Succeeded)
                    {
                        //return View("ResetPasswordConfirmation");
                        return View("EstablecePasswordConfirmation");
                    }
                    // Display validation errors. For example, password reset token already
                    // used to change the password or password complexity rules not met
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                    return Ok("Error");
                }

                // To avoid account enumeration and brute force attacks, don't
                // reveal that the user does not exist
                return View("EstablecePasswordConfirmation");
            }
            // Display validation errors if model state is not valid
            return View(model);
        }
        //
        //
        //
        //
        //
        //En esta parte se envia el correo cuando se registra un nuevo Usuario,cliente,vendedor.
        [HttpPost("MandarCorreoAdministrador")]
        public async Task<ActionResult<UserToken>> EmailAdministrador([FromBody] UserInfo model, string returnUrl)
        {
            var user = new ApplicationUser
            {
                Email = model.strCorreo
            };
            //CUERPO DEL MENSAJE
            await _emailSender.SendEmailAsync(user.Email, "Nuevo Usuario Registrado a Recarga Celulares",
                "<p>Estimado manlio diaz se le informa que un nuevo usuario se a dado de alta a la plataforma Recarga Celulares<p> <br/" +
                "<p>Para mas informacion porfavor ingrese a la plataforma desde <a href='https://recargacelulares.com.mx/'>aqui</a></p> <br/><br/><br>" +
                "Porfavor no responder este mensaje");
            //
            //
            return Ok("Se Envio correo de confirmacion al administrador");
        }


        [HttpPut("mtdCambiarPassword")]
        public async Task<ActionResult<ApplicationUser>> CambiarPassword(string id, string currentpassword,string newPassword)
        {
            var user = await _userManager.FindByIdAsync(id);
           // await _userManager.RemovePasswordAsync(user);
            var result = await _userManager.ChangePasswordAsync(user, currentpassword, newPassword);

            if (result.Succeeded)
            {

                return Ok();
            }
            else
            {
                return Json(new { token = result.Errors });
                //return BadRequest(result.Errors);
                    //Json(new { token = result.Errors });
            }
        }

    }

}
