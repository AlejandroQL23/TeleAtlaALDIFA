import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-profilepage",
  templateUrl: "profilepage.component.html"
})
export class ProfilepageComponent implements OnInit, OnDestroy {

  @Input() supporterData:any = {name:'', email:''};

  supporterFormUpdate: FormGroup;

  isCollapsed = true;
  constructor(
    private fb: FormBuilder,
    public rest:RestService,
    private route: ActivatedRoute,
    private router: Router
 ) { }
 
  ngOnInit() {

    this.rest.getSupporter(this.route.snapshot.params['Id']).subscribe((data: {}) => {
      console.log(data);
      this.supporterData = data;
    });

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");

    
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }


  get name() { return this.supporterFormUpdate.get('name'); }


}
