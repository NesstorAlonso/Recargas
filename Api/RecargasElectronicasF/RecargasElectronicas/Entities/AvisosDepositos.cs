using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class AvisosDepositos
    {
        public int intIdAvisoPago { get; set; }
        public string strReferencia { get; set; }
        public DateTime dtmFechaHoraDep { get; set; }
        public string strBancoDep { get; set; }
        public bool bitStatus { get; set; }
        public Decimal dcmMonto { get; set; }
        public string strObservaciones { get; set; }
        public bool bitPagoValido { get; set; }
        public string strCliente { get; set; }
        public DateTime dtmFechaHoraCap { get; set; }
        public DateTime dtmFechaHoraValidacion {get;set;}
        public string strIdUsuarioValidacion {get;set;}
        public Byte[] imgComprobante { get; set; }
        public string strNomArchivo { get; set; }
        public string strExtension { get; set; }
        public string Nombre { get; set; }
        public string Id { get; set; }
    }
    public class VerificarReferencia
    {
        public string strReferencia { get; set; }

    }
}
