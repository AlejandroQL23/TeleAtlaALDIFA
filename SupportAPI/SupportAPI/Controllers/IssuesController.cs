using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
            try
            {
                var issue = await _context.Issue.FindAsync(id);

                if (issue == null)
                {
                    return NotFound();
                }

                return issue;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }


  
        // PUT: api/Issues/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIssue(int id, Issue issue)
        {
            try
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
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return NoContent();
        }

        // POST: api/Issues
        [HttpPost]
        public async Task<ActionResult<Issue>> PostIssue(Issue issue)
        {
            try
            {
                _context.Issue.Add(issue);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return CreatedAtAction("GetIssue", new { id = issue.Id }, issue);
        }

        // DELETE: api/Issues/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Issue>> DeleteIssue(int id)
        {
            var issue = await _context.Issue.FindAsync(id);
            try
            {

                if (issue == null)
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            _context.Issue.Remove(issue);
            await _context.SaveChangesAsync();

            return issue;
        }

        private bool IssueExists(int id)
        {
            return _context.Issue.Any(e => e.Id == id);
        }


        // PUT: api/Issues/putUpdateIssueStartFromClient
        [Route("[action]")]
        [HttpPut]
        public async Task<IActionResult> putUpdateIssueStartFromClient([FromBody] Issue issue)
        {
            ObjectResult result = null;
            try
            {
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
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return result;

        }



        // PUT: api/Issues/putUpdateIssueEndFromClient
        [Route("[action]")]
        [HttpPut]
        public async Task<IActionResult> putUpdateIssueEndFromClient([FromBody] Issue issue)
        {
            ObjectResult result = null;
            try
            {
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
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return result;

        }

        // GET: api/Issues/informationFromClient
        [Route("[action]/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientDTO>>> informationFromClient(int id)
        {
            ObjectResult result = null;
            try
            {
                string _urlData = "http://localhost:8080/api/client/clients/";

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
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return result;

        }


        // GET: api/Issues/GetIssueBySupport/id
        [Route("[action]/{id}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Issue>>> GetIssueBySupport(int id)
        {
            try
            {
                SupporterService[] IssueTypeQuantity = (from services in _context.SupporterService where services.IdSupporter == id select services).ToArray();
                ArrayList arrayList = new ArrayList();
                for (int i = 0; i < IssueTypeQuantity.Length; i++)
                {
                    Issue[] issuesList = (from issues in _context.Issue where (issues.Status != "Finalizado") && (issues.IdService == IssueTypeQuantity[i].IdService) select issues).ToArray();
                    Console.WriteLine(issuesList.Length);
                    for (int j = 0; j < issuesList.Length; j++)
                    {
                        arrayList.Add(issuesList[j]);
                    }
                }
                Issue[] issuesListtoReturn = new Issue[arrayList.Count];
                int x = 0;
                for (int j = arrayList.Count - 1; j >= 0; j--)
                {
                    issuesListtoReturn[x] = (Issue)arrayList.ToArray()[j];
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
