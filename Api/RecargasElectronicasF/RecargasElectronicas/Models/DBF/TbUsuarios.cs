using System;
using System.Collections.Generic;

namespace RecargasElectronicas.Models.DBF
{
    public partial class TbUsuarios
    {
        public TbUsuarios()
        {
            InverseIntIdDistribuidorNavigation = new HashSet<TbUsuarios>();
        }

        public int IntIdUsuario { get; set; }
        public string StrNombre { get; set; }
        public string StrApp { get; set; }
        public string StrApm { get; set; }
        public string StrContrasena { get; set; }
        public string StrCorreo { get; set; }
        public string StrTelefono { get; set; }
        public int IntIdTipoUsuario { get; set; }
        public int IntIdPerfil { get; set; }
        public DateTime DtmFechaNac { get; set; }
        public bool BitSexo { get; set; }
        public bool BitPersonaFiscal { get; set; }
        public string StrRfc { get; set; }
        public int? IntIdPuntoVenta { get; set; }
        public int? IntIdDistribuidor { get; set; }

        public virtual TbUsuarios IntIdDistribuidorNavigation { get; set; }
        public virtual TbPuntosVenta IntIdPuntoVentaNavigation { get; set; }
        public virtual TbTipoUsuario IntIdTipoUsuarioNavigation { get; set; }
        public virtual ICollection<TbUsuarios> InverseIntIdDistribuidorNavigation { get; set; }
    }
}
