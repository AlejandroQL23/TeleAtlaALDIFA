import { Component, OnInit, Input, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";
import Swal from 'sweetalert2';

// import { SortService } from './SortService';

@Component({
  selector: "app-mainclientpage",
  templateUrl: "mainclientpage.component.html"
})
export class MainclientpageComponent implements OnInit {

   @Input()
   ID = this.rest.ID; //PREVISTO PARA PERFIL

   issues:any = [];
   issuesPrevio:any =[];
   issuesId:any = [];
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private rest:RestService, private router: Router) { }


    // @Input('sortable-column')
    // columnName: string;

    // @Input('sort-direction')
    // sortDirection: string = '';


    // private columnSortedSubscription: Subscription;

    // @HostListener('click')
    // sort() {
    //     this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    //     this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
    // }


    typeService(id) {
      let timerInterval
      let servicio
      if(id == 1){
        servicio = "Telefonía móvil"
      }else if (id == 2){
        servicio = "Cable"
      }else if (id == 3){
        servicio = "Internet"
      }else {
        servicio = "Telefonía fija"
      }
      Swal.fire({
        title: 'El servicio es:',
        html:  servicio,
        timer: 2000,
        timerProgressBar: false
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    }

    

  ngOnInit() {
    this.getIssue();

    setTimeout (() => {

    }, 2000);
    this.getIssueService();
   
  //    // subscribe to sort changes so we can react when other columns are sorted
  //    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
  //     // reset this column's sort direction to hide the sort icons
  //     if (this.columnName != event.sortColumn) {
  //         this.sortDirection = '';
  //     }
  // });
  }

//   ngOnDestroy() {
//     this.columnSortedSubscription.unsubscribe();
// }

  getIssue() {
    this.issues = [];
    this.issuesPrevio=[];

    this.rest.getIssuesById(this.ID).subscribe((data: {}) => {
      this.issues = data;
    });

  }

  getIssueService() {

    for (var _i = 0; _i < this.issues.length; _i++){
      if (this.issues[_i].idservice == 1){
        this.issues[_i].idservice = "Telefonía móvil";
      }else if (this.issues[_i].idservice == 2){
        this.issues[_i].idservice = "Cable";
      }else if (this.issues[_i].idservice == 3){
        this.issues[_i].idservice = "Internet";
      }else{
        this.issues[_i].idservice = "Telefonía fija";
      }
    }
  }

  getIssues(id) {
    this.issuesId = [];
    this.rest.getIssue(id).subscribe((data: {}) => {
      this.issuesId = data;
    });
  }

  logOut(){
    this.rest.logOut();
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });
  }

}
