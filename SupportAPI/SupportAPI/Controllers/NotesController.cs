﻿using System;
using System.Collections;
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
    public class NotesController : ControllerBase
    {
        private readonly AldifaSoftSupportContext _context;

        public NotesController()
        {
            _context = new AldifaSoftSupportContext();
        }

        // GET: api/Notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notes>>> GetNotes()
        {
            return await _context.Notes.ToListAsync();
        }

        // GET: api/Notes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Notes>> GetNotes(int id)
        {
            var notes = await _context.Notes.FindAsync(id);

            if (notes == null)
            {
                return NotFound();
            }

            return notes;
        }

        // PUT: api/Notes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotes(int id, Notes notes)
        {
            try
            {
                if (id != notes.Id)
                {
                    return BadRequest();
                }

                _context.Entry(notes).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NotesExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return NoContent();
        }

        // POST: api/Notes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Notes>> PostNotes(Notes notes)
        {
            try
            {
                _context.Notes.Add(notes);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return CreatedAtAction("GetNotes", new { id = notes.Id }, notes);

        }

        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Notes>> DeleteNotes(int id)
        {
            var notes = await _context.Notes.FindAsync(id);
            if (notes == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(notes);
            await _context.SaveChangesAsync();

            return notes;
        }

        private bool NotesExists(int id)
        {
            return _context.Notes.Any(e => e.Id == id);
        }


        // GET: api/Notes/GetNotesByIssue/id
        [Route("[action]/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notes>>> GetNotesByIssue(int id)
        {
            try
            {
                ArrayList arlist = new ArrayList();

                    Notes[] notesList = (from note in _context.Notes where note.IdIssue == id select note).ToArray();

                    for (int j = 0; j < notesList.Length; j++)
                    {
                        arlist.Add(notesList[j]);
                    }

                Notes[] issuesListtoReturn = new Notes[arlist.Count];
                int x = 0;
                for (int j = arlist.Count - 1; j >= 0; j--)
                {
                    issuesListtoReturn[x] = (Notes)arlist.ToArray()[j];
                    x++;
                }


                return issuesListtoReturn;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
