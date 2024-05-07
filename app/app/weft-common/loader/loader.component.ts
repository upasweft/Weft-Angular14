import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { AnimationGroup } from 'src/app/core/services/app-animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: AnimationGroup,
})
export class LoaderComponent implements OnInit {

  isLoaderActive = false;

  constructor(public loader: LoaderService) { }

  ngOnInit() {
  }

}
