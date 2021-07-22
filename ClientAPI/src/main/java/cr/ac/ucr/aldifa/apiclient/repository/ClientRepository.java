package cr.ac.ucr.aldifa.apiclient.repository;

import cr.ac.ucr.aldifa.apiclient.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

}
