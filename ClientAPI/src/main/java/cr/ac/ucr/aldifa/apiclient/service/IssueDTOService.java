package cr.ac.ucr.aldifa.apiclient.service;
import cr.ac.ucr.aldifa.apiclient.domain.IssueDTO;
import cr.ac.ucr.aldifa.apiclient.repository.IssueDTORepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class IssueDTOService {


    @Autowired
    private IssueDTORepository repository;

    public List<IssueDTO> listAll() {return repository.findAll();
    }

    public void save(IssueDTO issue) { repository.save(issue);
    }

    public IssueDTO get(int id) {
        return repository.findById(id).get();
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}

