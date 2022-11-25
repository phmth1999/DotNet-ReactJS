using System;
using System.Collections.Generic;

namespace webapi.Models
{
    public partial class Log
    {
        public int Idlog { get; set; }
        public int? Idkh { get; set; }
        public string Message { get; set; }
        public int? Roles { get; set; }
        public string Ip { get; set; }
        public DateTime? Date { get; set; }
    }
}
