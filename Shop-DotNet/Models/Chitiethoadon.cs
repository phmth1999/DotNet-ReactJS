using System;
using System.Collections.Generic;

namespace webapi.Models
{
    public partial class Chitiethoadon
    {
        public int Idcthd { get; set; }
        public int? Idhd { get; set; }
        public int? Idsp { get; set; }
        public int? Quantity { get; set; }

        public virtual Hoadon IdhdNavigation { get; set; }
        public virtual Sanpham IdspNavigation { get; set; }
    }
}
