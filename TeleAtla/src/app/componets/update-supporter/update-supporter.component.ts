import { Component, OnInit, Input } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-supporter',
  templateUrl: './update-supporter.component.html',
  styleUrls: ['./update-supporter.component.scss']
})
export class UpdateSupporterComponent implements OnInit {
  @Input() supporterData:any = {Id: 0, name:'', firstsurname: '', secondtsurname :'', email:'', password:''};

  supporterFormUpdate: FormGroup;
  errorMessage: any;
  constructor(
     private fb: FormBuilder,
     public rest:RestService,
     private route: ActivatedRoute,
     private router: Router
  ) { }

  ngOnInit(): void {
    this.rest.getSupporter(this.route.snapshot.params['Id']).subscribe((data: {}) => {
      console.log(data);
      this.supporterData = data;
    });

  }


  updateSupporter() {
    if (!this.supporterFormUpdate.valid) {
      return;
    }
    this.rest.updateSupporter(this.supporterData).subscribe((result) => {
      this.router.navigate(['/students']);
    }, (err) => {
      console.log(err);
    });
  }

  get Id() { return this.supporterFormUpdate.get('Id'); }
  get name() { return this.supporterFormUpdate.get('name'); }
  get firstsurname() { return this.supporterFormUpdate.get('firstsurname'); }
  get secondtsurname() { return this.supporterFormUpdate.get('secondtsurname'); }
  get email() { return this.supporterFormUpdate.get('email'); }
  get password() { return this.supporterFormUpdate.get('password'); }

}
