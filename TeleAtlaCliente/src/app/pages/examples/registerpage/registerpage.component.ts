import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";
import Swal from 'sweetalert2';

@Component({ selector: "app-registerpage", templateUrl: "registerpage.component.html" })
export class RegisterpageComponent implements OnInit, OnDestroy {

  registerClient: FormGroup;
  form: FormGroup;

  MoviesData: Array<any> = [
    { name: 'Telefonía móvil', value: '1' },
    { name: 'Cable', value: '2' },
    { name: 'Internet', value: '3' },
    { name: 'Telefonía fija', value: '4' }
  ];

  onCbChange(e) {
    const isArray: FormArray = this.form.get('isArray') as FormArray;

    if (e.target.checked) {
      isArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmit() {
    console.log(this.form.value)
  }

  isCollapsed = true;
  focus;
  focus1;
  focus2;

  constructor(private formBuilder: FormBuilder, public rest: RestService, private route: ActivatedRoute, private router: Router,) {

    this.registerClient = this.formBuilder.group({
      name: ['', [Validators.required]],
      firstsurname: ['', [Validators.required]],
      secondsurname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      secondcontact: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
    this.form = this.formBuilder.group({
      isArray: this.formBuilder.array([], [Validators.required])
    })
  }

  get name() { return this.registerClient.get('name'); }
  get firstsurname() { return this.registerClient.get('firstsurname'); }
  get secondsurname() { return this.registerClient.get('secondsurname'); }
  get address() { return this.registerClient.get('address'); }
  get phone() { return this.registerClient.get('phone'); }
  get secondcontact() { return this.registerClient.get('secondcontact'); }
  get email() { return this.registerClient.get('email'); }
  get password() { return this.registerClient.get('password'); }

  addClient() {
    if (!this.registerClient.valid) {
      return;
    }
    this.rest.addClient(this.registerClient.value, this.form.value).subscribe((result) => {
      this.loading();
    }, (err) => { console.log(err); });
    this.clearForm();
    setTimeout(() => { this.back(); }, 3000);
  }

  clearForm() {
    this.registerClient.reset({
      'name': '',
      'firstsurname': '',
      'secondsurname': '',
      'address': '',
      'phone': '',
      'secondcontact': '',
      'email': '',
      'password': ''
    });
  }

  back() {
    this.router.navigate(['/home']);
  }

  loading() {
    let timerInterval
    Swal.fire({
      title: 'Registro',
      html: 'Has sido registrado exitosamente',
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
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

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
