using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MD5Controller : ControllerBase
    {
        dataContext _context = new dataContext();
        [HttpGet]
        public IActionResult md(string pass)
        {
            var a = new MD5().Encrypt(pass);
            return Ok(a);
        }
        [HttpPost("{id}")]
        public async Task<ActionResult<Taikhoan>> md5(string newpass,Taikhoan taikhoan,int id)
        {
            var user = _context.Taikhoan
                                    .Where(s => s.Pass == taikhoan.Pass&&s.Idkh==id)
                                    .FirstOrDefault();
            newpass  = new MD5().Encrypt(taikhoan.Pass);
            user.Pass = newpass;
            _context.Add(user);
            _context.SaveChangesAsync();

            return user;
        }
        [HttpGet("d/{id}")]
        public async Task<ActionResult<Taikhoan>> md55( int id)
        {

            var user = await _context.Taikhoan
                                    .Where(s => s.Idkh == id).FirstOrDefaultAsync();
           

            return user;
        }

    }
}
