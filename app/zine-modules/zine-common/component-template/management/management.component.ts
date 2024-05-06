import { Component, OnInit } from '@angular/core';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { Router } from '@angular/router';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  public title: string = 'Management';
  public createNavPath: string = '/admin/create';
  public getGridDataApi: string = 'WeftAPIConfig.search';

  public gridKey: string = 'GRD';
  public columnDefs: any[];
  public editNavPath: string = '/admin/edit';
  public resourceKey: string = '';
  public resourceKeyName: string = '';
  
  public disableCopyTo: boolean = true;
  public copyToApi: string = '';

  constructor(private httpService: WeftHttpService, private router: Router) {
    this.columnDefs = [
      { headerName: this.resourceKeyName, field: this.resourceKey, filter: true, hide: true },
    ];
  }

  ngOnInit() {}
}
