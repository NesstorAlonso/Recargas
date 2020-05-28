using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class MovimientosRComision
    {
        public string strIdUsuario { get; set; }
        public string strEqComision { get; set; }
        public string strComisionVigente { get; set; }
        public string strUtilidadRecarga { get; set; }
        public string strCostoRecarga { get; set; }
        public decimal dcmMonto { get; set; }
        public decimal dcmMontoInicialR { get; set; }
        public decimal dcmMontoFinalR { get; set; }
        public string TraspasoAbono { get; set; }
        public DateTime dtmFecha { get; set; }
    }
    public class ObtenerTodosMovimientosComisionRecarga 
    {
        public int intIdMovimientoComision { get; set; }
        public string strUsuario { get; set; }
        public string strEqComision { get; set; }
        public string strComisionVigente { get; set; }
        public string strUtilidadRecarga { get; set; }
        public string strCostoRecarga { get; set; }
        public decimal dcmMontoRecarga { get; set; }
        public decimal dcmMontoInicialR { get; set; }
        public decimal dcmMontoFinalR { get; set; }
        public string TraspasoAbono { get; set; }
        public DateTime dtmFecha { get; set; }
        public string ComisionServicio { get; set; }
        public decimal MontoServicio { get; set; }
    }
    public class ObtenerTodosMovimientosComisionRecargaPorDia
    {
        public int intIdMovimientoComision { get; set; }
        public string strUsuario { get; set; }
        public string strEqComision { get; set; }
        public string strComisionVigente { get; set; }
        public string strUtilidadRecarga { get; set; }
        public string strCostoRecarga { get; set; }
        public decimal dcmMontoRecarga { get; set; }
        public decimal dcmMontoInicialR { get; set; }
        public decimal dcmMontoFinalR { get; set; }
        public string TraspasoAbono { get; set; }
        public DateTime dtmFecha { get; set; }
        public string ComisionServicio { get; set; }
        public decimal MontoServicio { get; set; }
    }

}
