package cr.ac.ucr.aldifa.apiclient.domain;


import javax.persistence.*;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String description;
    private String commenttimestamp;
    @ManyToOne
    @JoinColumn(name = "IdIssue")
    private Issue issue;

public Comment(){}

    public Comment(int id, String description, String commenttimestamp, Issue issue) {
        this.setId(id);
        this.setDescription(description);
        this.setCommenttimestamp(commenttimestamp);
        this.setIssue(issue);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCommenttimestamp() {
        return commenttimestamp;
    }

    public void setCommenttimestamp(String commenttimestamp) {
        this.commenttimestamp = commenttimestamp;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }
}
