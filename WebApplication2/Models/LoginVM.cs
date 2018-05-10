using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class LoginVM
    {
        public string correoElectronico { get; set; }

        public string usuario { get; set; }

        [Required(ErrorMessage = "La contraseña es requerida")]
        public string contrasena { get; set; }

        [Required(ErrorMessage = "Confirma tu contraseña")]
        [Compare("contrasena", ErrorMessage = "La contraseña no coincide")]
        public string confirmaContrasena { get; set; }

        public string sexo { get; set; }

        public DateTime fechaCreacion { get; set; }

        public bool estatus { get; set; }

        public bool isRemember { get; set; }

        public string ReturnURL { get; set; }

    }
}