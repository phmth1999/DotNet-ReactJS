using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class TaikhoansController : ControllerBase
    {
        dataContext _context = new dataContext();
        private IConfiguration _config;

        public TaikhoansController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet("GetAuthorsCount")]
        public async Task<ActionResult<ItemCount>> GetAuthorsCount()
        {
            ItemCount itemCount = new ItemCount();

            itemCount.Count = _context.Taikhoan.Count();
            return await Task.FromResult(itemCount);
        }
        //GET: api/taikhoans/sendmail
        [HttpGet("sendmail")]
        public IActionResult Get()
        {
            new Mail().sendMail("phmth1999@gmail.com", "test", "pass: 12345678");
            return BadRequest(new { message = "gui mail thanh cong" });
        }
        //POST: api/taikhoans/forgot
        [HttpPost("quenpass")]
        public async Task<ActionResult<Taikhoan>> ForgotPass(Taikhoan taikhoan)
        {
       
            Random ran = new Random();
            int a = ran.Next(100000,999999);

            var user = _context.Taikhoan
                                     .Where(s => s.Email == taikhoan.Email)
                                     .FirstOrDefault();
            if (user != null)
            {
                new Mail().sendMail(taikhoan.Email, "web", "ma xac nhan:"+a);
                
                return Ok(new {a});
            }
            return BadRequest(new { message = "ERROR" });

        }
        //PUT: api/taikhoans/resetpass
        [HttpPut("doipass/{id}")]
        public async Task<ActionResult<bool>> ResetPass(int id,Taikhoan tk)
        {
            if (id != tk.Idkh)
            {
                return false;
            }

            _context.Entry(tk).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaikhoanExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }

            return true;
        }
       
        // PoST: api/Taikhoans/login
        [HttpPost("login")]
        public IActionResult Login(Taikhoan taikhoan)
        {
            var user = _context.Taikhoan
                                     .Where(s => s.Username == taikhoan.Username && s.Pass == taikhoan.Pass)
                                     .FirstOrDefault();
            IActionResult response = Unauthorized();
            if (user != null)
            {

                //RefreshToken refreshToken = GenerateRefreshToken();
                //user.RefreshTokens.Add(refreshToken);
                // _context.SaveChangesAsync();

                //userWithToken = new UserWithToken(user);
                //userWithToken.RefreshToken = refreshToken.Token;

                var tokenStr = GenerateJSONWebToken(user);        
                response = Ok(new { token = tokenStr, user });
                return response;
            }
            else
            {
                return BadRequest(new { message = "ERROR" });
            }

        }
       
        private string GenerateJSONWebToken(Taikhoan userinfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                 new Claim("Idkh", userinfo.Idkh.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub,userinfo.Username),

                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),

            };
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);
            var encodetoken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodetoken;
        }
        // POST: api/Taikhoans/register
        [HttpPost("register")]
        public async Task<ActionResult<Taikhoan>> Register([FromBody]Taikhoan taikhoan)
        {
            var user = _context.Taikhoan
                                     .Where(s => s.Username == taikhoan.Username)
                                     .FirstOrDefault();
            if (user != null)
            {
                return BadRequest(new { message = "tai khoan ton tai" });

            }
            _context.Taikhoan.Add(taikhoan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaikhoan", new { id = taikhoan.Idkh }, taikhoan);
        }
        // GET: api/Taikhoans/username/Kienadmin
        [HttpGet("username/{name}")]
        public async Task<ActionResult<IEnumerable<Taikhoan>>> GetTaikhoanByUserName(string name)
        {
            var user = _context.Taikhoan
                                    .Where(s => s.Username == name)
                                    .ToList();
            if (user == null)
            {
                return BadRequest(new { message = "ERROR" });
            }
            return user;
        }
        // GET: api/Taikhoans/detail
        [HttpGet("detail")]
        public async Task<ActionResult<IEnumerable<Taikhoan>>> GetTaikhoandetail()
        {
            return await _context.Taikhoan.Include(a => a.Hoadon)
                                          .ThenInclude(b => b.Chitiethoadon)
                                          .ToListAsync();
        }
        //GET: api/taikhoans/detail/1
        [HttpGet("detail/{id}")]
        public async Task<ActionResult<Taikhoan>> GetTaikhoandetail(int id)
        {
            var taikhoan = await _context.Taikhoan
                                              .Include(a => a.Hoadon)
                                              .ThenInclude(b => b.Chitiethoadon)
                                              .Where(a => a.Idkh == id)
                                              .FirstOrDefaultAsync();

            if (taikhoan == null)
            {
                return BadRequest(new { message = "ERROR" });
            }

            return taikhoan;
        }
        // GET: api/Taikhoans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Taikhoan>>> GetTaikhoan()
        {
            return await _context.Taikhoan.ToListAsync();
        }

        // GET: api/Taikhoans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Taikhoan>> GetTaikhoan(int id)
        {
            var taikhoan = await _context.Taikhoan.FindAsync(id);
           
            if (taikhoan == null)
            {
                return NotFound();
            }

            return taikhoan;
        }

        // PUT: api/Taikhoans/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaikhoan(int id, Taikhoan taikhoan)
        {
            if (id != taikhoan.Idkh)
            {
                return BadRequest();
            }

            _context.Entry(taikhoan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaikhoanExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Taikhoans
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Taikhoan>> PostTaikhoan(Taikhoan taikhoan)
        {
            _context.Taikhoan.Add(taikhoan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaikhoan", new { id = taikhoan.Idkh }, taikhoan);
        }

        // DELETE: api/Taikhoans/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Taikhoan>> DeleteTaikhoan(int id)
        {
            var taikhoan = await _context.Taikhoan.FindAsync(id);
            if (taikhoan == null)
            {
                return NotFound();
            }

            _context.Taikhoan.Remove(taikhoan);
            await _context.SaveChangesAsync();

            return taikhoan;
        }

        private bool TaikhoanExists(int id)
        {
            return _context.Taikhoan.Any(e => e.Idkh == id);
        }
    }
}
