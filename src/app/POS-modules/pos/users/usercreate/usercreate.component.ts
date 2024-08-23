import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.scss']
})
export class UsercreateComponent implements OnInit {
  public resourceForm!: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
  resourceGetByIdApi: string = WeftAPIConfig.userService + "/";
  createApi: string = WeftAPIConfig.userService;
  updateUserApi: string = WeftAPIConfig.userService;
  resourceKey: string = 'usersId';
  resourceKeyValue!: number;
  defaultCountryId!: number;
  defaultStateId!: number;
  defaultCountyId!: number;
  defaultFilterParam: any;
  resourceName: string = 'Users';
  resourceManagementNavPath: string = "/admin/users-management";


  User: any;
  UserRole: any;
  logggedInUser: any;


  userTypes: { id: string; name: string; }[];
  sites: any;
  isGreen: boolean=false;
  invoice!: boolean;

  constructor(private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService) {
    this.userTypes = [
      { id: 'C', name: "Cameraman" },
      { id: 'S', name: "Site Manager" },
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
    this.createForm();
    this.getSites();
  }
  createForm() {
    if (this.resourceKeyValue > 0) {
      this.getResourceById();
    }
    else {
      this.resourceForm = this.fb.group({
        name: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(150)])),
        email: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"), Validators.email])),
        phone: new FormControl("", Validators.compose([Validators.required,Validators.minLength(13), Validators.maxLength(13), Validators.pattern("^[0-9,+]*$")])),
        password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}")])),
        createdBy: new FormControl(null),
        iUserId: new FormControl(null),
        isGreenScreen:new FormControl(true),
        isAutoUpload:new FormControl(true),
        status: new FormControl(true),
        siteSettingId:new FormControl(null,Validators.required),
        userType: new FormControl(null, Validators.required),
        prefix:new FormControl(null,Validators.maxLength(2)),

      });
      this.User = {
        username: "", password: "", email: "", phone: "", userType: "",
        userRole: { id: "", name: "", roleVale: 0 }
      }
    }
  }
  getSites() {
    this.httpService.get(WeftAPIConfig.siteSettings).subscribe(res => {
      this.sites = res.filter((s: { status: boolean; }) => s.status == true)
      this.sites.sort((a: { siteName: number; }, b: { siteName: number; }) => (a.siteName > b.siteName) ? 1 : -1);
    })
  }
  onSiteSelect(event: { siteSettingId: any; }) {
    this.resourceForm.controls['siteSettingId'].setValue(event.siteSettingId)
  }
  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        name: new FormControl({ value: x["name"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(150)])),
        phone: new FormControl({ value: x["phone"], disabled: false }, Validators.compose([Validators.minLength(10), Validators.maxLength(13), Validators.pattern("^[0-9,+]*$")])),
        email: new FormControl({ value: x["email"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"), Validators.email])),
        iUserId: new FormControl({ value: x["iUserId"], disabled: false }),
        password: new FormControl({ value: x["password"], disabled: true }, Validators.compose([Validators.minLength(8), Validators.maxLength(10)])),
        status: new FormControl({ value: x["status"] },),
        lastModifiedBy: new FormControl(this.logggedInUser.info.sub),
        siteSettingId:new FormControl({ value: x["siteSettingId"],disabled: false },Validators.required),
        userType: new FormControl({ value: x["userType"], disabled: false }, Validators.required),
        isGreenScreen: new FormControl(x["isGreenScreen"]),
        isAutoUpload:new FormControl(x["isAutoUpload"]),
        prefix:new FormControl({ value: x["prefix"], disabled: false }, Validators.maxLength(2)),
      });
      if (x['status'] == false) {
        this.resourceForm.controls['status'].setValue(false);
      }
      else {
        this.resourceForm.controls['status'].setValue(true);
      }
      // if (x['isGreenScreen'] == false) {
      //   this.resourceForm.controls['isGreenScreen'].setValue(false);
      // }
      // else {
      //   this.resourceForm.controls['isGreenScreen'].setValue(true);
      // }
      if (x['userType'] == 'C') {
        this.isGreen = true;
      }
      else {
        this.isGreen = false;
      }
      if(x['already'] == true)
        {
          this.invoice = true
        }
        else{
          this.invoice = false
        }

    })
  }
  onUserTypeSelect(event: { name: string; }) {
    if(event.name =='Cameraman')
    {
      this.isGreen= true;
    }
    else{
      this.isGreen= false;
    }
  }
  get f() { return this.resourceForm.controls; }
  onSubmit() {
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
    dataToPost['createdBy'] = this.logggedInUser.info.sub;
    dataToPost['userRole'] = {
      id: "",
      name: "user",
      roleValue: 2
    }
    if (this.resourceForm.invalid) {
      return;
    }
    else {
      this.submitted = false;
      if (this.resourceKeyValue > 0) {
        dataToPost[this.resourceKey] = this.resourceKeyValue;
        dataToPost['password'] = this.resourceForm.controls['password'].value;
        this.resourceForm.reset();
        this.httpService.put(this.updateUserApi, dataToPost).subscribe((x) => {
          if (x.statusCode == 500) {
            this.toastrService.error(x.message, 'Fail');
          }
          else {
            this.toastrService.success('User Updated Successfully', 'Success');
            this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
      else {
        this.resourceForm.reset();
        this.httpService.post(this.createApi, dataToPost).subscribe((x) => {
          if (x.statusCode == 500) {
            this.toastrService.error(x.message, 'Fail');
            this.createForm()
          }
          else {
            this.resourceForm.reset();
            this.toastrService.success('User Created Successfully', 'Success');
            this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
    }
  }

  cancel() {
    this.submitted = false;
    this.resourceForm.reset();
    this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
  }

  changeTextToUppercase(field: string): void {
    const obj: { [key: string]: any } = {};
    obj[field] = this.resourceForm.controls[field].value.toUpperCase();
    this.resourceForm.patchValue(obj);
  }
  
}
