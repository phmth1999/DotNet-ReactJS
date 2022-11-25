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
    public class ChitiethoadonsController : ControllerBase
    {
        dataContext _context = new dataContext();

        // GET: api/Chitiethoadons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chitiethoadon>>> GetChitiethoadon()
        {
            return await _context.Chitiethoadon.ToListAsync();
        }

        // GET: api/Chitiethoadons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Chitiethoadon>> GetChitiethoadon(int id)
        {
            var chitiethoadon = await _context.Chitiethoadon.FindAsync(id);

            if (chitiethoadon == null)
            {
                return NotFound();
            }

            return chitiethoadon;
        }

        // PUT: api/Chitiethoadons/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChitiethoadon(int id, Chitiethoadon chitiethoadon)
        {
            if (id != chitiethoadon.Idcthd)
            {
                return BadRequest();
            }

            _context.Entry(chitiethoadon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChitiethoadonExists(id))
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

        // POST: api/Chitiethoadons
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Chitiethoadon>> PostChitiethoadon(Chitiethoadon chitiethoadon)
        {
            _context.Chitiethoadon.Add(chitiethoadon);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChitiethoadon", new { id = chitiethoadon.Idcthd }, chitiethoadon);
        }

        // DELETE: api/Chitiethoadons/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Chitiethoadon>> DeleteChitiethoadon(int id)
        {
            var chitiethoadon = await _context.Chitiethoadon.FindAsync(id);
            if (chitiethoadon == null)
            {
                return NotFound();
            }

            _context.Chitiethoadon.Remove(chitiethoadon);
            await _context.SaveChangesAsync();

            return chitiethoadon;
        }

        private bool ChitiethoadonExists(int id)
        {
            return _context.Chitiethoadon.Any(e => e.Idcthd == id);
        }
    }
}
