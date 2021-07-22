package cr.ac.ucr.aldifa.apiclient.domain;

import javax.persistence.*;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String description;
    private String commenttimestamp;
    private int idissue;

    public Comment() {
    }

    public Comment(int id, String description, String commenttimestamp, int idissue) {
        this.setId(id);
        this.setDescription(description);
        this.setCommenttimestamp(commenttimestamp);
        this.setIdissue(idissue);
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

    public int getIdissue() {
        return idissue;
    }

    public void setIdissue(int idissue) {
        this.idissue = idissue;
    }
}
