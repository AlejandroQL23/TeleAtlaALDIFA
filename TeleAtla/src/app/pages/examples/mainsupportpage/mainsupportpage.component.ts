import { Component, OnInit, Input} from "@angular/core";

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";

@Component({
  selector: "app-mainsupportpage",
  templateUrl: "mainsupportpage.component.html"
})
export class MainsupportpageComponent implements OnInit {
  @Input()
    ID = this.rest.ID;

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
