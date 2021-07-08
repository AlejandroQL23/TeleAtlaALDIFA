import { Component, OnInit, OnDestroy, HostListener, Input}  from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";
import Swal from 'sweetalert2';

// falta hacer el import de rest, como daba error lo quite, pero hay que ponerlo


@Component({
  selector: "app-registerusopage",
  templateUrl: "registerusopage.component.html"
})
export class RegisterusopageComponent implements OnInit, OnDestroy {

  addUso: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    public rest:RestService,
    private route: ActivatedRoute,
    private router: Router
    ) { 

      this.addUso = this.formBuilder.group({
        name: ['', [Validators.required]],
        firstsurname: ['', [Validators.required]],
        secondsurname: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]

        // password: new FormControl('', [
        //   Validators.required,
        //   Validators.pattern('^[0-9]{5,8}$')
        // ])
    })

     }

     get name() { return this.addUso.get('name'); }
     get firstsurname() { return this.addUso.get('firstsurname'); }
     get secondsurname() { return this.addUso.get('secondsurname'); }
     get email() { return this.addUso.get('email'); }
     get password() { return this.addUso.get('password'); }


      addUSO() {

        if (!this.addUso.valid) {
          return;
        }

        this.rest.addSupporter(this.addUso.value).subscribe((result) => {
          console.log('Estoy tratandode hacer algo al menos');
          this.loading();
        }, (err) => {
          console.log(err);
        });
      }
    
      loading() {
        let timerInterval
        Swal.fire({
          title: 'Registro',
          html: 'El colaborador se ha registrado de manera correcta',
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
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    this.onMouseMove(event);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
}
