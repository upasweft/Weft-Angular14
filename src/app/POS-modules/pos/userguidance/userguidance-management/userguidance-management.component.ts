import { Component, OnInit } from '@angular/core';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-userguidance-management',
  templateUrl: './userguidance-management.component.html',
  styleUrls: ['./userguidance-management.component.scss']
})
export class UserguidanceManagementComponent implements OnInit {
  public title: string = 'User Guidance';
  public getGridDataApi: string = WeftAPIConfig.userGuidanceService+"/alluserGuidance";
  public editNavPath: string = '/admin/userGuidance-edit';
  public createNavPath: string = '/admin/userGuidance-create';
  public gridKey: string = 'GRD';
  public keyField: string = "userGuidanceId";
  public columnDefs: any[];
  
  constructor() {
    this.columnDefs = [
    {dataField : 'toolName',caption : 'Tool Name'},
    {dataField : 'description',caption : 'Description'},
    
   
    { dataField : 'statusName', caption : 'Status'}];
  }

  ngOnInit() {
  }

  customizeColumns(columns: any) {
   
  }
}
