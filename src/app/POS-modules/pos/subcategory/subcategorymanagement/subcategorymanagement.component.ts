import { Component, OnInit } from '@angular/core';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-subcategorymanagement',
  templateUrl: './subcategorymanagement.component.html',
  styleUrls: ['./subcategorymanagement.component.scss']
})
export class SubcategorymanagementComponent implements OnInit {
  public title: string = 'SubCategory Management';
  public getGridDataApi: string = WeftAPIConfig.subcategoryService;
  public editNavPath: string = '/admin/subcategory-edit';
  public createNavPath: string = '/admin/subcategory-create';
  public gridKey: string = 'GRD';
  public keyField: string = "subcategoryId";
  public columnDefs: any[];
  
  constructor() {
    this.columnDefs = [
    {dataField : 'subcategoryCode',caption : 'SubCategory Code'},
    { dataField : 'subcategoryName', caption : 'SubCategory Name'}, 
    { dataField : 'categoryName', caption : 'Category Name'}, 
    { dataField : 'statusName', caption : 'Status'}];
  }

  ngOnInit() {
  }

  customizeColumns(columns: any) {
   
  }
}
