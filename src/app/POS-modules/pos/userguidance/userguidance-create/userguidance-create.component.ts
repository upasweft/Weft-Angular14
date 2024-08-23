import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-userguidance-create',
  templateUrl: './userguidance-create.component.html',
  styleUrls: ['./userguidance-create.component.scss']
})
export class UserguidanceCreateComponent implements OnInit {
  @ViewChild('logoPicker', { static: false}) logoPicker;
  public resourceForm: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
 resourceGetApi : string = WeftAPIConfig.userGuidanceService+"/allUserGuidance";
  resourceGetByIdApi: string = WeftAPIConfig.userGuidanceService + "/";
  resourceCreateApi: string = WeftAPIConfig.userGuidanceService;
  resourceUpdateApi: string = WeftAPIConfig.userGuidanceService;
  inspectionTypeServiceApi : string = WeftAPIConfig.userGuidanceService;
  thumbnailPopup = false;
  resourceUploadApi:string = WeftAPIConfig.aboutUsService+"/upload";
  resourceKey: string = 'userGuidanceId';
  resourceKeyValue: number;
  resourceName: string = 'UserGuidance';
  resourceManagementNavPath: string = "/admin/userGuidance";
  logggedInUser: any;
  readOnlyUserName: boolean = false;
  hideSubmitFromBranchUser: boolean;
  imgExtensionWrong: boolean;
  inspectionTypes: any=[];
  userGuidance: any;
  

  constructor(private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService) {
  
  }

  async ngOnInit() {
    this.logggedInUser = JSON.parse(localStorage.getItem('userLoggedIn'));
    //await this.getUserGuidance();
    if (this.route.snapshot.paramMap.get(this.resourceKey)) {
      this.route.paramMap.subscribe((params) => {
        this.resourceKeyValue = Number(params.get(this.resourceKey));
      });
    }
  
    this.createForm();
   // this.adminOnlyEdit();
    // this.getCountries();
  }
  upload() {
    // debugger;
    const result = new FormData();
    const media = this.logoPicker.nativeElement;
    var currentTimeInMilliseconds = Date.now();

    if (media.files && media.files[0]) {
      let fileName = media.files[0].name.split(" ").join("-");
      fileName = currentTimeInMilliseconds.toString().concat("_", fileName);
      var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'pdf') {
        this.imgExtensionWrong = true;
        return false;
      }
      else if (ext.toLowerCase() == 'xlsx') {
        this.imgExtensionWrong = true;
        return false;
      }
      else {
        this.imgExtensionWrong = false;
      }
      result.append('media', media.files[0], fileName);
      result.append('path', "Images/UserGuidance");

      this.httpService.post(this.resourceUploadApi, result)
        .subscribe((x) => {
          this.resourceForm.controls["image"].setValue(x.path);
        });
    }
  }
 async getUserGuidance() {
    debugger;
   return await (this.httpService.get(this.resourceGetApi)).toPromise().then(result => {
      if (result) {
        this.userGuidance = result;
        if(this.userGuidance!=null && this.userGuidance.length>0)
        {
          this.userGuidance.forEach(pp => {
            this.resourceKeyValue = pp.userGuidanceId;
          });
        }
        if (this.resourceKeyValue > 0) {
          this.getResourceById();
        }
        else{
          this.createForm();
        }
      }
    })
   
  }
  get f() { return this.resourceForm.controls; }

  createForm() {
    if (this.resourceKeyValue > 0) {
      this.getResourceById();
    }
    else {
      this.resourceForm = this.fb.group({
        userGuidanceId: new FormControl(null),
        toolName: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(100)])),
        image:new FormControl("", Validators.compose([Validators.required])),
        description: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(100)])),
        createdBy: new FormControl(null),
        status: new FormControl(true),
      });
    }
    
  }
  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      console.log(x)
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        userGuidanceId: new FormControl({ value: x["userGuidanceId"], disabled: false }, Validators.compose([Validators.required])),
        toolName: new FormControl({ value: x["toolName"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(100)])),
        image: new FormControl({ value: x["image"], disabled: false }, Validators.compose([Validators.required])),
        description: new FormControl({ value: x["description"], disabled: false }, Validators.compose([Validators.required])),
        status: new FormControl({ value: x["status"] },),
        lastModifiedBy: new FormControl(this.logggedInUser.sub),
      });
      if (x['status'] == false){
        this.resourceForm.controls['status'].setValue(false);
      }
      else{
        this.resourceForm.controls['status'].setValue(true);
      }
     
    })
   
  }
//  onChangeInspectionType(event: any) {
//       this.resourceForm.controls['inspectionTypeId'].setValue(event.inspectionTypeId);
//  }
//   get f() { return this.resourceForm.controls; }

//   adminOnlyEdit() {
//     if (this.logggedInUser.UserType != 'A' && this.logggedInUser.UserType != 'E' && this.resourceKeyValue > 0) {
//       this.hideSubmitFromBranchUser = true;
//     }
//     else {
//       this.hideSubmitFromBranchUser = false;
//     }
//   }


  onSubmit() {
     debugger;
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
    dataToPost['createdBy'] = this.logggedInUser.sub;
    dataToPost['lastModifiedBy'] ="";
    
  console.log(dataToPost)
    if (this.resourceForm.invalid) {
      return;
    }
    else {
      this.submitted = false;
      if (this.resourceKeyValue > 0) {
        dataToPost[this.resourceKey] = this.resourceKeyValue;
        dataToPost['lastModifiedBy'] = this.logggedInUser.sub;
        this.resourceForm.reset();
        this.httpService.put(this.resourceUpdateApi, dataToPost).subscribe((x) => {
          if(x.statusCode == 500){
            this.toastrService.error(x.message, 'Fail');
          }
          else{
          this.toastrService.success('User Guidance Updated Successfully', 'Success');
          this.getUserGuidance();
           this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
      else {
        dataToPost['userGuidanceId'] =0;
        this.resourceForm.reset();
        this.httpService.post(this.resourceCreateApi, dataToPost).subscribe((x) => {
          if(x.statusCode == 500){
            this.toastrService.error(x.message, 'Fail');
          }
          else{
            this.resourceForm.reset();
            this.toastrService.success('User Guidance Created Successfully', 'Success');
            this.getUserGuidance();
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

  changeTextToUppercase(field) {
    const obj = {};
    obj[field] = this.resourceForm.controls[field].value.toUpperCase();
    this.resourceForm.patchValue(obj);
  }
}

