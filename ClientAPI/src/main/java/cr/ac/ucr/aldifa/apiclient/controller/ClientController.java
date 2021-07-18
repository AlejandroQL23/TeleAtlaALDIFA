package cr.ac.ucr.aldifa.apiclient.controller;


import cr.ac.ucr.aldifa.apiclient.domain.Client;
import cr.ac.ucr.aldifa.apiclient.domain.Clientservice;
import cr.ac.ucr.aldifa.apiclient.service.ClientService;
import cr.ac.ucr.aldifa.apiclient.service.ClientserviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/client")
public class ClientController {

    @Autowired
    private ClientService service;

    @Autowired
    private ClientserviceService serviceclient;


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
    public void add(@RequestBody Client client,@RequestHeader int[]array) throws NoSuchPaddingException, UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, InvalidKeyException {

        String cli = encriptar(client.getPassword());
        client.setPassword(cli);
        service.save(client);


        for (int i = 0; i < array.length; i++) {


            Clientservice servicioclient = new Clientservice();
           // servicioclient.setId(0);
            servicioclient.setIdclient(client.getId());
            servicioclient.setIdservice(array[i]);
            serviceclient.save(servicioclient);
        }
    }



    //-------------------METODOS DE ENCRIPTAR Y DESENCRIPTAR----------------------

    private SecretKeySpec crearClave(String clave) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        byte[] claveEncriptacion = clave.getBytes("UTF-8");

        MessageDigest sha = MessageDigest.getInstance("SHA-1");

        claveEncriptacion = sha.digest(claveEncriptacion);
        claveEncriptacion = Arrays.copyOf(claveEncriptacion, 16);

        SecretKeySpec secretKey = new SecretKeySpec(claveEncriptacion, "AES");

        return secretKey;
    }


    public String encriptar(String datos ) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, BadPaddingException, InvalidKeyException {
        String claveSecreta = "0123456789";
        SecretKeySpec secretKey = this.crearClave(claveSecreta);

        Cipher cipher = null;
        try {
            cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        }
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);

        byte[] datosEncriptar = datos.getBytes("UTF-8");
        byte[] bytesEncriptados = cipher.doFinal(datosEncriptar);
        String encriptado = Base64.getEncoder().encodeToString(bytesEncriptados);

        return encriptado;
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


    @PostMapping("/auth")
    public Client auth(@RequestBody Client client) throws NoSuchPaddingException, UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, InvalidKeyException {
        Client returnclient = null;
        String cliente = client.getPassword();
        String cliento = encriptar(cliente);
        client.setPassword(cliento);
        for (int i=0; i<service.listAll().size(); i++) {
            if(service.listAll().get(i).getEmail().equals(client.getEmail())) {
                if(service.listAll().get(i).getPassword().equals(client.getPassword())){
                    returnclient=service.listAll().get(i);
                    return returnclient;
                }
            }
        }
        return returnclient;
    }


}
