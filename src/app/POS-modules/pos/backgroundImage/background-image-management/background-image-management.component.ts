import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-background-image-management',
  templateUrl: './background-image-management.component.html',
  styleUrls: ['./background-image-management.component.scss']
})
export class BackgroundImageManagementComponent implements OnInit {
  public gridManagementForm!: FormGroup;
  public title: string = 'Background Image Management';
  public getGridDataApi: string = WeftAPIConfig.backgroundImage;
  public editNavPath: string = '/admin/backgroundImage-edit';
  public createNavPath: string = '/admin/backgroundImage-create';
  public gridKey: string = 'GRD';
  public keyField: string = "backgroundImageId";
  public columnDefs!: any[];
  dataSource: any;
  logggedInUser: any;
  hideResetBtnFromBranchUser!: boolean;

  constructor(private httpService: WeftHttpService, private toastrService: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    
  ) {

  }

  ngOnInit() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this.logggedInUser = userLoggedIn ? JSON.parse(userLoggedIn) : null;
    
    this.createForm();
    this.bindToDataSource();
  }



  customizeColumns(columns: any) {
    // columns[0].allowSorting = true;
    // columns[1].allowSorting = true;
    // columns[2].allowSorting = true;
    // columns[3].allowSorting = true;
    // columns[5].alignment = "left";
  }

  onCreateClick() {
    this.router.navigate([`${this.createNavPath}`]);
  }

  onRowDblClick(event: { data: { [x: string]: any; }; }) {
   
      this.router.navigate([`${this.editNavPath}/${event.data[this.keyField]}`]);
   
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

 
  refreshData() {
    this.bindToDataSource();
  }
  onChangeDeleteClick1(event: any, cellInfo: any) {
    this.toastrService.success('Already Deleted');
  }
 
}
