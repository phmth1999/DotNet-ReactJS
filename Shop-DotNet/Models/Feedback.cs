using System;
using System.Collections.Generic;

namespace webapi.Models
{
    public partial class Feedback
    {
        public int Idfb { get; set; }
        public int? Idkh { get; set; }
        public int? Idsp { get; set; }
        public string Message { get; set; }
        public int? Rating { get; set; }
        public DateTime? Date { get; set; }
    }
}
