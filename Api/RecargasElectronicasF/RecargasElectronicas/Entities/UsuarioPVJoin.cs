using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class UsuarioPVJoin
    {
        public int intIdUsuario { get; set; }
        public String Nombre { get; set; }
        public String strCorreo { get; set; }
        public String strDescripcion { get; set; }
        public String NombrePerfil { get; set; }
        public int intIdDistribuidor { get; set; }
    }
}
