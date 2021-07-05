package cr.ac.ucr.aldifa.apiclient.domain;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
private String description;
private String commenttimestamp;

public Comment(){

}

    public Comment(int id, String description, String commenttimestamp) {
        this.setId(id);
        this.setDescription(description);
        this.setCommenttimestamp(commenttimestamp);
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
}
