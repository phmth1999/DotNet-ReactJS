using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class SanphamsController : ControllerBase
    {
        dataContext _context = new dataContext();

        //GET: api/sanphams/top
        [HttpGet("top")]
        public async Task<ActionResult<IEnumerable<Sanpham>>> Top()
        {

            var user = _context.Sanpham
                                .FromSqlRaw("SELECT TOP 10  * FROM Sanpham order by Idsp desc;")
                                .ToList();
            return user;
        }
        //GET: api/Sanpham/idth/1
        [HttpGet("idth/{idth}")]
        public async Task<ActionResult<IEnumerable<Sanpham>>> GetTaikhoanByIdth(int idth)
        {
            var user = _context.Sanpham
                                    .Where(s => s.Idth == idth)
                                    .ToList();
            if (user == null)
            {
                return BadRequest(new { message = "ERROR" });
            }
            return user;
        }
        //GET: api/sanphams/detail
        [HttpGet("detail")]
        public async Task<ActionResult<IEnumerable<Sanpham>>> GetSanphamdetail()
        {
            return await _context.Sanpham.Include(a=>a.Chitiethoadon).ToListAsync();
        }
        //GET: api/sanphams/detail/1
        [HttpGet("detail/{id}")]
        public async Task<ActionResult<Sanpham>> GetSanphamdetail(int id)
        {
            var sanpham = await _context.Sanpham.Include(a => a.Chitiethoadon)
                                                 .Where(a => a.Idsp == id)
                                                 .FirstOrDefaultAsync();

            if (sanpham == null)
            {
                return BadRequest(new { message = "ERROR" });
            }

            return sanpham;
        }
        // GET: api/Sanphams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sanpham>>> GetSanpham()
        {
            return await _context.Sanpham.ToListAsync();
        }

        // GET: api/Sanphams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sanpham>> GetSanpham(int id)
        {
            var sanpham = await _context.Sanpham.FindAsync(id);

            if (sanpham == null)
            {
                return NotFound();
            }

            return sanpham;
        }

        // PUT: api/Sanphams/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSanpham(int id, Sanpham sanpham)
        {
            if (id != sanpham.Idsp)
            {
                return BadRequest();
            }

            _context.Entry(sanpham).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanphamExists(id))
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

        // POST: api/Sanphams
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Sanpham>> PostSanpham(Sanpham sanpham)
        {
            _context.Sanpham.Add(sanpham);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSanpham", new { id = sanpham.Idsp }, sanpham);
        }

        // DELETE: api/Sanphams/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sanpham>> DeleteSanpham(int id)
        {
            var sanpham = await _context.Sanpham.FindAsync(id);
            if (sanpham == null)
            {
                return NotFound();
            }

            _context.Sanpham.Remove(sanpham);
            await _context.SaveChangesAsync();

            return sanpham;
        }

        private bool SanphamExists(int id)
        {
            return _context.Sanpham.Any(e => e.Idsp == id);
        }
    }
}
