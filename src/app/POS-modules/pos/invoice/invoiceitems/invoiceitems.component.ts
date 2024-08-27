import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-invoiceitems',
  templateUrl: './invoiceitems.component.html',
  styleUrls: ['./invoiceitems.component.scss']
})
export class InvoiceitemsComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  @Input() invoiceItems: any;
  @Input() items: any;
  // @Input() insertedBoxes: any;
  @Output() transferItemData = new EventEmitter<any>();
  products: any;
  categoryId: any;
  price: any;
  @Input() set selectedBoxRowKey(value: any) {
    this.selectedBoxKey = value;
    this.boxNotSelected = (value != null && value != undefined && value != '') ? false : true;
  }
  bsModalRef!: BsModalRef;

  getcategoryServiceApi: string = WeftAPIConfig.categoryService;
  selectedItems: any = [];
  selectedItemPrice: any = [];
  nonNegative: any = /^(?!0*[.,]0*$|[.,]0*$|0*$)\d+[,.]?\d{0,3}$/;
  includeZero: any = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
  dutiableDataSource: any;
  validYear: any = /^\d{4}$/;
  boxNotSelected: boolean = false;
  selectedBoxKey: any;
  boxValidationMessage: string = '';

  constructor(private httpService: WeftHttpService,
    private modalService: BsModalService,
    private toastrService: ToastrService) {
    this.dutiableDataSource = [
      { id: "D", name: "DUTY" },
      { id: "N", name: "NON DUTY" },
    ]
  }

  ngOnInit() {
    //  this.getItemData();
    this.getProoduct()
  }

  getItemData(): any {
    this.httpService.get(this.getcategoryServiceApi).subscribe(result => {
      if (result) {
        this.items = result
        console.log(this.items)
      }
    })
  }
  getProoduct()
  {
    this.httpService.get(WeftAPIConfig.productService).subscribe(result => {
      if (result) {
        this.products = result
        console.log(this.items)
      }
    })
  }
  onSetCellValue(rowData: any, value: any): void {  
     
  }  
  onInitNewRow(event: any) {
    
    event.data.quantity = 0;
    event.data.price = 0;
    event.data.additionalValue = 0;
    event.data.itemDuty = 0;
    event.data.dutiable = "N";
  }

  onRowInserting(event: { data: any; }) {
    this.dataGrid.instance.getDataSource().items().push(event.data);
    this.processData(this.dataGrid.instance.getDataSource().items());
  }

  onRowRemoved(event: any) {
    setTimeout(() =>
      this.processData(this.dataGrid.instance.getDataSource().items()),
      500);
  }

  onRowUpdating(event: any) {
    setTimeout(() =>
      this.processData(this.dataGrid.instance.getDataSource().items()),
      500);
  }

  processData(data: any[]) {
    this.selectedItems.splice(0, this.selectedItems.length);
    let count = 0, totalPrice: number = 0;
    data.forEach((e: { quantity: any; price: any; }) => {
      count++;
      let filterData = {
        invoiceItemId: 0,
        InvoiceId: 0,
        ProductId: 0,
        Quantity: Number(e.quantity) || 0,
        price: Number(e.price) || 0,
        amount: Number(e.price) || 0,
        discount: Number(e.price) || 0,

      }
      this.selectedItems.push(filterData);
      console.log(this.selectedItems)
    });
    this.transferItemData.next(this.selectedItems);
  
  }

  onProductChanged(event: any) {
    const selectedProductId = event.value;
   
    const selectedProduct = this.products.find((product: { productId: any; }) => product.productId === selectedProductId);
   
    if (selectedProduct) {
       
        this.price = selectedProduct.price;
    } else {
       
        this.price = null; 
    }
}

  onValueChanged(event: { selectedItem: { itemCode: any; itemName: any; }; }, cellInfo: { data: { invoiceLineId: number; itemCode: any; itemName: any; }; }) {
    cellInfo.data.invoiceLineId = 0;
    cellInfo.data.itemCode = event.selectedItem.itemCode;
    cellInfo.data.itemName = event.selectedItem.itemName;
  }

  onBoxValueChanged(event: { selectedItem: { lineNum: any; boxName: any; boxWeight: any; }; }, cellInfo: { data: { boxNo: any; boxName: any; boxWeight: any; quantity: number; }; }) {
    cellInfo.data.boxNo = event.selectedItem.lineNum;
    cellInfo.data.boxName = event.selectedItem.boxName;
    cellInfo.data.boxWeight = event.selectedItem.boxWeight;
    cellInfo.data.quantity = 0;
  }

  customizeCaption(data: { value: number; }) {
    return '' + data.value.toFixed(2);
  }

  setOthers(newData: { quantity: any; additionalValue: number; itemDuty: number; price: number; }, value: any) {
    newData.quantity = value;
    newData.additionalValue = 0;
    newData.itemDuty = 0;
    newData.price = 0;
  }

  calculateItemDuty(newData: { additionalValue: any; itemDuty: number; }, value: string | number | null | undefined, currentRowData: { dutiable: string; }) {
    if (currentRowData.dutiable == 'D') {
      newData.additionalValue = value || 0;
      var valuedata = value !== undefined && value !== null ? parseFloat(value as string).toFixed(2) : '0.00';

      newData.itemDuty = (value !== 'NaN' && value !== '' && value !== null && value !== undefined) 
  ? parseFloat(valuedata) * (35 / 100)
  : 0;
    }
    else {
      newData.additionalValue = value || 0;
      newData.itemDuty = 0;
    }
  }

  calCulateLookUpDuty(newData: { dutiable: any; additionalValue: any; itemDuty: number; }, value: string, currentRowData: { additionalValue: string | number | null | undefined; }) {
    newData.dutiable = value;
    if (value == 'D') {
      newData.additionalValue = currentRowData.additionalValue || 0;
      var additionalValue = currentRowData.additionalValue !== undefined && currentRowData.additionalValue !== null 
      ? parseFloat(currentRowData.additionalValue as string).toFixed(2) 
      : '0.00';
    
      newData.itemDuty = (currentRowData.additionalValue !== 'NaN' &&
        currentRowData.additionalValue !== '' &&
        currentRowData.additionalValue !== null &&
        currentRowData.additionalValue !== undefined) 
        ? parseFloat(additionalValue) * (35 / 100) 
        : 0;
    }
    else {
      newData.additionalValue = currentRowData.additionalValue || 0;
      newData.itemDuty = 0;
    }
  }

  setItemCodeCapsValue(newData: { itemCode: any; }, value: string) {
    newData.itemCode = value.toUpperCase();
  }

  setItemNameCapsValue(newData: { itemName: any; }, value: string) {
    newData.itemName = value.toUpperCase();
  }

  boxnameChange(newData: { boxName: any; }, value: any) {
    newData.boxName = value;
  }

  boxSlChange(newData: { invoiceBoxId: any; }, value: any) {
    newData.invoiceBoxId = value;
  }

  onEditorPreparing(e: any) {
    console.log(e)
    if (e.parentType === 'dataRow' && e.dataField === 'dutiable') {
      e.editorOptions.onKeyDown = (options: { event: { keyCode: number; target: { value: any; }; preventDefault: () => void; }; }) => {
        if (options.event.keyCode === 13) {
          let selectedValue = options.event.target.value
          setTimeout(async () => {
            await this.processData(this.dataGrid.instance.getDataSource().items());
          }, 500);

          e.component.cellValue(e.row.rowIndex, 'dutiable', selectedValue);
          this.dataGrid.instance.addRow();
          options.event.preventDefault();
        }
      };
    }
  }

 
  OnKeyDown(event: any) {
    if (event.event.key === "Enter") {
      this.dataGrid.instance.addRow();
    }
  }


}


