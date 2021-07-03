import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-supporter-id',
  templateUrl: './get-supporter-id.component.html',
  styleUrls: ['./get-supporter-id.component.scss']
})
export class GetSupporterIdComponent implements OnInit {


  supporter:any;
  
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router, public getAll: RestService) { }

  ngOnInit(): void {

    this.rest.getSupporter(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.supporter = data;
    });
  }

   









     
}
