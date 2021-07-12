package cr.ac.ucr.aldifa.apiclient.controller;



import cr.ac.ucr.aldifa.apiclient.domain.Comment;
import cr.ac.ucr.aldifa.apiclient.domain.Issue;
import cr.ac.ucr.aldifa.apiclient.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/comment")
public class CommentController {

    @Autowired
    private CommentService service;

    @GetMapping("/comments")
    public List<Comment> list() {
        //¿reglas de negocio?
        //if...es admin
        return service.listAll();
    }

    //--------------------------------
    @GetMapping("/comments/{id}")
    public ResponseEntity<Comment> get(@PathVariable Integer id) {
        try {
            Comment comment = service.get(id);
            return new ResponseEntity<Comment>(comment, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
        }
    }

    //---------------------------------
    @PostMapping("/add")
    public void add(@RequestBody Comment comment) {
        //reglas de negocio??
        service.save(comment);
    }

    //---------------------------------
    @PutMapping("/update/{id}")
    public ResponseEntity<Comment> update(@RequestBody Comment comment, @PathVariable Integer id) {
        try {
            comment.setId(id);
            service.save(comment);
            return new ResponseEntity<Comment>(comment, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Comment>(HttpStatus.NOT_FOUND);
        }
    }

    //---------------------------------
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }


    @GetMapping("/listById/{id}")
    public List<Comment> listById(@PathVariable int id) {
        List<Comment> completeList = service.listAll();
        List<Comment> filteredList = null;
        for(int i=0; i<completeList.size(); i++) {
            if(completeList.get(i).getIssue().getId()==id){
                filteredList.add(completeList.get(i));
            }
        }
        return filteredList;
    }

}
