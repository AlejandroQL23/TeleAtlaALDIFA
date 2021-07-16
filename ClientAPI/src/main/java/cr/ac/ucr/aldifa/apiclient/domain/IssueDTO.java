package cr.ac.ucr.aldifa.apiclient.domain;
import javax.persistence.*;

@Entity
public class IssueDTO {

    private int id;
    private String Reference;
    private String Classification;
    private String Status;
    private String ResolutionComment;

    public IssueDTO() {
    }

    public IssueDTO(int id, String reference, String classification, String status, String resolutionComment) {
        this.id = id;
        Reference = reference;
        Classification = classification;
        Status = status;
        ResolutionComment = resolutionComment;
    }
    @Id
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
}
