package cr.ac.ucr.aldifa.apiclient.domain;

import javax.persistence.*;

@Entity
public class Clientservice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int idclient;
    private int idservice;

    public Clientservice() {
    }

    public Clientservice(int id, int idclient, int idservice) {
        this.setId(id);
        this.setIdclient(idclient);
        this.setIdservice(idservice);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdclient() {
        return idclient;
    }

    public void setIdclient(int idclient) {
        this.idclient = idclient;
    }

    public int getIdservice() {
        return idservice;
    }

    public void setIdservice(int idservice) {
        this.idservice = idservice;
    }
}
