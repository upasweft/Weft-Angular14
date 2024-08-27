import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-aboutus-create',
  templateUrl: './aboutus-create.component.html',
  styleUrls: ['./aboutus-create.component.scss']
})
export class AboutusCreateComponent implements OnInit {
  @ViewChild('logoPicker', { static: false })
  logoPicker!: { nativeElement: any; };
  public resourceForm!: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
 resourceGetApi : string = WeftAPIConfig.aboutUsService+"/allAboutUs";
  resourceGetByIdApi: string = WeftAPIConfig.aboutUsService + "/";
  resourceCreateApi: string = WeftAPIConfig.aboutUsService;
  resourceUpdateApi: string = WeftAPIConfig.aboutUsService;
  resourceUploadApi:string = WeftAPIConfig.aboutUsService+"/upload";
  thumbnailPopup = false;
  resourceKey: string = 'aboutUsId';
  resourceKeyValue!: number;
  resourceName: string = 'aboutUs';
 
  logggedInUser: any;
  readOnlyUserName: boolean = false;
  hideSubmitFromBranchUser!: boolean;
  imgExtensionWrong!: boolean;
  inspectionTypes: any=[];
  aboutUs: any;
  

  constructor(private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService) {
  
  }

  async ngOnInit() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this.logggedInUser = userLoggedIn ? JSON.parse(userLoggedIn) : null;
    await this.getaboutUs();
    // if (this.route.snapshot.paramMap.get(this.resourceKey)) {
    //   this.route.paramMap.subscribe((params) => {
    //     this.resourceKeyValue = Number(params.get(this.resourceKey));
    //   });
    // }
  
  //  this.createForm();
   // this.adminOnlyEdit();
    // this.getCountries();
  }
 async getaboutUs() {
    debugger;
   return await (this.httpService.get(this.resourceGetApi)).toPromise().then(result => {
      if (result) {
        this.aboutUs = result;
        if(this.aboutUs!=null && this.aboutUs.length>0)
        {
          this.aboutUs.forEach((contact: { aboutUsId: number; }) => {
            this.resourceKeyValue = contact.aboutUsId;
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
        aboutUsId: new FormControl(null),
        title: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(100)])),
        bannerImage:new FormControl("", Validators.compose([Validators.required])),
        description: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(100)])),
        createdBy: new FormControl(null),
        status: new FormControl(true),
      });
    
  }
  upload(): void {
    const result = new FormData();
    const media = this.logoPicker.nativeElement;
    const currentTimeInMilliseconds = Date.now();

    if (media.files && media.files[0]) {
        let fileName = media.files[0].name.split(" ").join("-");
        fileName = `${currentTimeInMilliseconds}_${fileName}`;
        const ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

        if (ext === 'pdf' || ext === 'xlsx') {
            this.imgExtensionWrong = true;
            return; // Exit the function, no need to return false
        } else {
            this.imgExtensionWrong = false;
        }

        result.append('media', media.files[0], fileName);
        result.append('path', "Images/AboutUs");

        this.httpService.post(this.resourceUploadApi, result)
            .subscribe((x) => {
                this.resourceForm.controls['bannerImage'].setValue(x.path);
            });
    }
}

  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      console.log(x)
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        aboutUsId: new FormControl({ value: x["aboutUsId"], disabled: false }, Validators.compose([Validators.required])),
        title: new FormControl({ value: x["title"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(100)])),
        bannerImage: new FormControl({ value: x["bannerImage"], disabled: false }, Validators.compose([Validators.required])),
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
    
 // console.log(dataToPost)
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
          this.toastrService.success('About Us Updated Successfully', 'Success');
          this.getaboutUs();
          // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
      else {
        dataToPost['aboutUsId'] =0;
        this.resourceForm.reset();
        this.httpService.post(this.resourceCreateApi, dataToPost).subscribe((x) => {
          if(x.statusCode == 500){
            this.toastrService.error(x.message, 'Fail');
          }
          else{
            this.resourceForm.reset();
            this.toastrService.success('About Us Created Successfully', 'Success');
            this.getaboutUs();
            // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }         
        });
      }
    }
  }

  async cancel() {
    this.submitted = false;
    this.resourceForm.reset();
    await this.getaboutUs();
    // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
  }

  changeTextToUppercase(field: string): void {
    const obj: { [key: string]: any } = {};
    obj[field] = this.resourceForm.controls[field].value.toUpperCase();
    this.resourceForm.patchValue(obj);
  }
}
