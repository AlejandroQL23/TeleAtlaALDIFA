import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { RestService } from "src/app/rest.service";
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from "src/app/service/Auth/authentication.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: "app-registerpage",
  templateUrl: "registerpage.component.html"
})
export class RegisterpageComponent implements OnInit, OnDestroy {
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

  supporter: FormGroup;
  loadingSupporter = false;
  submittedSupporter = false;
  returnUrlSupporter: string;

  constructor(
    private formBuilder: FormBuilder,
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router,
    private authentication: AuthenticationService
  ) {

    this.supporter = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{5,8}$')
      ])
    })

  }

  get email() { return this.supporter.get('email'); }
  get password() { return this.supporter.get('password'); }

  showSpinnerSupporter = false;

  loadDataSupporter() {
    this.showSpinnerSupporter = true;
    setTimeout(() => {
      this.showSpinnerSupporter = false;
    }, 5000);
  }

  ngOnInit() {

    if (sessionStorage.getItem("email")) {
      this.router.navigate(['']);
    }
    this.supporter = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
    this.onMouseMove(event);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  errorSession() {
    let timerInterval
    Swal.fire({
      title: 'Algo salió mal',
      html: 'Confirma que los campos estan llenos y la información sea correcta',
      timer: 3000,
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

  onSubmitSupporter() {
    if (!this.supporter.valid) {
      this.errorSession();
      return;
    }
    setTimeout(() => {
      this.submittedSupporter = true;
      if (this.supporter.invalid) {
        return;
      }
      this.loadingSupporter = true;
      this.rest.login(this.supporter.value).pipe(first()).subscribe(
        data => {
          this.router.navigateByUrl('/mainsupporter', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/mainsupporter']);
          });
        },
        error => {
          this.errorSession();
          this.loadingSupporter = false;
        });

    }, 2000);
  }

}
