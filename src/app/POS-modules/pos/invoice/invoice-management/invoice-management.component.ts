import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import { ViewinvoiceComponent } from '../viewinvoice/viewinvoice.component';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-invoice-management',
  templateUrl: './invoice-management.component.html',
  styleUrls: ['./invoice-management.component.scss']
})
export class InvoiceManagementComponent implements OnInit {
  public gridManagementForm!: FormGroup;
  public title: string = 'Invoice Management';
  public getGridDataApi: string = WeftAPIConfig.invoiceService + '/managementScreen';
  public editNavPath: string = '/admin/category-edit';
  public createNavPath: string = '/admin/invoice-create';
  public gridKey: string = 'GRD';
  public keyField: string = "categoryId";
  public columnDefs: any[];
  public isReport: boolean = true;
  public bsModalRef!: BsModalRef;
  public hideCreateBtn: boolean = true;
  dataSource: any;
  sites!: any[];
  getPrintNavPath: string = '/admin/printinvoice';
  loggedInUser: any;
  constructor(private fb: FormBuilder, private httpService: WeftHttpService, private modalService: BsModalService, private router: Router) {
    this.columnDefs = [
      { dataField: 'invoiceNumber', caption: 'Invoice Number' },
      { dataField: 'invoiceDate', caption: 'Invoice Date', dataType: 'date' },
      { dataField: 'invoiceTime', caption: 'Invoice Time', dataType: 'datetime' },
      { dataField: 'grandTotal', caption: 'Amount' },
      { dataField: 'statusName', caption: 'Status' }];
  }

  ngOnInit() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this.loggedInUser = userLoggedIn ? JSON.parse(userLoggedIn) : null;
    this.createForm();
    this.getSites()
    this.bindToDataSource();
  }
  bindToDataSource() {
    let data = {
      dateFrom: this.gridManagementForm.controls['dateFrom'].value,
      dateTo: this.gridManagementForm.controls['dateTo'].value,
      siteSettingsId: this.gridManagementForm.controls['siteSettingsId'].value,
    }
    console.log(this.getGridDataApi)
    this.httpService.post(this.getGridDataApi, data).subscribe(result => {
      if (result) {
        this.dataSource = result;
      }
    })
  }

  get f() { return this.gridManagementForm.controls; }
  getSites() {
    this.httpService.get(WeftAPIConfig.siteSettings).subscribe(res => {
      const filteredSites = res.filter((s: { status: boolean; }) => s.status == true);
      const sortedSites = filteredSites.sort((a: { siteName: number; }, b: { siteName: number; }) => (a.siteName > b.siteName) ? 1 : -1);
      // Create a default site option
      const defaultSite = { siteSettingId: 0, siteName: 'All' }; // Modify the properties accordingly

      // Add the default site to the beginning of the array
      this.sites = [defaultSite, ...sortedSites];

    })
  }
  customizeColumns(columns: any) {

  }
  onView(event: any, cellInfo: { data: { invoiceId: any; }; }) {
    this.bsModalRef = this.modalService.show(ViewinvoiceComponent, {
      initialState: {
        id: cellInfo.data.invoiceId,
      }, class: 'modal-dialog-centered modal-lg view-invoice-modal'
    });
  }
  onPrint(event: any, cellInfo: { data: { invoiceId: any; }; }) {
    this.router.navigate([`${this.getPrintNavPath}/${cellInfo.data.invoiceId
      }`]);
  }
  createForm() {
    this.gridManagementForm = this.fb.group({
      search: new FormControl(''),
      dateFrom: new FormControl(moment().startOf('month').format('YYYY-MM-DD')),
      dateTo: new FormControl(moment().format("YYYY-MM-DD")),
      siteSettingsId: new FormControl(0)
    })
  }

  cancel() {
    this.createForm()
    this.bindToDataSource()
  }
  onSubmit() {
    this.bindToDataSource()

  }
  onCreateClick() {
    this.router.navigate([`${this.createNavPath}`]);
  }
}
