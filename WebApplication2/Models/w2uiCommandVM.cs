using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    [Serializable]
    public class w2uiCommandVM
    {
        public string cmd { get; set; }

        public int[] selected { get; set; }

        public string limit { get; set; }

        public string offset { get; set; }
        //{"cmd":"get","selected":[],"limit":100,"offset":0}

}
}