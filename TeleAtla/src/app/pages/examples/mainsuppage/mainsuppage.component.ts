import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";

@Component({
  selector: "app-mainsuppage",
  templateUrl: "mainsuppage.component.html"
})
export class MainsuppageComponent implements OnInit {
  @Input()
  ID = this.rest.IDsuper;

  issues: any = [];
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private rest: RestService, private router: Router) { }

  ngOnInit() {
    this.getIssue();
  }

  getIssue() {
    this.issues = [];
    this.rest.getIssues().subscribe((data: {}) => { this.issues = data; });
  }

  public popoverTitle: string = '¿En verdad desea eliminar esta solicitud?';
  delete(id) {
    this.rest.deleteIssue(id).subscribe(res => { this.getIssue(); }, (err) => { console.log(err); });
  }

  logOut() {
    this.rest.logOutS();
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => { this.router.navigate(['']); });
  }

}
