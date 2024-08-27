import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-termsandconditions-create',
  templateUrl: './termsandconditions-create.component.html',
  styleUrls: ['./termsandconditions-create.component.scss']
})
export class TermsandconditionsCreateComponent implements OnInit {
  @ViewChild('logoPicker', { static: false })
  logoPicker!: ElementRef<HTMLInputElement>;

  public resourceForm: FormGroup = new FormGroup({});

  submitted: boolean = false;
  editted: boolean = false;
  thumbnailPopup = false;
  resourceUploadApi:string = WeftAPIConfig.aboutUsService+"/upload";
 resourceGetApi : string = WeftAPIConfig.termsAndConditionsService+"/allTermsAndCondition";
  resourceGetByIdApi: string = WeftAPIConfig.termsAndConditionsService + "/";
  resourceCreateApi: string = WeftAPIConfig.termsAndConditionsService;
  resourceUpdateApi: string = WeftAPIConfig.termsAndConditionsService;
  inspectionTypeServiceApi : string = WeftAPIConfig.termsAndConditionsService;

  resourceKey: string = 'termsAndConditionsId';
  resourceKeyValue!: number;
  resourceName: string = 'TermsAndConditions';
 
  logggedInUser: any;
  readOnlyUserName: boolean = false;
  hideSubmitFromBranchUser!: boolean;
  imgExtensionWrong!: boolean;
  inspectionTypes: any=[];
  termsAndConditions: any;
  

  constructor(private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService) {
  
  }

  async ngOnInit() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this.logggedInUser = userLoggedIn ? JSON.parse(userLoggedIn) : null;
    await this.getTermsAndConditions();
    
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
      } else if (ext.toLowerCase() == 'xlsx') {
        this.imgExtensionWrong = true;
        return false;
      } else {
        this.imgExtensionWrong = false;
      }
  
      result.append('media', media.files[0], fileName);
      result.append('path', "Images/PrivacyPolicy");
  
      this.httpService.post(this.resourceUploadApi, result)
        .subscribe((x) => {
          this.resourceForm.controls["banner"].setValue(x.path);
        });
  
      return true; // Indicating the upload process was initiated
    }
  
    return false; // In case no files were selected
  }
  
 async getTermsAndConditions() {
   return await (this.httpService.get(this.resourceGetApi)).toPromise().then(result => {
      if (result) {
        this.termsAndConditions = result;
        if(this.termsAndConditions!=null && this.termsAndConditions.length>0)
        {
          this.termsAndConditions.forEach((pp: { termsAndConditionsId: number; }) => {
            this.resourceKeyValue = pp.termsAndConditionsId;
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
    
      this.resourceForm = this.fb.group({
        termsAndConditionsId: new FormControl(null),
        title: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(100)])),
        banner:new FormControl("", Validators.compose([Validators.required])),
        description: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(100)])),
        createdBy: new FormControl(null),
        status: new FormControl(true),
      });
    
  }
  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        termsAndConditionsId: new FormControl({ value: x["termsAndConditionsId"], disabled: false }, Validators.compose([Validators.required])),
        title: new FormControl({ value: x["title"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(100)])),
        banner: new FormControl({ value: x["banner"], disabled: false }, Validators.compose([Validators.required])),
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

  onSubmit() {
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
    dataToPost['createdBy'] = this.logggedInUser.sub;
    dataToPost['lastModifiedBy'] ="";
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
          this.toastrService.success('Privacy Policy Updated Successfully', 'Success');
          this.getTermsAndConditions();
          // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
      else {
        dataToPost['termsAndConditionsId'] =0;
        this.resourceForm.reset();
        this.httpService.post(this.resourceCreateApi, dataToPost).subscribe((x) => {
          if(x.statusCode == 500){
            this.toastrService.error(x.message, 'Fail');
          }
          else{
            this.resourceForm.reset();
            this.toastrService.success('Privacy Policy Created Successfully', 'Success');
            this.getTermsAndConditions();
            // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }         
        });
      }
    }
  }

 async cancel() {
    this.submitted = false;
    this.resourceForm.reset();
    await this.getTermsAndConditions();
    // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
  }

  changeTextToUppercase(field: string): void {
    const obj: { [key: string]: any } = {};
    obj[field] = this.resourceForm.controls[field].value.toUpperCase();
    this.resourceForm.patchValue(obj);
  }
}


