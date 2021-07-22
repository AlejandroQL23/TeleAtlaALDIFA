package cr.ac.ucr.aldifa.apiclient.controller;

import com.sun.xml.internal.ws.handler.HandlerException;
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
        return service.listAll();
    }

    @GetMapping("/clients/{id}")
    public ResponseEntity<Client> get(@PathVariable Integer id) {
        try {
            Client client = service.get(id);
            return new ResponseEntity<Client>(client, HttpStatus.OK);
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }

    @PostMapping("/add")
    public void add(@RequestBody Client client, @RequestHeader int[] array) throws NoSuchPaddingException, UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, InvalidKeyException {
        try {
            String clientString = encryptPassword(client.getPassword());
            client.setPassword(clientString);
            service.save(client);
            for (int i = 0; i < array.length; i++) {
                Clientservice serviceclientinstance = new Clientservice();
                serviceclientinstance.setIdclient(client.getId());
                serviceclientinstance.setIdservice(array[i]);
                serviceclient.save(serviceclientinstance);
            }
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }

    private SecretKeySpec createKey(String key) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        try {
            byte[] encryptKey = key.getBytes("UTF-8");
            MessageDigest sha = MessageDigest.getInstance("SHA-1");
            encryptKey = sha.digest(encryptKey);
            encryptKey = Arrays.copyOf(encryptKey, 16);
            SecretKeySpec secretKey = new SecretKeySpec(encryptKey, "AES");
            return secretKey;
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }

    public String encryptPassword(String data) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, BadPaddingException, InvalidKeyException {
        String secretKeyPass = "0123456789";
        SecretKeySpec secretKey = this.createKey(secretKeyPass);
        Cipher cipher = null;
        try {
            cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
        }
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encryptData = data.getBytes("UTF-8");
        byte[] bytesEncrypted = cipher.doFinal(encryptData);
        String encrypted = Base64.getEncoder().encodeToString(bytesEncrypted);

        return encrypted;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Client> update(@RequestBody Client client, @PathVariable Integer id) {
        try {
            client.setId(id);
            service.save(client);
            return new ResponseEntity<Client>(client, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            throw new HandlerException(e);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    @PostMapping("/auth")
    public Client auth(@RequestBody Client client) throws NoSuchPaddingException, UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException, NoSuchAlgorithmException, InvalidKeyException {
        try {
            Client returnclient = null;
            String clientPassword = client.getPassword();
            String clientEncrypted = encryptPassword(clientPassword);
            client.setPassword(clientEncrypted);
            for (int i = 0; i < service.listAll().size(); i++) {
                if (service.listAll().get(i).getEmail().equals(client.getEmail())) {
                    if (service.listAll().get(i).getPassword().equals(client.getPassword())) {
                        returnclient = service.listAll().get(i);
                        return returnclient;
                    }
                }
            }
            return returnclient;
        } catch (Exception e) {
            throw new HandlerException(e);
        }
    }
}
