using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class TraspasoSaldo
    {
        public string Id { get; set; }
        public int intIdAvisoPago { get; set; }
        public int intIdSaldoOrigen { get; set; }
        public decimal dcmMonto { get; set; }
        public string strIdCliente { get; set; }
        public DateTime dtmFecha { get; set; }
        public string strIdUsuarioLog { get; set; }
        //public string intIdUsuario { get; set; }
        public string strTipo { get; set; }
        public string intIdUsuarioOrigen { get; set; }
        public bool bitStatus { get; set; }
        public decimal dcmMontoActual { get; set; }
    }

    public class TraspasoSaldo2
    {
        public int intIdSaldo { get; set; }
        public string Nombre { get; set; }
        public int intIdAvisoPago { get; set; }
        public decimal dcmMonto { get; set; }
        public string strIdCliente { get; set; }
        public DateTime dtmFecha { get; set; }
        public string strIdUsuarioLog { get; set; }
        //public string intIdUsuario { get; set; }
        public string strTipo { get; set; }
        public string intIdUsuarioOrigen { get; set; }
        public bool bitStatus { get; set; }
    }


    public class ConsultaHijosSaldo
    {
        public int intId { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string strNombre { get; set; }
        public string strApaterno { get; set; }
        public string strAmaterno { get; set; }
        public string strIdPadre { get; set; }
        public string strContacto { get; set; }
        public string strComercio { get; set; }
    }
    public class ConsultaSaldoActual
    {
        public decimal Saldo { get; set; }

    }
    public class AbonoSaldo
    {
        public string Id { get; set; }
        public int intIdAvisoPago { get; set; }
        public int intIdSaldoOrigen { get; set; }
        public decimal dcmMonto { get; set; }
        public string strIdCliente { get; set; }
        public DateTime dtmFecha { get; set; }
        public string strIdUsuarioLog { get; set; }
        //public string intIdUsuario { get; set; }
        public string strTipo { get; set; }
        public string intIdUsuarioOrigen { get; set; }
        public bool bitStatus { get; set; }
    }
}
