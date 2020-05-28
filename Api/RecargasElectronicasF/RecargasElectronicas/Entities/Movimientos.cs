using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class Movimientos
    {
        public string strIdUsuario { get; set; }
        public string strLatitud { get; set; }
        public string strLongitud { get; set; }
        public string strDireccionIP { get; set; }
        public DateTime dtmFechaHora { get; set; }
        public string strReferencia { get; set; }
        public string strTelefono { get; set; }
        public string strSKU { get; set; }
        public string strNombre { get; set; }
        public  decimal dcmMonto { get; set; }
        public string strTipo { get; set; }
        public string strTbOrigen { get; set; }
        public string strMensaje { get; set; }
    }
    public class ObtenerMovimientos
    {
        public int intIdMovimiento { get; set; }
        public string strIdUsuario { get; set; }
        public string Nombre { get; set; }
        public string strLatitud { get; set; }
        public string strLongitud { get; set; }
        public string strDireccionIP { get; set; }
        public DateTime dtmFechaHora { get; set; }
        public string strReferencia { get; set; }
        public string strTelefono { get; set; }
        public string strSKU { get; set; }
        public string strNombre { get; set; }
        public decimal dcmMonto { get; set; }
        public string strTipo { get; set; }
        public string strTbOrigen { get; set; }
        public string strMensaje { get; set; }
    }
    public class ComisionServicios
    {
        public string strUsuario { get; set; }
        public DateTime dtmFecha { get; set; }
        public decimal dcmMonto { get; set; }
        public string strReferencia { get; set; }
        public string strSKU { get; set; }
        public string strComision { get; set; }
        public decimal MontoInicial { get; set; }
        public decimal MontoFinal { get; set; }


    }
}
