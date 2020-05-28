using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecargasElectronicas.Entities
{
    public class AsignarRole
    {
        //dato que lee y devuelve.
        public string Name { get; set; }
        public string UserName { get; set; }
        public string RoleId { get; set; }
        public string Id { get; set; }
        public int intNivel { get; set; }
        public string strIdPadre { get; set; }
        public string Padre { get; set; }
        public string strComercio { get; set; }
        public string strNombre { get; set; }
        public string strApaterno { get; set; }
        public string strAmaterno { get; set; }
        public string strEstatus { get; set; }
        public decimal dcmSaldo { get; set; }
        public bool EmailConfirmed { get; set; }
        public int intNip { get; set; }
        public bool bitNip {get; set;}
        public string strCp { get; set; }
        public string strEstado { get; set; }
        public string strMunicipio { get; set; }
        public string strColonia { get; set; }
        public string strCalle { set; get; }
        public string strNumExt { get; set; }
        public string strNumInt { get; set; }
        public string strContacto { get; set; }

    }
    //muestra en una tabla los datos del usuario asi como el rol 
    //esto solo sera visto por el administrador
    //Igual lee y devulves
    public class UsuarioRol
    {
        public int intId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }


    }
    public class ObtenerPermisoRol
    {
        public string intIdRol { get; set; }
        public int intIdOpcion { get; set; }
        public int intIdPermiso { get; set; }


    }
}
