package cr.ac.ucr.aldifa.apiclient.repository;


import cr.ac.ucr.aldifa.apiclient.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {








}
