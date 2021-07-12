import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-detailpage",
  templateUrl: "detailpage.component.html"
})
export class DetailpageComponent implements OnInit {
  commentIssue: FormGroup;
  issue:any;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private rest:RestService, private router: Router) { 

      this.commentIssue = this.fb.group({
        comment: ['', [Validators.required]]
    })
    }

    get comment() { return this.commentIssue.get('comment'); }

  ngOnInit() {
    this.rest.getIssue(this.route.snapshot.params['Id']).subscribe((data: {}) => {
      console.log(data);
      this.issue = data;

    });
  }

  addComment() {

    if (!this.commentIssue.valid) {
      return;
    }
    this.rest.addComment(this.commentIssue.value).subscribe((result) => {
      console.log('Estoy tratandode hacer algo al menos');
      console.log(this.commentIssue.value);
      this.loading();
    }, (err) => {
      console.log(err);
    });
    setTimeout (() => {
      this.cancel();
      }, 3000);
  }

  loading() {
    let timerInterval
    Swal.fire({
      title: 'Registro',
      html: 'Comentario registrado y eviado correctamente',
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
    this.router.navigate(['/mainclient']);
  }

}