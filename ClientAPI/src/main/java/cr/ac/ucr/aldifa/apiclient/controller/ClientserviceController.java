package cr.ac.ucr.aldifa.apiclient.controller;

import cr.ac.ucr.aldifa.apiclient.domain.Clientservice;
import cr.ac.ucr.aldifa.apiclient.service.ClientserviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;


@CrossOrigin
@RestController
@RequestMapping(path = "/api/clientservice")
public class ClientserviceController {

    @Autowired
    private ClientserviceService service;

    @GetMapping("/clientservice")
    public List<Clientservice> list() {
        //¿reglas de negocio?
        //if...es admin
        return service.listAll();
    }

    //--------------------------------
    @GetMapping("/clientservice/{id}")
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

    //---------------------------------
    @GetMapping("/listNum/{id}")
    private int[] listNum(@PathVariable int id) {
        List<Clientservice> completeList = service.listAll();
        List<Clientservice>  filteredList = new ArrayList<Clientservice>();
        for(int i=0; i<completeList.size(); i++) {
            if(completeList.get(i).getIdclient()==id){
                filteredList.add(completeList.get(i));
            }
        }
        int [] arryaToReturn= new int[filteredList.size()];

        for (int i=0; i<filteredList.size(); i++){
            arryaToReturn[i] = filteredList.get(i).getIdservice();
        }

        return arryaToReturn;
    }

}

