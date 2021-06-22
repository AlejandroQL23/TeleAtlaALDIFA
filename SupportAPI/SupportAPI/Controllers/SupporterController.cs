using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SupportAPI.Models.Entities;

namespace SupportAPI.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    [EnableCors("GetAllPolicy")]
    public class SupporterController : ControllerBase
    {
        private readonly AldifaSoftSupportContext _context;

        public SupporterController()
        {
            _context = new AldifaSoftSupportContext();
        }

        // GET: api/Supporters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supporter>>> GetSupporters()
        {
            return await _context.Supporter.ToListAsync();
        }

        // GET: api/Supporters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Supporter>> GetSupporter(int id)
        {
            var supporter = await _context.Supporter.FindAsync(id);

            if (supporter == null)
            {
                return NotFound();
            }

            return supporter;
        }

        // PUT: api/Supporters/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupporter(int id, Supporter supporter)
        {
            if (id != supporter.Id)
            {
                return BadRequest();
            }

            _context.Entry(supporter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupporterExists(id))
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

        // POST: api/Supporters
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Supporter>> PostSupporter(Supporter supporter)
        {
            _context.Supporter.Add(supporter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSupporter", new { id = supporter.Id }, supporter);
        }

        // DELETE: api/Supporters/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Supporter>> DeleteSupporter(int id)
        {
            var supporter = await _context.Supporter.FindAsync(id);
            if (supporter == null)
            {
                return NotFound();
            }

            _context.Supporter.Remove(supporter);
            await _context.SaveChangesAsync();

            return supporter;
        }

        private bool SupporterExists(int id)
        {
            return _context.Supporter.Any(e => e.Id == id);
        }

        //-------------------------------------------------------

        [EnableCors("GetAllPolicy")]
        [Route("[action]")]
        [HttpPost]
        public IActionResult PostAuthenticate(Supporter studente)
        {
            ObjectResult result;
            var student = _context.Supporter.Any(e => e.Email == studente.Email && e.Password == studente.Password);
            var studenti = (from s in _context.Supporter where s.Email == studente.Email && s.Password == studente.Password select s);
            var studento = studenti.FirstOrDefault();
            if (student == false)
            {


                result = NotFound(studento);
            }
            else
            {
                result = Ok(studento);
            }

            return result;
        }

    }
}
