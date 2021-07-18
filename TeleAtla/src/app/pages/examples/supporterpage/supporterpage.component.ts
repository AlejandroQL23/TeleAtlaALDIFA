import { Component, OnInit, Input} from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";

@Component({
  selector: "app-supporterpage",
  templateUrl: "supporterpage.component.html"
})
export class SupporterpageComponent implements OnInit {
  @Input()
    ID = this.rest.ID;


    issues:any = [];
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private rest:RestService, private router: Router) { }

    
  ngOnInit() {
    this.getIssue();
  }

  getIssue() {
    this.issues = [];
    this.rest.getIssueBySupporter(this.ID).subscribe((data: {}) => {
      this.issues = data;
    });
  }
  
  public popoverTitle: string = '¿En verdad desea eliminar esta solicitud?';
  delete(id) {
    this.rest.deleteIssue(id)
      .subscribe(res => {
          this.getIssue();
        }, (err) => {
          console.log(err);
        }
      );
  }

  logOut(){
    this.rest.logOut();
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });
  }


}
