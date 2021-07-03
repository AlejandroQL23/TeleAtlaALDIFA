import { Component, OnInit } from '@angular/core';
import { GetSupportersListComponent } from 'src/app/componets/get-supporters-list/get-supporters-list.component';
import { RestService } from 'src/app/rest.service';
@Component({
  selector: 'app-delete-supporter',
  templateUrl: './delete-supporter.component.html',
  styleUrls: ['./delete-supporter.component.scss']
})
export class DeleteSupporterComponent implements OnInit {

  constructor(public rest: RestService, public getAll: GetSupportersListComponent) { }

  ngOnInit(): void {
  }



  deleteSupporter(id) {
    this.rest.deleteSupporter(id)
      .subscribe(res => {
        this.getAll.getSupporters();
      }, (err) => {
        console.log(err);
      }
      );
  }
}
