import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-qrcodemanagement',
  templateUrl: './qrcodemanagement.component.html',
  styleUrls: ['./qrcodemanagement.component.scss']
})
export class QrcodemanagementComponent implements OnInit {
  public gridManagementForm!: FormGroup;
  public title: string = 'Qr Code Management';
  public getGridDataApi: string = WeftAPIConfig.qrCodeService;
  public createNavPath: string = '/admin/qrCode-create';
  public gridKey: string = 'GRD';
  public keyField: string = "qrCodeId";
  public columnDefs: any[];
  public dataSource!: any[];
  
  constructor( private fb: FormBuilder,private httpService: WeftHttpService,private router: Router,private toastrService: ToastrService) {
    this.columnDefs = [
    {dataField : 'siteName',caption : 'Site Name'},
    { dataField : 'qrCodeData', caption : 'Qr Data'}, 
    { dataField : 'statusName', caption : 'Status'}];
  }

  ngOnInit() {
    this.createForm();
    this.bindToDataSource();
  }

  createForm() {
    this.gridManagementForm = this.fb.group({ search: new FormControl('') });
  }

  bindToDataSource() {
    this.httpService.get(this.getGridDataApi).subscribe(result => {
      if (result) {
        this.dataSource = result;
      }
    })
  }

  customizeColumns(columns: any) {
   
  }
  onCreateClick(){
    this.router.navigate([`${this.createNavPath}`]);
  }
 
  onChangeDeleteClick(data: any,event: { data: { qrCodeId: string; }; }){
    console.log(event)
    this.httpService.delete(WeftAPIConfig.qrCodeService+'/qrDelete/'+ event.data.qrCodeId).subscribe((x) => {
      console.log(x)
      if (x.statusCode==200) {
       this.toastrService.success('Qr Code Deleted Successfully', 'Success');
       this.bindToDataSource();
      }
    else if(x.statusCode==400){
      this.toastrService.warning(x.message);
    }
    else{
      this.toastrService.error(x.message);
    }
  })
  }
}
