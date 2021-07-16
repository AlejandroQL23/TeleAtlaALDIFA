package cr.ac.ucr.aldifa.apiclient.controller;


import cr.ac.ucr.aldifa.apiclient.DTO.IssueDTOtoSupport;
import cr.ac.ucr.aldifa.apiclient.domain.Client;
import cr.ac.ucr.aldifa.apiclient.domain.Issue;
import cr.ac.ucr.aldifa.apiclient.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/issue")
public class IssueController {

    @Autowired
    private IssueService service;

    @GetMapping("/issues")
    public List<Issue> list() {
        //¿reglas de negocio?
        //if...es admin
        return service.listAll();
    }

    //--------------------------------
    @GetMapping("/issues/{id}")
    public ResponseEntity<Issue> get(@PathVariable Integer id) {
        try {
            Issue issue = service.get(id);
            return new ResponseEntity<Issue>(issue, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Issue>(HttpStatus.NOT_FOUND);
        }
    }

    //---------------------------------
 /*   private String _url = "https://localhost:44382/api/issue/add/";
    @PostMapping("/add")
    public void add(@RequestBody Issue issue) {
        //reglas de negocio??
        issue.setSupportuserassigned("No asignado");
        Issue newIssue = null;

        try{
            issue.setStatus("Ingresado");
            //issue.setRegistertimestamp(new Date()); da error
            //newIssue = converter.toDTO(service.save(convert.toEntity(dto))); dice que hay que crear convertidor

            Issue i = new Issue();
            i.setId(newIssue.getId());

            ResponseEntity<Issue> response =
                    template.postForEntity(this._url, i , i.class);
        }catch (Exception ex){
            if(newIssue != null) this.service.delete(newIssue.getId());
           // throw new UnidentifiedException();
        }

        service.save(issue);
       // return newIssue;
    }*/

    @PostMapping("/add")
    public ResponseEntity<Issue> add(@RequestBody Issue issue) {
        //reglas de negocio??
        Issue issueInserted = null;
        service.save(issue);

        issueInserted = service.save(issue);
        IssueDTOtoSupport restClient = new IssueDTOtoSupport();
        restClient.callPostIssueAPI(issueInserted);

        return new ResponseEntity<Issue>(issueInserted, HttpStatus.OK);

    }
    //---------------------------------

    @PutMapping("/update/{id}")
    public ResponseEntity<Issue> update(@RequestBody Issue issue, @PathVariable Integer id) {
        try {
            issue.setId(id);
            service.save(issue);
            return new ResponseEntity<Issue>(issue, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Issue>(HttpStatus.NOT_FOUND);
        }
    }

    //---------------------------------
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    @GetMapping("/listById/{id}")
    public List<Issue> listById(@PathVariable int id) {
        List<Issue> completeList = service.listAll();
        List<Issue> filteredList = new ArrayList<Issue>();
        for(int i=0; i<completeList.size(); i++) {
            if(completeList.get(i).getIdclient()==id){
                filteredList.add(completeList.get(i));
            }
        }
        return filteredList;
    }
}
