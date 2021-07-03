import { Component, OnInit } from "@angular/core";

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";

@Component({
  selector: "app-mainclientpage",
  templateUrl: "mainclientpage.component.html"
})
export class MainclientpageComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private rest:RestService, private router: Router) { }

  ngOnInit() {
  }
  logOut(){
    this.rest.logOut();
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });
  }

}
