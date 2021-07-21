import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-detailpagesupport",
  templateUrl: "detailpagesupport.component.html"
})
export class DetailpagesupportComponent implements OnInit {

  lista:string[]=["Baja","Media","Alta"];

    @Input()
    MYNAME = this.rest.myName;

  notes: FormGroup;

  @Input() issueDataEnd:any = {id:0, resolutionComment:'', idClient:0, status:'',
  emailIssue:'', phoneIssue:'', reference:'', description:'', classification:'',
  issueTimeStamp:'', creationDate:'', creationUser:'', idService:''};
  resolution: FormGroup;

  issue:any;
  client:any;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private rest:RestService, private router: Router) { 

        this.notes = this.fb.group({
            notesSup: ['', [Validators.required]]
        })

      this.resolution = this.fb.group({
        id : ['', [Validators.required]],
        resolutionComment: ['', [Validators.required]],
        idClient:['', [Validators.required]],
        status:['', [Validators.required]],
        emailIssue:['', [Validators.required]],
        phoneIssue:['', [Validators.required]],
        reference:[this.MYNAME, [Validators.required]],
        description:['', [Validators.required]],
        classification: ['', [Validators.required]],
        issueTimeStamp: ['', [Validators.required]],
        creationDate: ['', [Validators.required]],
        creationUser: ['', [Validators.required]],
        idService: ['', [Validators.required]]
    })
    }

    get notesSup() { return this.notes.get('notesSup'); }

    get id() { return this.resolution.get('id'); }
    get resolutionComment() { return this.resolution.get('resolutionComment'); }
    get idClient() { return this.resolution.get('idClient'); }
    get status() { return this.resolution.get('status'); }
    get emailIssue() { return this.resolution.get('emailIssue'); }
    get phoneIssue() { return this.resolution.get('phoneIssue'); }
    get reference() { return this.resolution.get('reference'); }
    get description() { return this.resolution.get('description'); }
    get classification() { return this.resolution.get('classification'); }
    get issueTimeStamp() { return this.resolution.get('issueTimeStamp'); }
    get creationDate() { return this.resolution.get('creationDate'); }
    get creationUser() { return this.resolution.get('creationUser'); }
    get idService() { return this.resolution.get('idService'); }

  ngOnInit() {
    this.rest.getIssue(this.route.snapshot.params['Id']).subscribe((data: {}) => {
      console.log(data);
      this.issueDataEnd = data;
    });
    console.log(this.MYNAME + "Este es mi nombre");
  }

  addNote() {

    // if (!this.commentIssue.valid) {
    //   return;
    // }
    // this.rest.addComment(this.commentIssue.value).subscribe((result) => {
    //   console.log('Estoy tratandode hacer algo al menos');
    //   console.log(this.commentIssue.value);
    //   this.loading();
    // }, (err) => {
    //   console.log(err);
    // });
    // setTimeout (() => {
    //   this.cancel();
    //   }, 3000);
  }

  updateStart() {

    if (!this.resolution.valid) {
      return;
    }
    this.rest.updateIssueStart( this.resolution.value).subscribe((result) => {
      this.loading();
    }, (err) => {
      console.log(err);
    });
    setTimeout (() => {
      this.cancel();
      }, 3000);
  }

  updateEnd() {

    if (!this.resolution.valid) {
      return;
    }
    this.rest.updateIssueEnd( this.resolution.value).subscribe((result) => {
      this.loading();
    }, (err) => {
      console.log(err);
    });
    setTimeout (() => {
      this.cancel();
      }, 3000);
  }

  updateClassification() {


    this.rest.updateIssue( this.resolution.value, this.issueDataEnd.id).subscribe((result) => {
      this.loading();
    }, (err) => {
      console.log(err);
    });
    setTimeout (() => {
      this.cancel();
      }, 3000);
  }


  showInfoClient(id){
     this.rest.getClientDataIssue(id).subscribe((data: {}) => {
        console.log(data);
        this.client = data; 
       });
  }

  loading() {
    let timerInterval
    Swal.fire({
      title: 'Registro',
      html: 'Registrado  correctamente',
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



  cancel() {
    this.router.navigate(['/mainsupporter']);  // ---->> CAMBIAR
  }

}
