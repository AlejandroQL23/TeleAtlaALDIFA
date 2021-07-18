using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SupportAPI.Models;
using SupportAPI.Models.Entities;

namespace SupportAPI.Controllers
{

    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    [EnableCors("GetAllPolicy")]
    public class IssuesController : ControllerBase
    {
        string _url = "http://localhost:8080/api/issue/";
        private readonly AldifaSoftSupportContext _context;

        public IssuesController()
        {
            _context = new AldifaSoftSupportContext();
        }

        // GET: api/Issues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Issue>>> GetIssue()
        {
            return await _context.Issue.ToListAsync();
        }

        // GET: api/Issues/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Issue>> GetIssue(int id)
        {
            var issue = await _context.Issue.FindAsync(id);

            if (issue == null)
            {
                return NotFound();
            }

            return issue;
        }


  
        // PUT: api/Issues/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIssue(int id, Issue issue)
        {
            if (id != issue.Id)
            {
                return BadRequest();
            }

            _context.Entry(issue).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IssueExists(id))
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

        // POST: api/Issues
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Issue>> PostIssue(Issue issue)
        {
            _context.Issue.Add(issue);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIssue", new { id = issue.Id }, issue);
        }

        // DELETE: api/Issues/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Issue>> DeleteIssue(int id)
        {
            var issue = await _context.Issue.FindAsync(id);
            if (issue == null)
            {
                return NotFound();
            }

            _context.Issue.Remove(issue);
            await _context.SaveChangesAsync();

            return issue;
        }

        private bool IssueExists(int id)
        {
            return _context.Issue.Any(e => e.Id == id);
        }


        // PUT: api/Issues/updateIssueStartFromClient
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("[action]")]
        [HttpPut]
        public async Task<IActionResult> putUpdateIssueStartFromClient([FromBody] Issue issue)
        {
            ObjectResult result = null;
            Issue issueToSuppport = new Issue();
            issueToSuppport = (from newIssue in _context.Issue where newIssue.Id == issue.Id select newIssue).FirstOrDefault();
            issueToSuppport.Reference = issue.Reference;
            issueToSuppport.Status = "En progreso";
            PutIssue(issueToSuppport.Id, issueToSuppport);
            using HttpClient client = new HttpClient();
            StringContent content = new StringContent(JsonConvert.SerializeObject(issue.Reference), Encoding.UTF8,
               "application/json");
            using (var Response = await client.PutAsync(_url + "updateIssueStart/" + issue.Id, content))
            {
               
                    result = Ok(1);
                
            }
            return result;

        }



        // PUT: api/Issues/putUpdateIssueEndFromClient
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("[action]")]
        [HttpPut]
        public async Task<IActionResult> putUpdateIssueEndFromClient([FromBody] Issue issue)
        {
            ObjectResult result = null;
            Issue issueToSuppport = new Issue();
            issueToSuppport = (from newIssue in _context.Issue where newIssue.Id == issue.Id select newIssue).FirstOrDefault();
            issueToSuppport.ResolutionComment = issue.ResolutionComment;
            issueToSuppport.Status = "Finalizado";
            PutIssue(issueToSuppport.Id, issueToSuppport);
            using HttpClient client = new HttpClient();
            StringContent content = new StringContent(JsonConvert.SerializeObject(issue.ResolutionComment), Encoding.UTF8,
               "application/json");
            using (var Response = await client.PutAsync(_url + "updateIssueEnd/" + issue.Id, content))
            {

                    result = Ok(1);
                

            }
            return result;

        }




        // GET: api/Issues/informationFromClient
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("[action]/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientDTO>>> informationFromClient(int id)
        {
            string _urlData = "http://localhost:8080/api/client/clients/";
            ObjectResult result = null;
            HttpClientHandler clientHandler = new HttpClientHandler();

            using var client = new HttpClient(clientHandler);
            using var Response = await client.GetAsync(_urlData + id);

            if (Response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                result = Ok(JsonConvert.DeserializeObject<ClientDTO>
                    (await Response.Content.ReadAsStringAsync()));
            }
            else
            {
                result = Conflict(Response.RequestMessage);
            }
            return result;

        }



        





    }
}
