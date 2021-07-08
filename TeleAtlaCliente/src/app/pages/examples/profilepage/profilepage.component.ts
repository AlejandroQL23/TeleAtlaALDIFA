import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: "app-profilepage",
  templateUrl: "profilepage.component.html"
})
export class ProfilepageComponent implements OnInit, OnDestroy {

  @Input()
  ID = this.rest.ID;

  @Input() clientData:any = {id: 0, name:'',firstsurname:'',secondsurname:'', email:'', phone:'', secondcontact:'',
   address:'', password:''};
  clientFormUpdate: FormGroup;

  isCollapsed = true;
  constructor(private fb: FormBuilder, public rest:RestService, private route: ActivatedRoute, private router: Router) {

    this.clientFormUpdate = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      firstsurname: ['', [Validators.required]],
      secondsurname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      secondcontact: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]]
  })
   }

   get id() { return this.clientFormUpdate.get('id'); }
   get name() { return this.clientFormUpdate.get('name'); }
   get firstsurname() { return this.clientFormUpdate.get('firstsurname'); }
   get secondsurname() { return this.clientFormUpdate.get('secondsurname'); }
   get email() { return this.clientFormUpdate.get('email'); }
   get phone() { return this.clientFormUpdate.get('phone'); }
   get secondcontact() { return this.clientFormUpdate.get('secondcontact'); }
   get address() { return this.clientFormUpdate.get('address'); }
   get password() { return this.clientFormUpdate.get('password'); }
 


 updateClient() {
  if (!this.clientFormUpdate.valid) {
    return;
  }
  this.rest.updateClient( this.clientFormUpdate.value, this.clientData.id ).subscribe((result) => {

  }, (err) => {
    console.log(err);
  });
}

  ngOnInit() {

    this.rest.getClient(this.route.snapshot.params['Id']).subscribe((data: {}) => {
      console.log(data);
      this.clientData = data;
    });

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }


  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}
