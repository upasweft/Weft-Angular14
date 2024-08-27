import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
interface ColumnDef {
  dataField: string;
  caption: string;
}
@Component({
  selector: 'app-grid-management',
  templateUrl: './grid-management.component.html',
  styleUrls: ['./grid-management.component.scss']
})
export class GridManagementComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  public gridManagementForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: WeftHttpService,
    private router: Router) {}

  @Input()
  title!: string;
  @Input() editNavPath: any;
  @Input() createNavPath: any;
  @Input()
  keyField!: string;
  @Input()
  gridKey!: string;
  @Input()
  getGridDataApi!: string;
  @Input()
  columnDefs!: ColumnDef[];
  @Input() customizeColumns: any;
  @Input() isReport = false;
  @Input() isEdit = true;
  @Input() paramsForReport: any;
  @Input() reportType: any;
  @Output() transferData = new EventEmitter<any>();
  @Input() hideCreateBtn =false;
  public managementForm!: FormGroup;
  public gridOptions: any;
  public dataSource: any;

  ngOnInit() {
    this.createForm();
    this.bindToDataSource();
  }

  createForm() {
    this.gridManagementForm = this.fb.group({ search: new FormControl('') });
  }

  bindToDataSource() {
    if (this.isReport == true) {
      this.httpService.post(this.getGridDataApi, this.paramsForReport).subscribe(result => {
        if (result) {
          this.dataSource = result;         
        }
      })
    }
    else {
      this.httpService.get(this.getGridDataApi).subscribe(result => {
        if (result) {
          this.dataSource = result;
        }
      })
    }
  }

  onCellDblClick(event: any) {
  }

  onRowDblClick(event: { data: { [x: string]: any; }; }) {
    if(this.isEdit){
    this.router.navigate([`${this.editNavPath}/${event.data[this.keyField]}`]);
    }
  }

  onCreateClick() {
    this.router.navigate([`${this.createNavPath}`]);
  }

  generatePDF(event: any) {
    this.transferData.next(this.dataGrid.instance);
  }

  customizeCaption(data: { value: number; }){
    return ''+data.value.toFixed(2);
  }

  customizeCaptionCredit(data: { value: number; }){
    return ''+data.value.toFixed(2);
  }

  customizeCaptionDebit(data: { value: number; }){
    return ''+data.value.toFixed(2);
  }

  customizeCaptionAmount(data: { value: number; }){
    return ''+data.value.toFixed(2);
  }

  customizeCaptionDocTotal(data: { value: number; }){
    return ''+data.value.toFixed(2);
  }
  customizeNetQuantity(summaryItem: any): string {
    const sumInQty = this.dataSource.reduce((total: any, item: { inQty: any; }) => total + item.inQty, 0);

    const sumOutQty = this.dataSource.reduce((total: any, item: { outQty: any; }) => total + item.outQty, 0);
    const netQuantity = sumInQty - sumOutQty;
    return netQuantity.toFixed(2); // Format the result with two decimal places
  }
}
