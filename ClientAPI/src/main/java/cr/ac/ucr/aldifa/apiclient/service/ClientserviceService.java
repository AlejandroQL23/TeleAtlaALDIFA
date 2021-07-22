package cr.ac.ucr.aldifa.apiclient.service;

import cr.ac.ucr.aldifa.apiclient.domain.Clientservice;
import cr.ac.ucr.aldifa.apiclient.repository.ClientserviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ClientserviceService {

    @Autowired
    private ClientserviceRepository repository;

    public List<Clientservice> listAll() {
        return repository.findAll();
    }

    public void save(Clientservice sc) {
        repository.save(sc);
    }

    public Clientservice get(int id) {
        return repository.findById(id).get();
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}
