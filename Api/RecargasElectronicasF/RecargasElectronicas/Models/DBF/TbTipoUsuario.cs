using System;
using System.Collections.Generic;

namespace RecargasElectronicas.Models.DBF
{
    public partial class TbTipoUsuario
    {
        public TbTipoUsuario()
        {
            TbUsuarios = new HashSet<TbUsuarios>();
        }

        public int IntIdTipoUsuario { get; set; }
        public string StrDescripcion { get; set; }
        public bool BitStatus { get; set; }

        public virtual ICollection<TbUsuarios> TbUsuarios { get; set; }
    }
}
