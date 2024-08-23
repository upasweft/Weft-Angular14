import { Component, OnInit } from '@angular/core';
import { AnimationGroup } from 'src/app/core/services/app-animations';
import { Router } from '@angular/router';
import { LoaderService } from './weft-common/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: AnimationGroup,
})
export class AppComponent implements OnInit {
  title = 'Weft';
  constructor(public router: Router, public loaderService: LoaderService) {
  }

  ngOnInit() {
}
}
