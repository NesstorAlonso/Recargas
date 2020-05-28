using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class Acciones
    {
        public int intIdAccion { get; set; }
        public string claveUsuario { get; set; }
        public string strPermiso { get; set; }
    }
    public class AsignaAcciones
    {       
        public string strPermiso { get; set; }
    }
}
