using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class wUsuario
    {
        public string correoElectronico { get; set; }

        public string usuario { get; set; }

        public W2UIList sexo { get; set; }

        public DateTime fechaCreacion { get; set; }

        public bool estatus { get; set; }

        public int recid{ get; set; }
    }
}