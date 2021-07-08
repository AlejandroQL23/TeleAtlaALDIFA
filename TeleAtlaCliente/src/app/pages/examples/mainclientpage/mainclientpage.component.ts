import { Component, OnInit, Input } from "@angular/core";

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";

@Component({
  selector: "app-mainclientpage",
  templateUrl: "mainclientpage.component.html"
})
export class MainclientpageComponent implements OnInit {

   @Input()
   ID = this.rest.ID; //PREVISTO PARA PERFIL

   issues:any = [];
   issuesId:any = [];
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private rest:RestService, private router: Router) { }

  ngOnInit() {
    this.getIssue();
  }

  getIssue() {
    this.issues = [];
    this.rest.getIssues().subscribe((data: {}) => {
      this.issues = data;
    });
  }

  getIssues(id) {
    this.issuesId = [];
    this.rest.getIssue(id).subscribe((data: {}) => {
      this.issuesId = data;
    });
  }

  logOut(){
    this.rest.logOut();
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });
  }

}
