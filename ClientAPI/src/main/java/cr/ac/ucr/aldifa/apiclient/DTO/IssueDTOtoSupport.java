package cr.ac.ucr.aldifa.apiclient.DTO;

import cr.ac.ucr.aldifa.apiclient.domain.Issue;
import cr.ac.ucr.aldifa.apiclient.domain.IssueDTO;
import org.apache.http.client.HttpClient;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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

   // RestTemplate restTemplate = this.getRestTemplate();


    public void callPostIssueAPI(Issue issue) throws InterruptedException {

        restTemplate = this.getRestTemplate();
        IssueDTO issueDTO = new IssueDTO(
                0,
                issue.getDescription(),
                "Media",
                "Ingresado",
                "Sin resolver"
        );

        HttpHeaders headers = new HttpHeaders();
        TimeUnit.SECONDS.sleep(10);
        ResponseEntity<IssueDTO> issueResponse = restTemplate.postForEntity(endpoint, issueDTO, IssueDTO.class); // aqui cae
        System.out.print(issueResponse.getBody());
    }

    public RestTemplate getRestTemplate(){
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
