import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-groupacess',
  templateUrl: './groupacess.component.html',
  styleUrls: ['./groupacess.component.scss']
})
export class GroupacessComponent implements OnInit {
  public resourceForm!: FormGroup;
  logggedInUser: any;
  resourceKeyValue!: number;
  resourceGetByIdApi: string = WeftAPIConfig.groupAccessService + "/";
  resourceExist: string = WeftAPIConfig.groupAccessService + "/" + "/isexist";
  resourceCreateApi: string = WeftAPIConfig.groupAccessService;
  resourceUpdateApi: string = WeftAPIConfig.groupAccessService;
  submitted!: boolean;
  resourceName: string = "Group Access";
  resourceManagementNavPath: string = '/admin/groupaccess-create';
  resourceKey: string = 'groupAccessId';
  groupTypes: { groupId: number; name: string; }[];
  menuTypes: { menuId: number; name: string; }[];
  MenuListData: any;
  getMenuListtApi: string = WeftAPIConfig.menuListService;
  getGroupAccessApi: string = WeftAPIConfig.groupAccessService;
  settupData: any = [];

  public menu: any;
  invoiceFlag: boolean = false;
  settupFlag: boolean = false;
  packageFlag: boolean = false;
  stockFlag: boolean = false;
  accountsFlag: boolean = false;
  reportsFlag: boolean = false;
  trackingFlag: boolean = false;
  crmFlag: boolean = false;
  invoiceData: any = [];
  packageData: any = [];
  stockData: any = [];
  accountsData: any = [];
  reportsData: any = [];
  trackingData: any = [];
  crmData: any = [];
  form: FormGroup;
  ArrayValue: any = [];
  i!: number;
  menudata: any;
  subMenuData: any;
  menuData!: boolean;
  groupData: any;
  listDataArray: any = [];
  selectedCheckboxes: any = [];
  selectedCheck: any = [];
  public selectedSubmenus: any = [];
  flag!: boolean;
  subMenuIdFromSettupData: any = [];
  groupServiceApi: string = WeftAPIConfig.groupAccessService + "/groupId";
  groupResult: any;
  groupId: any;
  final: any;
  submenusFromSettup: any;
  settupDatas: any;
  newArray: Array<any> = [];
  internationalCargoFlag!: boolean;
  internationalCargoData: any;
  arrayForSubmenu: any = [];
  selectedTrueFromNewArray!: any[];
  //arrayMaped: Array<number> = [];
  arrayMaped: any = [];
  arrayMape: any = [];
  parse!: number;
  arrayMapedFinal!: number[];
  public group: any;
  approvalFlag!: boolean;
  menuCount: any = [];
  falseCheckArray: any = [];
  trueCheckArray: any=[];
  seaCargoFlag!: boolean;
  domesticFlag!: boolean;
  courierFlag!: boolean;
  usersFlag!: boolean;
  categoryFlag!: boolean;
  productFlag!: boolean;
  settingsFlag!: boolean;
  bannerFlag!: boolean;
  aboutusFlag!: boolean;
  contactusFlag!: boolean;
  privacyPolicyFlag!: boolean;
  userGuidanceFlag!: boolean;
  termsandconditionsFlag!: boolean;
  editing!: boolean;
  cms!: boolean;
  constructor(private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService
  ) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
    this.groupTypes = [
      { groupId: 1, name: 'Super Admin' },
       { groupId: 2, name: 'Admin' },
      { groupId: 3, name: 'Site Manager' },
    ];
    this.menuTypes = [
      { menuId: 1, name: 'Users' },
      { menuId: 2, name: 'Settings' },
      { menuId: 4, name: 'Product Settings' },
      { menuId: 3, name: 'Invoice' },
      { menuId: 5, name: 'Reports' },
      { menuId: 6, name: 'Editing' },
      { menuId: 7, name: 'CMS Settings' },
    ];
  }


  ngOnInit() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this.logggedInUser = userLoggedIn ? JSON.parse(userLoggedIn) : null;
    
    if (this.route.snapshot.paramMap.get(this.resourceKey)) {
      this.route.paramMap.subscribe((params) => {
        this.resourceKeyValue = Number(params.get(this.resourceKey));
      });
    }
  //  this.selectionFromDb();

    this.createForm();
    this.getMenuListData();

  }

  get f() { return this.resourceForm.controls; }

  createForm() {
    if (this.resourceKeyValue > 0) {
      this.getResourceById();
    }
    else {
      this.resourceForm = this.fb.group({
        groupId: new FormControl(null, Validators.required),
        menuId: new FormControl(null, Validators.required),
      });
    }
  }

  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      this.resourceForm = this.fb.group({
        groupId: new FormControl({ value: x["groupId"], disabled: false }, Validators.required),
        menuId: new FormControl({ value: x["menuId"], disabled: false }, Validators.required),
      });
    })
  }

  onChangeGroup(event: any) {
    this.group = this.resourceForm.controls['groupId'].value;
    if (typeof event === 'undefined') {
        // Handle the case where event is undefined
        this.resourceForm.controls['menuId'].setValue(null);
        this.newArray = []; // Assign an empty array
    }
}


  onChangeMenu(event: any) {
    //console.log(this.group)
    if(this.group !=null){
    this.menu = this.resourceForm.controls['menuId'].value;
    this.getMenuListData();
    this.selectionFromDb();

    this.httpService.get(this.getGroupAccessApi).subscribe(result => {
      if (result) {
        this.selectedCheckboxes = result;
        this.selectedCheck = this.selectedCheckboxes.filter((s: { menuId: any; groupId: any; }) => s.menuId == this.menu && s.groupId == this.group)
        this.selectedSubmenus = this.selectedCheck.map((s: { subMenuId: any; }) => s.subMenuId);
      }
      this.arrayMaped = this.selectedSubmenus;
    })
  }else{
    this.toastrService.warning("Please Select Group")
    this.resourceForm.controls['menuId'].setValue(null);
  }

  }

  getMenuListData() {
    this.httpService.get(this.getMenuListtApi).subscribe(result => {
      if (result) {
        this.MenuListData = result;
        if (this.menu == 1) {
          this.usersFlag = true;
          this.settingsFlag = false;
          this.productFlag = false;
          this.invoiceFlag = false;
          this.reportsFlag = false;
        }
        else if (this.menu == 2) {
          this.usersFlag = false;
          this.settingsFlag = true;
          this.productFlag = false;
          this.invoiceFlag = false;
          this.reportsFlag = false;
        }
        else if (this.menu == 4) {
          this.usersFlag = false;
          this.settingsFlag = false;
          this.productFlag = true;
          this.invoiceFlag = false;
          this.reportsFlag = false;
        }
        else if (this.menu == 3) {
          this.usersFlag = false;
          this.settingsFlag = false;
          this.productFlag = false;
          this.invoiceFlag = true;
          this.reportsFlag = false;
        }
        else if (this.menu == 5) {
          this.usersFlag = false;
          this.categoryFlag = false;
          this.productFlag = false;
          this.invoiceFlag = false;
          this.reportsFlag = true;
        }

        else if (this.menu == 6) {
          this.usersFlag = false;
          this.categoryFlag = false;
          this.productFlag = false;
          this.invoiceFlag = false;
          this.reportsFlag = false;
          this.editing=true;
          this.cms=false;
        }
        else if (this.menu == 7) {
          this.usersFlag = false;
          this.categoryFlag = false;
          this.productFlag = false;
          this.invoiceFlag = false;
          this.reportsFlag = false;
          this.editing=false;
          this.cms=true;
        }
         
      }
    })
  }

  onCheckboxChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    const value = parseInt(inputElement.value);
  
    if (inputElement.checked) {
      checkArray.push(new FormControl(value));
      this.trueCheckArray.push(value);
    } else {
      // Remove the value from checkArray
      const index = checkArray.controls.findIndex((ctrl) => ctrl.value === value);
      if (index >= 0) {
        checkArray.removeAt(index);
      }
  
      this.falseCheckArray.push(value);
  
      // Remove the value from trueCheckArray and arrayMaped with type declaration
      this.trueCheckArray = this.trueCheckArray.filter((element: number) => element !== value);
      this.arrayMaped = this.arrayMaped.filter((element: number) => element !== value);
    }
  
    // Concatenate the arrays for the final result
    this.ArrayValue = [...this.arrayMaped, ...this.trueCheckArray];
  }
  


  selectionFromDb() {
    this.httpService.get(this.getGroupAccessApi).subscribe(result => {
      if (result) {
        this.selectedCheckboxes = result;
        this.selectedCheck = this.selectedCheckboxes.filter((s: { menuId: any; groupId: any; }) => s.menuId == this.menu && s.groupId == this.group)
        this.selectedSubmenus = this.selectedCheck.map((s: { subMenuId: any; }) => s.subMenuId);
        if (this.selectedSubmenus.length == null) {
          this.flag = false;
        }
        else {
          this.flag = true;
          this.arrayCheck();
        }
      }
    })
  }

  arrayCheck() {
    this.newArray = [];
    this.getMenuListData();
    this.settupDatas = this.MenuListData.filter((s: { menuId: any; }) => s.menuId == this.menu)
    this.submenusFromSettup = this.settupDatas.map((s: { subMenuId: any; }) => s.subMenuId);

    for (var i = 0; i < this.settupDatas.length; i++) {
      var ismatch = false;
      for (var j = 0; j < this.selectedCheck.length; j++) {
        if (this.settupDatas[i].subMenuId == this.selectedCheck[j].subMenuId) {
          ismatch = true;
          this.settupDatas[i].checked = true;
          this.newArray.push(this.settupDatas[i]);
          break;
        }
      }
      if (!ismatch) {
        this.settupDatas[i].checked = false;
        this.newArray.push(this.settupDatas[i]);

      }
    }

  }

  onSubmit() {
    this.submitted = true;
    if (this.ArrayValue.value == 0) {
      alert("please select any of the item")
      this.resourceForm.invalid;
      return;
    }
    else {

    }

    this.menuCount = this.MenuListData.filter((s: { menuId: any; }) => s.menuId == this.menu);
    if (this.menuCount.length == 1 && this.falseCheckArray.length > 0) {

    }
    else if (this.falseCheckArray.length > 0 && this.ArrayValue.length == 0) {

    }
    else {
      if (this.ArrayValue.length == 0) {
        alert("please Do any Action")
        this.resourceForm.invalid;
        return;
      }
      else {

      }
    }

    const dataToPost = this.resourceForm.value;
    dataToPost['subMenuId'] = this.ArrayValue;
    dataToPost['createdBy'] = this.logggedInUser.sub;
    if (this.resourceForm.invalid) {
      return;
    }
    else {
      if (this.resourceKeyValue > 0) {
        dataToPost[this.resourceKey] = this.resourceKeyValue;
        this.httpService.put(this.resourceUpdateApi, dataToPost).subscribe((x) => {
          this.toastrService.success(this.resourceName + ' updated successfully', 'Success');
          this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
        });
      }
      else {
        this.httpService.post(this.resourceCreateApi, dataToPost).subscribe((res) => {
          this.resourceForm.reset();
          this.toastrService.success(this.resourceName + ' created successfully', 'Success');
          this.resourceForm.reset();
          this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          this.reset();
        });
      }
    }
    this.submitted = false;
  }

  reset() {
    this.resourceForm.reset();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  cancel() {
    this.submitted = false;
    this.resourceForm.reset();
    this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
    let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }
}
