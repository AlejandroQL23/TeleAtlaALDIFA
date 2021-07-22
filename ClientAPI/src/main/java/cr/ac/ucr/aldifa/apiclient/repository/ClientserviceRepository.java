package cr.ac.ucr.aldifa.apiclient.repository;

import cr.ac.ucr.aldifa.apiclient.domain.Clientservice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientserviceRepository extends JpaRepository<Clientservice, Integer> {

}
