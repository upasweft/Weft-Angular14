import { Component, OnInit } from '@angular/core';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

interface ColumnDef {
  dataField: string;
  caption: string;
}

@Component({
  selector: 'app-sitesettingsmangement',
  templateUrl: './sitesettingsmangement.component.html',
  styleUrls: ['./sitesettingsmangement.component.scss']
})
export class SitesettingsmangementComponent implements OnInit {
  public title: string = 'Site Settings Management';
  public getGridDataApi: string = WeftAPIConfig.siteSettings;
  public editNavPath: string = '/admin/sitesettings-edit';
  public createNavPath: string = '/admin/sitesettings-create';
  public gridKey: string = 'GRD';
  public keyField: string = "siteSettingId";
  public columnDefs: ColumnDef[];

  constructor() {
    this.columnDefs = [
      { dataField: 'siteCode', caption: 'Site Code' },
      { dataField: 'siteName', caption: 'Site Name' },
      { dataField: 'address', caption: 'Address' },
      { dataField: 'statusName', caption: 'Status' }
    ];
  }

  ngOnInit() {}

  customizeColumns(columns: any) {}
}
