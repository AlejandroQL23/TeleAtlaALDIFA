package cr.ac.ucr.aldifa.apiclient.repository;



import cr.ac.ucr.aldifa.apiclient.domain.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository  extends JpaRepository<Issue, Integer>{






}





