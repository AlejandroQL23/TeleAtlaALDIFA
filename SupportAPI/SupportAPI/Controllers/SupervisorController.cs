using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Threading;
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
    public class SupervisorController : ControllerBase
    {
        private readonly AldifaSoftSupportContext _context;

        public SupervisorController()
        {
            _context = new AldifaSoftSupportContext();
        }

        // GET: api/Supervisor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supervisor>>> GetSupervisor()
        {
            return await _context.Supervisor.ToListAsync();
        }

        // GET: api/Supervisor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Supervisor>> GetSupervisor(int id)
        {
            var supervisor = await _context.Supervisor.FindAsync(id);

            if (supervisor == null)
            {
                return NotFound();
            }

            return supervisor;
        }

        // PUT: api/Supervisor/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupervisor(int id, Supervisor supervisor)
        {
            if (id != supervisor.Id)
            {
                return BadRequest();
            }

            _context.Entry(supervisor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupervisorExists(id))
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

        // POST: api/Supervisor
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Supervisor>> PostSupervisor(Supervisor supervisor)
        {

            string suppo = Encrypt(supervisor.Password);
            supervisor.Password = suppo;
            _context.Supervisor.Add(supervisor);

            await _context.SaveChangesAsync();
            Thread.Sleep(4000);

            return CreatedAtAction("GetSupervisor", new { id = supervisor.Id }, supervisor);
        }

        // DELETE: api/Supervisor/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Supervisor>> DeleteSupervisor(int id)
        {
            var supervisor = await _context.Supervisor.FindAsync(id);
            if (supervisor == null)
            {
                return NotFound();
            }

            _context.Supervisor.Remove(supervisor);
            await _context.SaveChangesAsync();

            return supervisor;
        }

        private bool SupervisorExists(int id)
        {
            return _context.Supervisor.Any(e => e.Id == id);
        }

        [EnableCors("GetAllPolicy")]
        [Route("[action]")]
        [HttpPost]
        public IActionResult PostAuthenticate(Supervisor supervisor)
        {
            supervisor.Password = Encrypt(supervisor.Password);
            ObjectResult result;
            var supervisorVar = _context.Supervisor.Any(e => e.Email == supervisor.Email && e.Password == supervisor.Password);
            var supervisorVarSelect = (from s in _context.Supervisor where s.Email == supervisor.Email && s.Password == supervisor.Password select s);
            var supervisorFoD = supervisorVarSelect.FirstOrDefault();
            if (supervisorVar == false)
            {
                result = NotFound(supervisorFoD);
            }
            else
            {
                result = Ok(supervisorFoD);
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
