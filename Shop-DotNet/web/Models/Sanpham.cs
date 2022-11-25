using System;
using System.Collections.Generic;

namespace webapi.Models
{
    public partial class Sanpham
    {
        public Sanpham()
        {
            Chitiethoadon = new HashSet<Chitiethoadon>();
        }

        public int Idsp { get; set; }
        public string Tensp { get; set; }
        public int? Idth { get; set; }
        public decimal? Gia { get; set; }
        public string Hinhanh { get; set; }
        public int? Sl { get; set; }
        public string Mota { get; set; }
        public string Mausac { get; set; }
        public string Manhinh { get; set; }
        public string Hedieuhanh { get; set; }
        public string Camera { get; set; }
        public string Cauhinh { get; set; }
        public string Pin { get; set; }

        public virtual ICollection<Chitiethoadon> Chitiethoadon { get; set; }
    }
}
