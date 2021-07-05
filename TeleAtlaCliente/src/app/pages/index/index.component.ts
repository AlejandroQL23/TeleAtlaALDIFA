import { Component, OnInit, OnDestroy, ViewChild, NgModule} from "@angular/core";
import noUiSlider from "nouislider";

import { RestService } from "src/app/rest.service";
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from "src/app/service/Auth/authentication.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: "app-index",
  templateUrl: "index.component.html"

  
})





export class IndexComponent implements OnInit, OnDestroy {


  supporter: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  students:any = [];

  constructor(
    private formBuilder: FormBuilder,
    public rest:RestService,
    private route: ActivatedRoute,
    private router: Router,
    private authentication: AuthenticationService,
    ) { }

    showSpinner = false;

    loadData(){
      this.showSpinner = true;
      setTimeout( () => {
        this.showSpinner = false;
      }, 5000);
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
      this.supporter = this.formBuilder.group({
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

//------------------------------------
  onSubmit() {  

    setTimeout (() => {


    this.submitted = true;

    if (this.supporter.invalid) {
        return;
    }

    this.loading = true;
    
    this.rest.login(this.supporter.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigateByUrl('/mainclient', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/mainclient']);
                    
            }); 
            },
            error => {
              console.log("HOLA, ME CAI");
                this.loading = false;
            });

          }, 2000);

}





}
