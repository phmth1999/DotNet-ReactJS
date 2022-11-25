using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class HoadonsController : ControllerBase
    {
        dataContext _context = new dataContext();
        [HttpGet    ("tong")]
        public ActionResult<string> tongdoangthu()
        {
           //var a =_context.Hoadon.FromSqlRaw("select sum(tonggia) as tong from Hoadon where tinhtrang = 'Đã nhận'; ");
            
            var b = _context.Hoadon.Where(a => a.Tinhtrang == "Đã nhận").Sum(b=>b.Tonggia);
           
           
            return Ok(new { b});
        }
        [HttpGet("GethoadonCount")]
        public async Task<ActionResult<ItemCount>> GethoadonCount()
        {
            ItemCount itemCount = new ItemCount();

            itemCount.Count = _context.Hoadon.Count();
            return await Task.FromResult(itemCount);
        }
        // GET: api/Hoadons/detail
        [HttpGet("detail")]
        public async Task<ActionResult<IEnumerable<Hoadon>>> GetHoadondetail()
        {
            return await _context.Hoadon.Include(a => a.Chitiethoadon).ToListAsync();
        }
        // GET: api/Hoadons/detail/1
        [HttpGet("detail/{id}")]
        public async Task<ActionResult<Hoadon>> GetHoadondetail(int id)
        {
            var hoadon = await _context.Hoadon
                                              .Include(a => a.Chitiethoadon)
                                            
                                              .Where(a => a.Idhd == id)
                                              .FirstOrDefaultAsync();

            if (hoadon == null)
            {
                return NotFound();
            }

            return hoadon;
        }
        // GET: api/Hoadons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hoadon>>> GetHoadon()
        {
            return await _context.Hoadon.ToListAsync();
        }

        // GET: api/Hoadons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hoadon>> GetHoadon(int id)
        {
            var hoadon = await _context.Hoadon.FindAsync(id);

            if (hoadon == null)
            {
                return NotFound();
            }

            return hoadon;
        }

        // PUT: api/Hoadons/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHoadon(int id, Hoadon hoadon)
        {
            if (id != hoadon.Idhd)
            {
                return BadRequest();
            }

            _context.Entry(hoadon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HoadonExists(id))
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

        // POST: api/Hoadons
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Hoadon>> PostHoadon(Hoadon hoadon)
        {
            _context.Hoadon.Add(hoadon);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHoadon", new { id = hoadon.Idhd }, hoadon);
        }

        // DELETE: api/Hoadons/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Hoadon>> DeleteHoadon(int id)
        {
            var hoadon = await _context.Hoadon.FindAsync(id);
            if (hoadon == null)
            {
                return NotFound();
            }

            _context.Hoadon.Remove(hoadon);
            await _context.SaveChangesAsync();

            return hoadon;
        }

        private bool HoadonExists(int id)
        {
            return _context.Hoadon.Any(e => e.Idhd == id);
        }
    }
}
