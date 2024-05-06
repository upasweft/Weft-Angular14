import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    $('body').addClass('hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed');
  }

}
