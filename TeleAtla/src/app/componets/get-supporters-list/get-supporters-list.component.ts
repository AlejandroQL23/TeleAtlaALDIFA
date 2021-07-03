import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from "src/app/service/Auth/authentication.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-supporters-list',
  templateUrl: './get-supporters-list.component.html',
  styleUrls: ['./get-supporters-list.component.scss']
})
export class GetSupportersListComponent implements OnInit {

  supporter: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  supporters: any = [];


  constructor(
    private formBuilder: FormBuilder,
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router,
    private authentication: AuthenticationService

  ) { }

  ngOnInit(): void {

    this.getSupporters();
    if (sessionStorage.getItem("email")) {
      this.router.navigate(['']);
    }

  }
//----------------------------------


getSupporters() {
  this.supporters = [];
  this.rest.getSupporters().subscribe((data: {}) => {
    console.log(data);
    this.supporters = data;
  });
}






}//end class()

