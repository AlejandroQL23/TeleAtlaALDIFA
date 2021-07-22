package cr.ac.ucr.aldifa.apiclient.service;

import cr.ac.ucr.aldifa.apiclient.domain.Comment;
import cr.ac.ucr.aldifa.apiclient.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CommentService {

    @Autowired
    private CommentRepository repository;

    public List<Comment> listAll() {return repository.findAll();
    }

    public void save(Comment comment) {
        repository.save(comment);
    }

    public Comment get(int id) {
        return repository.findById(id).get();
    }

    public void delete(int id) {
        repository.deleteById(id);
    }


}
