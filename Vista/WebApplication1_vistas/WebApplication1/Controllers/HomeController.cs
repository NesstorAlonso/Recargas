using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
       
            public IActionResult Salir()
        {
            return View();
        }
       // [Authorize(Roles = "Admin")]
        public IActionResult Index()
        {
            return View();            
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Prueba()
        {
            return View();
        }
        public IActionResult Inicio()
        {
            return View();
        }
        public IActionResult TiempoAire()
        {
            return View();
        }
        public IActionResult Promociones()
        {
            return View();
        }
        public IActionResult Favoritos()
        {
            return View();
        }
        
        public IActionResult AvisoPagos()
        {
            return View();
        }
        public IActionResult Abonos()
        {
            return View();
        }
        public IActionResult Servicios()
        {
            return View();
        }
        public IActionResult Pines()
        {
            return View();
        }
        public IActionResult Rclientes()
        {
            return View();
        }
        public IActionResult Rusuarios()
        {
            return View();
        }
        public IActionResult InfoCuenta()
        {
            return View();
        }

        //[Authorize("Write")]
        public IActionResult Usuarios()
        {
            return View();
        }
        public IActionResult Clientes()
        {
            return View();
        }
        public IActionResult regUsuario()
        {
            return View();
        }
        public IActionResult Cuenta()
        {
            return View();
        }
        public IActionResult Registro()
        {
            return View();
        }
        public IActionResult TraSaldo()
        {
            return View();
        }
        public IActionResult regPuntoVenta()
        {
            return View();
        }
        public IActionResult PVenta()
        {
            return View();
        }
        public IActionResult Distribuidores()
        {
            return View();
        }

        public IActionResult Usuarios2()
        {
            return View();
        }

        public IActionResult _LayoutLogin()
            {
            return View();
        }
        public IActionResult AddCompania()
        {
            return View();
        }
        public IActionResult Complementos()
        {
            return View();
        }
        public IActionResult Activacion()
        {
            return View();
        }
        public IActionResult Main()
        {
            return View();
        }
        public IActionResult OlvidoCont()
        {
            return View();
        }

        public IActionResult ContraRec()
        {
            return View();
        }
        public IActionResult AltaVendedor()
        {
            return View();
        }
        public IActionResult Vendedores()
        {
            return View();
        }
        public IActionResult EditarUsuario()
        {
            return View();
        }
        public IActionResult EstatusAvisosDepositos()
        {
            return View();
        }
        public IActionResult Movimientos()
        {
            return View();
        }
        public IActionResult VerDetalles()
        {
            return View();
        }
        public IActionResult SubirLogo()
        {
            return View();
        }
        public IActionResult Comisiones()
        {
            return View();
        }
        public IActionResult Contrasena()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
