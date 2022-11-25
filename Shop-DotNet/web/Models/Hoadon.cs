using System;
using System.Collections.Generic;
using System.Security.Cryptography;

namespace webapi.Models
{
    public partial class Hoadon
    {
        public Hoadon()
        {
            Chitiethoadon = new HashSet<Chitiethoadon>();
        
        }

        public int Idhd { get; set; }
        public int? Idkh { get; set; }
        public string Diachi { get; set; }
        public DateTime? Ngay { get; set; }
        public decimal? Tonggia { get; set; }
        public string Tinhtrang { get; set; }

        public virtual Taikhoan IdkhNavigation { get; set; }
        public virtual ICollection<Chitiethoadon> Chitiethoadon { get; set; }
   
    }
}
