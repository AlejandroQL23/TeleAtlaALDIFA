import { Component, OnInit, OnDestroy, ViewChild, NgModule } from "@angular/core";
import { RestService } from "src/app/rest.service";
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from "src/app/service/Auth/authentication.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({ selector: "app-index", templateUrl: "index.component.html" })

export class IndexComponent implements OnInit, OnDestroy {

  client: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  students: any = [];

  constructor(private formBuilder: FormBuilder, public rest: RestService, private route: ActivatedRoute, private router: Router, private authentication: AuthenticationService,) {
    this.client = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get email() { return this.client.get('email'); }
  get password() { return this.client.get('password'); }

  showSpinner = false;

  loadData() {
    this.showSpinner = true;
    setTimeout(() => { this.showSpinner = false; }, 5000);
  }

  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  ngOnInit() {
    if (sessionStorage.getItem("email")) {
      this.router.navigate(['']);
    }
    this.client = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
    var slider = document.getElementById("sliderRegular");
    var slider2 = document.getElementById("sliderDouble");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
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

  onSubmit() {
    if (!this.client.valid) {
      this.errorSession();
      return;
    }

    setTimeout(() => {
      this.submitted = true;
      if (this.client.invalid) {
        return;
      }

      this.loading = true;
      this.rest.login(this.client.value).pipe(first()).subscribe(data => {
        this.router.navigateByUrl('/mainclient', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/mainclient']);
        });
      },
        error => {
          this.errorSession();
          this.loading = false;
        });
    }, 2000);
  }
}
