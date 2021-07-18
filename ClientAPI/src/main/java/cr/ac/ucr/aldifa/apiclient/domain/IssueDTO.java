package cr.ac.ucr.aldifa.apiclient.domain;
import javax.persistence.*;

@Entity
public class IssueDTO {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String Reference;
    private String Classification;
    private String Status;
    private String ResolutionComment;
    private String Description;
    private String EmailIssue;
    private String PhoneIssue;
    private int idClient;
    private int idService;


    public IssueDTO(){}
    public IssueDTO(int id, String reference, String classification, String status, String resolutionComment, String description, String emailIssue, String phoneIssue, int idClient, int idService) {
        this.setId(id);
        setReference(reference);
        setClassification(classification);
        setStatus(status);
        setResolutionComment(resolutionComment);
        setDescription(description);
        setEmailIssue(emailIssue);
        setPhoneIssue(phoneIssue);
        this.setIdClient(idClient);
        this.setIdService(idService);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getReference() {
        return Reference;
    }

    public void setReference(String reference) {
        Reference = reference;
    }

    public String getClassification() {
        return Classification;
    }

    public void setClassification(String classification) {
        Classification = classification;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public String getResolutionComment() {
        return ResolutionComment;
    }

    public void setResolutionComment(String resolutionComment) {
        ResolutionComment = resolutionComment;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getEmailIssue() {
        return EmailIssue;
    }

    public void setEmailIssue(String emailIssue) {
        EmailIssue = emailIssue;
    }

    public String getPhoneIssue() {
        return PhoneIssue;
    }

    public void setPhoneIssue(String phoneIssue) {
        PhoneIssue = phoneIssue;
    }

    public int getIdClient() {
        return idClient;
    }

    public void setIdClient(int idClient) {
        this.idClient = idClient;
    }

    public int getIdService() {
        return idService;
    }

    public void setIdService(int idService) {
        this.idService = idService;
    }
}
