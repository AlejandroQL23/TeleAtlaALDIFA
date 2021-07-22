package cr.ac.ucr.aldifa.apiclient.domain;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
private String name;
private String firstsurname;
private String secondsurname;
private String address;
private String phone;
private String secondcontact;
private String email;
private String password;

public Client(){

}
    public Client(int id, String name, String firstsurname, String secondsurname, String address, String phone, String secondcontact, String email, String password) {
        this.setId(id);
        this.setName(name);
        this.setFirstsurname(firstsurname);
        this.setSecondsurname(secondsurname);
        this.setAddress(address);
        this.setPhone(phone);
        this.setSecondcontact(secondcontact);
        this.setEmail(email);
        this.setPassword(password);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstsurname() {
        return firstsurname;
    }

    public void setFirstsurname(String firstsurname) {
        this.firstsurname = firstsurname;
    }

    public String getSecondsurname() {
        return secondsurname;
    }

    public void setSecondsurname(String secondsurname) {
        this.secondsurname = secondsurname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSecondcontact() {
        return secondcontact;
    }

    public void setSecondcontact(String secondcontact) {
        this.secondcontact = secondcontact;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
