package cr.ac.ucr.aldifa.apiclient.controller;

import cr.ac.ucr.aldifa.apiclient.domain.Clientservice;
import cr.ac.ucr.aldifa.apiclient.service.ClientserviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;


@CrossOrigin
@RestController
@RequestMapping(path = "/api/serviceclient")
public class ClientserviceController {

    @Autowired
    private ClientserviceService service;

    @GetMapping("/serviceclient")
    public List<Clientservice> list() {
        //¿reglas de negocio?
        //if...es admin
        return service.listAll();
    }

    //--------------------------------
    @GetMapping("/serviceclient/{id}")
    public ResponseEntity<Clientservice> get(@PathVariable Integer id) {
        try {
            Clientservice servicee = service.get(id);
            return new ResponseEntity<Clientservice>(servicee, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Clientservice>(HttpStatus.NOT_FOUND);
        }
    }

    //---------------------------------
    @PostMapping("/add")
    public void add( @RequestBody int serv, @RequestBody int client) {
        Clientservice sc= new Clientservice(0,client,serv);

        service.save(sc);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Clientservice> update(@RequestBody Clientservice servici, @PathVariable Integer id) {
        try {
            servici.setId(id);
            service.save(servici);
            return new ResponseEntity<Clientservice>(servici, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Clientservice>(HttpStatus.NOT_FOUND);
        }
    }

    //---------------------------------
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

}

