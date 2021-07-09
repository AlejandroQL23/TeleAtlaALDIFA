import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: "app-profilesuppage",
  templateUrl: "profilesuppage.component.html"
})
export class ProfilesuppageComponent implements OnInit, OnDestroy {

  @Input() supporterData:any = {id:0, name:'',firstSurName:'',secondSurName:'', email:'', password:''};
  usoFormUpdate: FormGroup;


  isCollapsed = true;
  constructor(private fb: FormBuilder, public rest:RestService, private route: ActivatedRoute, private router: Router) {

    this.usoFormUpdate = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      firstSurName: ['', [Validators.required]],
      secondSurName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
  })
   }

   get id() { return this.usoFormUpdate.get('id'); }
   get name() { return this.usoFormUpdate.get('name'); }
   get firstSurName() { return this.usoFormUpdate.get('firstSurName'); }
   get secondSurName() { return this.usoFormUpdate.get('secondSurName'); }
   get email() { return this.usoFormUpdate.get('email'); }
   get password() { return this.usoFormUpdate.get('password'); }

 updateUSO() {

  if (!this.usoFormUpdate.valid) {
    return;
  }
  this.rest.updateSupervisor( this.usoFormUpdate.value, this.supporterData.id).subscribe((result) => {
    this.loading();
  }, (err) => {
    console.log(err);
  });
  setTimeout (() => {
    this.back();
    }, 3000);
}


 back() {
  this.router.navigate(['/mainsupport']);
}

loading() {
  let timerInterval
  Swal.fire({
    title: 'Actualización',
    html: 'Perfil actualizado de manera correcta',
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        const content = Swal.getHtmlContainer()
        if (content) {
          const b = content.querySelector('b')

        }
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)

    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}
 
  ngOnInit() {

    this.rest.getSupervisor(this.route.snapshot.params['Id']).subscribe((data: {}) => {
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

}
