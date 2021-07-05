package cr.ac.ucr.aldifa.apiclient.controller;


import cr.ac.ucr.aldifa.apiclient.domain.Issue;
import cr.ac.ucr.aldifa.apiclient.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/add")
    public void add(@RequestBody Issue issue) {
        //reglas de negocio??
        service.save(issue);
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
}
