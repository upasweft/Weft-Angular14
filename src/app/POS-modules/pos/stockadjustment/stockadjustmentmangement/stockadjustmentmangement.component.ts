import { Component, OnInit } from '@angular/core';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-stockadjustmentmangement',
  templateUrl: './stockadjustmentmangement.component.html',
  styleUrls: ['./stockadjustmentmangement.component.scss']
})
export class StockadjustmentmangementComponent implements OnInit {
  public title: string = 'Stock Adjustment';
  public getGridDataApi: string = WeftAPIConfig.stockAdjustment;
  public editNavPath: string = '/admin/stock-adjustment-edit';
  public createNavPath: string = '/admin/Stock-adjustment-create';
  public gridKey: string = 'GRD';
  public keyField: string = "stockAdjustmentId";
  public columnDefs: any[];
  adjustmentTypes: { adjustmentType: number; adjustmentTypeDescription: string; }[];
  
  constructor() {
    this.adjustmentTypes = [
      { adjustmentType: 1, adjustmentTypeDescription: "Damage Stock" },
      { adjustmentType: 2, adjustmentTypeDescription: "Stock Removal" },
      { adjustmentType: 3, adjustmentTypeDescription: "Stock Addition" }
  ];
    this.columnDefs = [
    {dataField : 'docNum',caption : 'Doc Number'},
    { dataField : 'docDate', caption : 'Doc Date', dataType: 'date'}, 
    {
      dataField: 'docType', caption: 'Adjustment Type',
      calculateDisplayValue: (data: { docType: number; }) => {
          // Find the adjustment type description based on the numeric value
          const adjustmentType = this.adjustmentTypes.find(type => type.adjustmentType === data.docType);
          return adjustmentType ? adjustmentType.adjustmentTypeDescription : data.docType;
      }
  },
    { dataField : 'product.productName', caption : 'item'},
    { dataField : 'product.siteSettings.siteName', caption : 'Site Name'},
    { dataField : 'quantity', caption : ' Qty'}
  ];
  }

  ngOnInit() {
  }

  customizeColumns(columns: any) {
   
  }
}
