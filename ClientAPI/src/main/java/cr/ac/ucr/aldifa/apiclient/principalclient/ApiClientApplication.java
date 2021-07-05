package cr.ac.ucr.aldifa.apiclient.principalclient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication(scanBasePackages = { "cr.ac.ucr.aldifa.apiclient.*" })
@ComponentScan({ "cr.ac.ucr.aldifa.apiclient.controller","cr.ac.ucr.aldifa.apiclient.repository", "cr.ac.ucr.aldifa.apiclient.service" } )
@EntityScan("cr.ac.ucr.aldifa.apiclient.domain")
@EnableJpaRepositories("cr.ac.ucr.aldifa.apiclient.repository")
public class ApiClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiClientApplication.class, args);
    }

}
