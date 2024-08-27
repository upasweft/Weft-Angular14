import { Component, OnInit } from '@angular/core';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-categorymanagement',
  templateUrl: './categorymanagement.component.html',
  styleUrls: ['./categorymanagement.component.scss']
})
export class CategorymanagementComponent implements OnInit {

  public title: string = 'Category Management';
  public getGridDataApi: string = WeftAPIConfig.categoryService;
  public editNavPath: string = '/admin/category-edit';
  public createNavPath: string = '/admin/category-create';
  public gridKey: string = 'GRD';
  public keyField: string = "categoryId";
  public columnDefs: any[];
  
  constructor() {
    this.columnDefs = [
    {dataField : 'categoryCode',caption : 'Category Code'},
    { dataField : 'categoryName', caption : 'Category Name'}, 
    { dataField : 'statusName', caption : 'Status'}];
  }

  ngOnInit() {
  }

  customizeColumns(columns: any) {
   
  }
}
