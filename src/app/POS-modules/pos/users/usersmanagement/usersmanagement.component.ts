import { Component, OnInit } from '@angular/core';
import { DeleteuserComponent } from '../../adminuser/deleteuser/deleteuser.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import { ToastrService } from 'ngx-toastr';
import { ChangeuserpasswordComponent } from '../../adminuser/changeuserpassword/changeuserpassword.component';

@Component({
  selector: 'app-usersmanagement',
  templateUrl: './usersmanagement.component.html',
  styleUrls: ['./usersmanagement.component.scss']
})
export class UsersmanagementComponent implements OnInit {
  public gridManagementForm!: FormGroup;
  public title: string = 'User Management';
  public getGridDataApi: string = WeftAPIConfig.userService + "/allUsers";
  public editNavPath: string = '/admin/users-edit';
  public createNavPath: string = '/admin/users-create';
  public gridKey: string = 'GRD';
  public keyField: string = "usersId";
  public columnDefs!: any[];
  public bsModalRef!: BsModalRef;
  dataSource: any;
  resourceGetByIdApi: string = WeftAPIConfig.userService + "/";
  logggedInUser: any;
  hideResetBtnFromBranchUser!: boolean;
  passwordChange!: boolean;

  constructor(private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,private toastrService: ToastrService,
    public btn: DxButtonModule, private modalService: BsModalService,
  ) {

  }

  ngOnInit() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this.logggedInUser = userLoggedIn ? JSON.parse(userLoggedIn) : null;
    
    if(this.logggedInUser.info.UserType=='D')
    {
      this.passwordChange=true;
    }
    this.createForm();
    this.bindToDataSource();
  }



  customizeColumns(columns: { allowSorting: boolean; }[]) {
    columns[0].allowSorting = true;
    columns[1].allowSorting = true;
    columns[2].allowSorting = true;
    columns[3].allowSorting = true;
    // columns[5].alignment = "left";
  }

  onCreateClick() {
    this.router.navigate([`${this.createNavPath}`]);
  }

  onRowDblClick(event: { data: { [x: string]: any; isDeleted: boolean; }; }) {
    if (event.data.isDeleted == false) {
      this.router.navigate([`${this.editNavPath}/${event.data[this.keyField]}`]);
    }
    else {
      this.toastrService.success('Already Deleted');
    }
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
  onChangeDeleteClick1(event: any, cellInfo: any){
    this.toastrService.success('Already Deleted');
  }
  onChangeDeleteClick(event: any, cellInfo: { data: { usersId: any; }; }) {
    this.bsModalRef = this.modalService.show(DeleteuserComponent, {
      initialState: {
        id: cellInfo.data.usersId,
      }, class: 'modal-dialog-centered delete-modal'
    });
    this.bsModalRef.content.userDeleted.subscribe(() => {
      this.refreshData();
    });
  }
  refreshData() {
    this.bindToDataSource();
  }
  onChangePassword(event: any,cellInfo: { data: { iUserId: any; }; }){
    this.bsModalRef = this.modalService.show(ChangeuserpasswordComponent, {
      initialState: {
        iuserId: cellInfo.data.iUserId,
        admin:false,
      }, class: 'modal-dialog-centered change-password-modal'
    });
    // this.bsModalRef.content.userDeleted.subscribe(() => {
    //   this.refreshData();
    // });
  }
}
