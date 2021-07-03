import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// falta hacer el import de rest, como daba error lo quite, pero hay que ponerlo


@Component({
  selector: "app-registerrequestpage",
  templateUrl: "registerrequest.component.html"
})
export class RegisterrequestpageComponent implements OnInit, OnDestroy {

    USOForm: FormGroup;
    constructor(private fb: FormBuilder, private route: ActivatedRoute,
         private router: Router) {
        

          this.USOForm = this.fb.group({
            name: ['', [Validators.required]],
            surnameone: ['', [Validators.required]],
            surnametwo: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: new FormControl('', [
              Validators.required,
              Validators.pattern('^[0-9]{5,8}$')
            ])
        })

    }

    addUSO() {

        if (!this.USOForm.valid) {
          return;
        }
        console.log("HOLA, estas intentando dar click");
        /*this.rest.addStudent(this.studentForm.value).subscribe((result) => {
          this.router.navigate(['/students']);
        }, (err) => {
          console.log(err);
        }); */
      }
    
    
    
      get name() { return this.USOForm.get('name'); }
      get surnameone() { return this.USOForm.get('surnameone'); }
      get surnametwo() { return this.USOForm.get('surnametwo'); }
      get email() { return this.USOForm.get('email'); }
      get password() { return this.USOForm.get('password'); }



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
