package cr.ac.ucr.aldifa.apiclient.controller;


import com.sun.xml.internal.ws.handler.HandlerException;
import cr.ac.ucr.aldifa.apiclient.domain.Service;
import cr.ac.ucr.aldifa.apiclient.service.serviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/service")
public class ServiceController {


    @Autowired
    private serviceService service;


    @GetMapping("/services")
    public List<Service> list() {
        try {
            return service.listAll();
        }catch (Exception e) {
            throw new HandlerException(e);
        }

    }

    //--------------------------------
    @GetMapping("/services/{id}")
    public ResponseEntity<Service> get(@PathVariable Integer id) {
        try {
            Service servicee = service.get(id);
            return new ResponseEntity<Service>(servicee, HttpStatus.OK);
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }

    //---------------------------------
    @PostMapping("/add")
    public void add(@RequestBody Service servicea) {
        //reglas de negocio??
        service.save(servicea);
    }

    //---------------------------------
    @PutMapping("/update/{id}")
    public ResponseEntity<Service> update(@RequestBody Service servici, @PathVariable Integer id) {
        try {
            servici.setId(id);
            service.save(servici);
            return new ResponseEntity<Service>(servici, HttpStatus.OK);
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }

    //---------------------------------
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
