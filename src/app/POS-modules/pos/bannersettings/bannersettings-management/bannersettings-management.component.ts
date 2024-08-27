import { Component, OnInit } from '@angular/core';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-bannersettings-management',
  templateUrl: './bannersettings-management.component.html',
  styleUrls: ['./bannersettings-management.component.scss']
})
export class BannersettingsManagementComponent implements OnInit {
  public title: string = 'Banner Settings Management';
  public getGridDataApi: string = WeftAPIConfig.bannerSettingsService;
  public editNavPath: string = '/admin/bannerSettings-edit';
  public createNavPath: string = '/admin/bannerSettings-create';
  public gridKey: string = 'GRD';
  public keyField: string = "bannerSettingsId";
  public columnDefs: any[];
  
  constructor() {
    this.columnDefs = [
    {dataField : 'bannerTitle',caption : 'Banner Title'},
   
    { dataField : 'statusName', caption : 'Status'}];
  }

  ngOnInit() {
  }

  customizeColumns(columns: any[]): void {
   
  }
}
