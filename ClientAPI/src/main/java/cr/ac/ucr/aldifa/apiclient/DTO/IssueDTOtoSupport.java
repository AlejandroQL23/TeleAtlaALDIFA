package cr.ac.ucr.aldifa.apiclient.DTO;

import cr.ac.ucr.aldifa.apiclient.domain.Issue;
import cr.ac.ucr.aldifa.apiclient.domain.IssueDTO;
import org.apache.http.client.HttpClient;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeUnit;

public class IssueDTOtoSupport {

    private String endpoint = "https://localhost:44382/api/Issues/";


    @Autowired
    private RestTemplate restTemplate;

    public void callPostIssueAPI(Issue issue) throws InterruptedException {

        restTemplate = this.getRestTemplate();
        IssueDTO issueDTO = new IssueDTO(
                0,
                "Sin asignar",
                "Media",
                "Ingresado",
                "Sin resolver",
                issue.getDescription(),
                issue.getContactemail(),
                issue.getContactphone(),
                issue.getIdclient(),
                issue.getIdservice()
        );

        TimeUnit.SECONDS.sleep(5);
        ResponseEntity<IssueDTO> issueResponse = restTemplate.postForEntity(endpoint, issueDTO, IssueDTO.class);
    }

    public RestTemplate getRestTemplate() {
        RestTemplate template = null;
        SSLConnectionSocketFactory socketFactory = null;
        try {
            socketFactory = new SSLConnectionSocketFactory(new SSLContextBuilder().loadTrustMaterial(null, new TrustSelfSignedStrategy()).build());
            HttpClient httpClient = HttpClients.custom().setSSLSocketFactory(socketFactory).build();
            HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory();
            clientHttpRequestFactory.setHttpClient(httpClient);
            template = new RestTemplate(clientHttpRequestFactory);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (KeyManagementException e) {
            e.printStackTrace();
        } catch (KeyStoreException e) {
            e.printStackTrace();
        }
        return template;
    }


}
