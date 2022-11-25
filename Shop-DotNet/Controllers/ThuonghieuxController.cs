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
    public class ThuonghieuxController : ControllerBase
    {
        dataContext _context = new dataContext();

        // GET: api/Thuonghieux
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Thuonghieu>>> GetThuonghieu()
        {
            return await _context.Thuonghieu.ToListAsync();
        }

        // GET: api/Thuonghieux/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Thuonghieu>> GetThuonghieu(int id)
        {
            var thuonghieu = await _context.Thuonghieu.FindAsync(id);

            if (thuonghieu == null)
            {
                return NotFound();
            }

            return thuonghieu;
        }

        // PUT: api/Thuonghieux/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutThuonghieu(int id, Thuonghieu thuonghieu)
        {
            if (id != thuonghieu.Idth)
            {
                return BadRequest();
            }

            _context.Entry(thuonghieu).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThuonghieuExists(id))
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

        // POST: api/Thuonghieux
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Thuonghieu>> PostThuonghieu(Thuonghieu thuonghieu)
        {
            _context.Thuonghieu.Add(thuonghieu);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetThuonghieu", new { id = thuonghieu.Idth }, thuonghieu);
        }

        // DELETE: api/Thuonghieux/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Thuonghieu>> DeleteThuonghieu(int id)
        {
            var thuonghieu = await _context.Thuonghieu.FindAsync(id);
            if (thuonghieu == null)
            {
                return NotFound();
            }

            _context.Thuonghieu.Remove(thuonghieu);
            await _context.SaveChangesAsync();

            return thuonghieu;
        }

        private bool ThuonghieuExists(int id)
        {
            return _context.Thuonghieu.Any(e => e.Idth == id);
        }
    }
}
