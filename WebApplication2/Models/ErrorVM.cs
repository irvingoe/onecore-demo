using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class ErrorVM
    {
        public string status { get; set; } = "error";

        public string message { get; set; } 
    }
}