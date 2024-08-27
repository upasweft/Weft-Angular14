import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-privacypolicy-create',
  templateUrl: './privacypolicy-create.component.html',
  styleUrls: ['./privacypolicy-create.component.scss']
})
export class PrivacypolicyCreateComponent implements OnInit {
  @ViewChild('logoPicker', { static: false })
  logoPicker!: { nativeElement: any; };
  public resourceForm!: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
  thumbnailPopup = false;
  resourceUploadApi:string = WeftAPIConfig.aboutUsService+"/upload";
 resourceGetApi : string = WeftAPIConfig.privacyPolicyService+"/allPrivacyPolicy";
  resourceGetByIdApi: string = WeftAPIConfig.privacyPolicyService + "/";
  resourceCreateApi: string = WeftAPIConfig.privacyPolicyService;
  resourceUpdateApi: string = WeftAPIConfig.privacyPolicyService;
  inspectionTypeServiceApi : string = WeftAPIConfig.privacyPolicyService;

  resourceKey: string = 'privacyPolicyId';
  resourceKeyValue!: number;
  resourceName: string = 'PrivacyPolicy';
 
  logggedInUser: any;
  readOnlyUserName: boolean = false;
  hideSubmitFromBranchUser!: boolean;
  imgExtensionWrong!: boolean;
  inspectionTypes: any=[];
  privacyPolicy: any;
  

  constructor(private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService) {
  
  }

  async ngOnInit() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this.logggedInUser = userLoggedIn ? JSON.parse(userLoggedIn) : null;
    await this.getPrivacyPolicy();
  }
 async getPrivacyPolicy() {
   return await (this.httpService.get(this.resourceGetApi)).toPromise().then(result => {
      if (result) {
        this.privacyPolicy = result;
        if(this.privacyPolicy!=null && this.privacyPolicy.length>0)
        {
          this.privacyPolicy.forEach((pp: { privacyPolicyId: number; }) => {
            this.resourceKeyValue = pp.privacyPolicyId;
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
        privacyPolicyId: new FormControl(null),
        title: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(100)])),
        banner:new FormControl("", Validators.compose([Validators.required])),
        description: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(100)])),
        createdBy: new FormControl(null),
        status: new FormControl(true),
      });
    
  }
  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      console.log(x)
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        privacyPolicyId: new FormControl({ value: x["privacyPolicyId"], disabled: false }, Validators.compose([Validators.required])),
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
          this.getPrivacyPolicy();
          // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
      else {
        dataToPost['privacyPolicyId'] =0;
        this.resourceForm.reset();
        this.httpService.post(this.resourceCreateApi, dataToPost).subscribe((x) => {
          if(x.statusCode == 500){
            this.toastrService.error(x.message, 'Fail');
          }
          else{
            this.resourceForm.reset();
            this.toastrService.success('Privacy Policy Created Successfully', 'Success');
            this.getPrivacyPolicy();
            // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }         
        });
      }
    }
  }
  upload(): void {
    const result = new FormData();
    const media = this.logoPicker.nativeElement;
    var currentTimeInMilliseconds = Date.now();

    if (media.files && media.files[0]) {
        let fileName = media.files[0].name.split(" ").join("-");
        fileName = currentTimeInMilliseconds.toString().concat("_", fileName);
        var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
        
        if (ext.toLowerCase() === 'pdf' || ext.toLowerCase() === 'xlsx') {
            this.imgExtensionWrong = true;
            console.log('Invalid file extension.');
            return; // Simply return, no need for 'false'
        } else {
            this.imgExtensionWrong = false;
        }

        result.append('media', media.files[0], fileName);
        result.append('path', "Images/PrivacyPolicy");

        this.httpService.post(this.resourceUploadApi, result)
            .subscribe({
                next: (x) => {
                    this.resourceForm.controls["banner"].setValue(x.path);
                },
                error: (err) => {
                    console.error('Upload failed', err);
                    // Handle upload error here
                }
            });
    }
}

  async cancel() {
    this.submitted = false;
    this.resourceForm.reset();
    await this.getPrivacyPolicy();
    // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
  }

  changeTextToUppercase(field: string): void {
    const obj: { [key: string]: any } = {};
    obj[field] = this.resourceForm.controls[field].value.toUpperCase();
    this.resourceForm.patchValue(obj);
  }
}


