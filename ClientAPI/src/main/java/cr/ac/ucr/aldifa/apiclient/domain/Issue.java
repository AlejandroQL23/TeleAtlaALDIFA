package cr.ac.ucr.aldifa.apiclient.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String description;
    private Date registertimestamp;
    private String address;
    private String contactphone;
    private String contactemail;
    private String status;
    private String supportuserassigned;
    private String resolutioncomment;
    private int idservice;
    private int idclient;

    public Issue() {
    }

    public Issue(int id, String description, Date registertimestamp, String address, String contactphone, String contactemail, String status, String supportuserassigned, String resolutioncomment, int idservice, int idclient) {
        this.setId(id);
        this.setDescription(description);
        this.setRegistertimestamp(registertimestamp);
        this.setAddress(address);
        this.setContactphone(contactphone);
        this.setContactemail(contactemail);
        this.setStatus(status);
        this.setSupportuserassigned(supportuserassigned);
        this.setResolutioncomment(resolutioncomment);
        this.setIdservice(idservice);
        this.setIdclient(idclient);
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

    public Date getRegistertimestamp() {
        return registertimestamp;
    }

    public void setRegistertimestamp(Date registertimestamp) {
        this.registertimestamp = registertimestamp;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactphone() {
        return contactphone;
    }

    public void setContactphone(String contactphone) {
        this.contactphone = contactphone;
    }

    public String getContactemail() {
        return contactemail;
    }

    public void setContactemail(String contactemail) {
        this.contactemail = contactemail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSupportuserassigned() {
        return supportuserassigned;
    }

    public void setSupportuserassigned(String supportuserassigned) {
        this.supportuserassigned = supportuserassigned;
    }

    public String getResolutioncomment() {
        return resolutioncomment;
    }

    public void setResolutioncomment(String resolutioncomment) {
        this.resolutioncomment = resolutioncomment;
    }

    public int getIdservice() {
        return idservice;
    }

    public void setIdservice(int idservice) {
        this.idservice = idservice;
    }

    public int getIdclient() {
        return idclient;
    }

    public void setIdclient(int idclient) {
        this.idclient = idclient;
    }
}