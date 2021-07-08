import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";

@Component({
  selector: "app-detailpage",
  templateUrl: "detailpage.component.html"
})
export class DetailpageComponent implements OnInit {

  issue:any;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private rest:RestService, private router: Router) { }

  ngOnInit() {
    this.rest.getIssue(this.route.snapshot.params['Id']).subscribe((data: {}) => {
      console.log(data);
      this.issue = data;
    });
  }


  cancel() {
    this.router.navigate(['/mainclient']);
  }

}
