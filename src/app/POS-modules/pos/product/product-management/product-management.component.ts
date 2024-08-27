import { Component, OnInit } from '@angular/core';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  public title: string = 'Product Management';
  public getGridDataApi: string = WeftAPIConfig.productService;
  public editNavPath: string = '/admin/product-edit';
  public createNavPath: string = '/admin/product-create';
  public gridKey: string = 'GRD';
  public keyField: string = "productId";
  public columnDefs: any[];
  
  constructor() {
    this.columnDefs = [
    {dataField : 'productCode',caption : 'Product Code'},
    { dataField : 'productName', caption : 'Product Name'}, 
    { dataField : 'categoryName', caption : 'Category Name'}, 
    { dataField : 'statusName', caption : 'Status'}];
  }

  ngOnInit() {
  }

  customizeColumns(columns: any) {
   
  }
}
