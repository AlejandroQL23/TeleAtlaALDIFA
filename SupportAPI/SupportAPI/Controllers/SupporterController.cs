using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
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

        // GET: api/Supporter
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supporter>>> GetSupporters()
        {
            return await _context.Supporter.ToListAsync();
        }

        // GET: api/Supporter/5
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

        // PUT: api/Supporter/5
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

        // POST: api/Supporter
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Supporter>> PostSupporter(Supporter supporter, [FromHeader] int[] array)
        {
            string suppo = Encrypt(supporter.Password);
            supporter.Password = suppo;
            _context.Supporter.Add(supporter);
            await _context.SaveChangesAsync();

            for (int i = 0; i < array.Length; i++)
            {
                SupporterService supporterService = new SupporterService();
                supporterService.IdService = array[i];
                supporterService.IdSupporter = supporter.Id;
                _context.SupporterService.Add(supporterService);
                await _context.SaveChangesAsync();
            }
            return CreatedAtAction("GetSupporter", new { id = supporter.Id }, supporter);
        }

        // DELETE: api/Supporter/5
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
            studente.Password = Encrypt(studente.Password);
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


        public string Encrypt(string textToEncrypt)
        {
            try
            {
                //string textToEncrypt = "WaterWorld";
                string ToReturn = "";
                string publickey = "12345678";
                string secretkey = "87654321";
                byte[] secretkeyByte = { };
                secretkeyByte = System.Text.Encoding.UTF8.GetBytes(secretkey);
                byte[] publickeybyte = { };
                publickeybyte = System.Text.Encoding.UTF8.GetBytes(publickey);
                MemoryStream ms = null;
                CryptoStream cs = null;
                byte[] inputbyteArray = System.Text.Encoding.UTF8.GetBytes(textToEncrypt);
                using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
                {
                    ms = new MemoryStream();
                    cs = new CryptoStream(ms, des.CreateEncryptor(publickeybyte, secretkeyByte), CryptoStreamMode.Write);
                    cs.Write(inputbyteArray, 0, inputbyteArray.Length);
                    cs.FlushFinalBlock();
                    ToReturn = Convert.ToBase64String(ms.ToArray());
                }
                return ToReturn;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }

    }
}
