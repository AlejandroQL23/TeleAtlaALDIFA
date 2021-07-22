package cr.ac.ucr.aldifa.apiclient.controller;

import com.sun.xml.internal.ws.handler.HandlerException;
import cr.ac.ucr.aldifa.apiclient.DTO.IssueDTOtoSupport;
import cr.ac.ucr.aldifa.apiclient.domain.Issue;
import cr.ac.ucr.aldifa.apiclient.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/issue")
public class IssueController {

    @Autowired
    private IssueService service;


    @GetMapping("/issues")
    public List<Issue> list() {
        try {
            return service.listAll();
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }

    @GetMapping("/issues/{id}")
    public ResponseEntity<Issue> get(@PathVariable Integer id) {
        try {
            Issue issue = service.get(id);
            return new ResponseEntity<Issue>(issue, HttpStatus.OK);
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Issue> add(@RequestBody Issue issue) {
        Issue issueInserted = null;
        try {
            Date now = new Date();
            issue.setStatus("Ingresado");
            issue.setSupportuserassigned("Sin asignar");
            issue.setResolutioncomment("Sin resolver");
            issue.setRegistertimestamp(now);
            issueInserted = service.save(issue);
            IssueDTOtoSupport restClient = new IssueDTOtoSupport();
            restClient.callPostIssueAPI(issueInserted);

            return new ResponseEntity<Issue>(issueInserted, HttpStatus.OK);

        } catch (Exception e) {
            if (issueInserted != null && issueInserted.getId() != 0) {
                service.delete(issueInserted.getId());
            }
            throw new HandlerException(e);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Issue> update(@RequestBody Issue issue, @PathVariable Integer id) {
        try {
            issue.setId(id);
            service.save(issue);
            return new ResponseEntity<Issue>(issue, HttpStatus.OK);
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }

    @PutMapping("/updateIssueStart/{id}")
    public ResponseEntity<Issue> updateIssueStart(@PathVariable int id, @RequestBody String supporterAssigned) {
        try {
            Issue issue = service.get(id);
            issue.setSupportuserassigned(supporterAssigned.substring(1, supporterAssigned.length() - 1));
            issue.setStatus("En progreso");
            return update(issue, id);
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }

    @PutMapping("/updateIssueEnd/{id}")
    public ResponseEntity<Issue> updateIssueEnd(@PathVariable int id, @RequestBody String resolutionComment) {
        try {
            Issue issue = service.get(id);
            issue.setResolutioncomment(resolutionComment.substring(1, resolutionComment.length() - 1));
            issue.setStatus("Finalizado");
            return update(issue, id);
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        try {
            service.delete(id);
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }

    @GetMapping("/listById/{id}")
    public List<Issue> listById(@PathVariable int id) {
        try {
            List<Issue> completeList = service.listAll();
            List<Issue> filteredList = new ArrayList<Issue>();
            for (int i = 0; i < completeList.size(); i++) {
                if (completeList.get(i).getIdclient() == id) {
                    filteredList.add(completeList.get(i));
                }
            }
            return filteredList;
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }
    
}
