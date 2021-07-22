package cr.ac.ucr.aldifa.apiclient.service;

import cr.ac.ucr.aldifa.apiclient.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class serviceService {

    @Autowired
    private ServiceRepository repository;

    public List<cr.ac.ucr.aldifa.apiclient.domain.Service> listAll() {
        return repository.findAll();
    }

    public void save(cr.ac.ucr.aldifa.apiclient.domain.Service service) {
        repository.save(service);
    }

    public cr.ac.ucr.aldifa.apiclient.domain.Service get(int id) {
        return repository.findById(id).get();
    }

    public void delete(int id) {
        repository.deleteById(id);
    }

}
