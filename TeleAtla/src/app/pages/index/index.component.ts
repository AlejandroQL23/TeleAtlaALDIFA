import { Component, OnInit, OnDestroy } from "@angular/core";
import { RestService } from "src/app/rest.service";
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from "src/app/service/Auth/authentication.service";
import { FormGroup, FormControl,  FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: "app-index",
  templateUrl: "index.component.html"
})



export class IndexComponent implements OnInit, OnDestroy {


  supervisor: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;


  constructor(
    private formBuilder: FormBuilder,
    public rest:RestService,
    private route: ActivatedRoute,
    private router: Router,
    private authentication: AuthenticationService
    ) { 

      this.supervisor = this.formBuilder.group({
        email: ['', [Validators.required]],
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]{5,8}$')
        ])
    })

     }

     get email() { return this.supervisor.get('email'); }
     get password() { return this.supervisor.get('password'); }

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

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }

    ngOnInit() {

      if (sessionStorage.getItem("email")) {
        this.router.navigate(['']);
      }
      this.supervisor = this.formBuilder.group({
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

    if (!this.supervisor.valid) {
      return;
    }

    setTimeout (() => {

    this.submitted = true;

    if (this.supervisor.invalid) {
        return;
    }

    this.loading = true;
    
    this.rest.loginS(this.supervisor.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigateByUrl('/mainsup', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/mainsup']);
                    
                    
            }); 
            },
            error => {
              console.log("HOLA, ME CAI");
                this.loading = false;
            });

          }, 2000);
  
}



}
