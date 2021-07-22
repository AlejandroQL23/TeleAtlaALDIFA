package cr.ac.ucr.aldifa.apiclient.repository;

import cr.ac.ucr.aldifa.apiclient.domain.IssueDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueDTORepository extends JpaRepository<IssueDTO, Integer> {

}