import { Component, OnInit } from '@angular/core';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';
@Component({
  selector: 'weft-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public logggedInUser: any;

  constructor(private httpService: WeftHttpService, private router: Router) {
   }  

  ngOnInit() {   
  }

  ngAfterViewInit(){
  }
}
