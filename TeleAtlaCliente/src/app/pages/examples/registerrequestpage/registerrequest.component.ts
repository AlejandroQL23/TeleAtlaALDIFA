import { Component, OnInit, OnDestroy, HostListener, Input } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";
import Swal from 'sweetalert2';




// falta hacer el import de rest, como daba error lo quite, pero hay que ponerlo


@Component({
  selector: "app-registerrequestpage",
  templateUrl: "registerrequest.component.html"
})
export class RegisterrequestpageComponent implements OnInit, OnDestroy {

  @Input()
  ID = this.rest.ID; //PREVISTO PARA PERFIL
  issueReport: FormGroup;
  newIssueReport: FormGroup;
  idServiceVar: any;

  constructor(private formBuilder: FormBuilder, public rest: RestService, private route: ActivatedRoute, private router: Router) {

    this.issueReport = this.formBuilder.group({
      contactemail: ['', [Validators.required]],
      contactphone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
      idclient: [this.ID, [Validators.required]],
      idservice: ['', [Validators.required]]
    })

  }

  private options: string[] = [];

  get contactemail() { return this.issueReport.get('contactemail'); }
  get contactphone() { return this.issueReport.get('contactphone'); }
  get address() { return this.issueReport.get('address'); }
  get description() { return this.issueReport.get('description'); }
  get idclient() { return this.issueReport.get('idclient'); }
  get idservice() { return this.issueReport.get('idservice'); }

  addIssue() {



    if (!this.issueReport.valid) { return; }
    if (this.issueReport.value.idservice == "Telefonía móvil") { this.idServiceVar = 1; }
    else if (this.issueReport.value.idservice == "Cable") { this.idServiceVar = 2; }
    else if (this.issueReport.value.idservice == "Internet") { this.idServiceVar = 3; }
    else if (this.issueReport.value.idservice == "Telefonía fija") { this.idServiceVar = 4 }
    else { console.log("Error al seleccionar servicio"); }

    this.newIssueReport = this.formBuilder.group({
      contactemail: this.issueReport.value.contactemail,
      contactphone: this.issueReport.value.contactphone,
      address: this.issueReport.value.address,
      description: this.issueReport.value.description,
      idclient: this.issueReport.value.idclient,

      idservice: this.idServiceVar
    })



    this.rest.addIssue(this.newIssueReport.value).subscribe((result) => {
      console.log('Estoy tratandode hacer algo al menos');
      console.log(this.newIssueReport.value);
      this.loading();
    }, (err) => {
      console.log(err);
    });
    setTimeout(() => {
      this.back();
    }, 3000);
  }

  back() {
    this.router.navigate(['/mainclient']);
  }


  loading() {
    let timerInterval
    Swal.fire({
      title: 'Registro',
      html: 'Reporte registrado y eviado correctamente',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer()
          if (content) {
            const b = content.querySelector('b')

          }
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)

      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }



  isCollapsed = true;
  focus;
  focus1;
  focus2;
  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");

    var posX = e.clientX - window.innerWidth / 2;
    var posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares2.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares3.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares4.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares5.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares6.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares7.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
    squares8.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
  }


  ngOnInit() {
    console.log(this.ID);
    //console.log(this.rest.getClientServices(this.ID) + "Holaaa");

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
   // console.log(this.rest.getClientServices(this.ID));
    var num: number = 0;
    var A: number[] = [1, 2, 3, 4]; //variable a cambiar por lo que devuelve rest (this.rest.getClientServices(this.ID))
    if (A.includes(1)) {
      this.options[num] = "Telefonía móvil";
      num++;
    } if (A.includes(2)) {
      this.options[num] = "Cable";
      num++;
    } if (A.includes(3)) {
      this.options[num] = "Internet";
      num++;
    } if (A.includes(4)) {
      this.options[num] = "Telefonía fija";
      num++;
    }

    this.onMouseMove(event);

  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
}
