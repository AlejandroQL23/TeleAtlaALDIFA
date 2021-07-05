package cr.ac.ucr.aldifa.apiclient.controller;


import cr.ac.ucr.aldifa.apiclient.domain.Client;
import cr.ac.ucr.aldifa.apiclient.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/client")
public class ClientController {

    @Autowired
    private ClientService service;


    @GetMapping("/clients")
    public List<Client> list() {
        //¿reglas de negocio?
        //if...es admin
        return service.listAll();
    }

    //--------------------------------
    @GetMapping("/clients/{id}")
    public ResponseEntity<Client> get(@PathVariable Integer id) {
        try {
            Client client = service.get(id);
            return new ResponseEntity<Client>(client, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Client>(HttpStatus.NOT_FOUND);
        }
    }

    //---------------------------------
    @PostMapping("/add")
    public void add(@RequestBody Client client) {
        //reglas de negocio??
        service.save(client);
    }
    //---------------------------------

    @PutMapping("/update/{id}")
    public ResponseEntity<Client> update(@RequestBody Client client, @PathVariable Integer id) {
        try {
            client.setId(id);
            service.save(client);
            return new ResponseEntity<Client>(client, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Client>(HttpStatus.NOT_FOUND);
        }
    }

    //---------------------------------
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }


}
