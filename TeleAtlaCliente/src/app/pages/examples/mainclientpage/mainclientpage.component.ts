import { Component, OnInit, Input, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from "src/app/rest.service";

import { Subscription } from 'rxjs';

// import { SortService } from './SortService';

@Component({
  selector: "app-mainclientpage",
  templateUrl: "mainclientpage.component.html"
})
export class MainclientpageComponent implements OnInit {

   @Input()
   ID = this.rest.ID; //PREVISTO PARA PERFIL

   issues:any = [];
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

    

  ngOnInit() {
    this.getIssue();
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
    this.rest.getIssuesById(this.ID).subscribe((data: {}) => {
      this.issues = data;
    });
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
