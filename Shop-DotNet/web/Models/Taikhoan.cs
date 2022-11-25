using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public partial class Taikhoan
    {
        public Taikhoan()
        {
            Hoadon = new HashSet<Hoadon>();
           // RefreshTokens = new HashSet<RefreshToken>();
        }
        //public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
        public int Idkh { get; set; }
        
        //[StringLength(maximumLength: 25, MinimumLength = 10, ErrorMessage = "Length must be between 10 to 25")]
        public string Hoten { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public string Gioitinh { get; set; }
        public string Cmnd { get; set; }
        public string Diachi { get; set; }
        [Phone(ErrorMessage = "Please enter a valid Phone No")]
        public string Sdt { get; set; }
        [EmailAddress(ErrorMessage = "Please enter a valid email")]
        public string Email { get; set; }
        //[StringLength(maximumLength: 25, MinimumLength = 8, ErrorMessage = "Length must be between 8 to 25")]
        public string Username { get; set; }
        [StringLength(maximumLength: 16, MinimumLength = 8, ErrorMessage = "Please enter a valid no between 8 & 16")]
        public string Pass { get; set; }
        public string Roles { get; set; }

        public virtual ICollection<Hoadon> Hoadon { get; set; }
    }
}
