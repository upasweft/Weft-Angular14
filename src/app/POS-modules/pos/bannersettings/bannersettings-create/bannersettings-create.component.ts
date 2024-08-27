import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-bannersettings-create',
  templateUrl: './bannersettings-create.component.html',
  styleUrls: ['./bannersettings-create.component.scss']
})
export class BannersettingsCreateComponent implements OnInit {
  @ViewChild('logoPicker', { static: false })
  logoPicker!: { nativeElement: any; };
  thumbnailPopup = false;
  public resourceForm!: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
  resourceGetByIdApi: string = WeftAPIConfig.bannerSettingsService + "/";
  resourceCreateApi: string = WeftAPIConfig.bannerSettingsService;
  resourceCreateUserApi: string = WeftAPIConfig.bannerSettingsService;
  resourceUpdateApi: string = WeftAPIConfig.bannerSettingsService;
  resourceKey: string = 'bannerSettingsId';
  resourceKeyValue!: number;
  resourceName: string = 'BannerSettings';
  resourceManagementNavPath: string = "/admin/bannerSettings";
  logggedInUser: any;
  imgExtensionWrong!: boolean;
  resourceUploadApi:string = WeftAPIConfig.categoryService+"/upload";
  imagePath: any;
 
  constructor(private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService) {
  
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
  }
  
  createForm() {
    if (this.resourceKeyValue > 0) {
      this.getResourceById();
    }
    else {
      this.resourceForm = this.fb.group({
        bannerTitle: new FormControl("", Validators.compose([Validators.required])),
        bannerImage:new FormControl(),
        status: new FormControl(true),
        createdBy: new FormControl(null),
        
        
      });
    }
  }
  upload(): void {
    // Use FormData to handle file uploads
    const result = new FormData();
    const media = this.logoPicker.nativeElement;
    const currentTimeInMilliseconds = Date.now();
  
    // Check if files are selected
    if (media.files && media.files[0]) {
      let fileName = media.files[0].name.split(" ").join("-");
      fileName = `${currentTimeInMilliseconds}_${fileName}`;
      const ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
  
      // Validate file extension
      if (ext === 'pdf' || ext === 'xlsx') {
        this.imgExtensionWrong = true;
        return; // Early exit without returning a value
      } else {
        this.imgExtensionWrong = false;
      }
  
      // Append file and path to FormData
      result.append('media', media.files[0], fileName);
      result.append('path', "Images/BannerSettings");
  
      // Upload file using HTTP service
      this.httpService.post(this.resourceUploadApi, result)
        .subscribe((response: any) => {
          this.imagePath = response.path;
          this.resourceForm.controls["bannerImage"].setValue(response.path);
        });
    }
  }
  
  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
    
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        bannerTitle: new FormControl({ value: x["bannerTitle"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(10)])),
        status: new FormControl({ value: x["status"] },),
        lastModifiedBy: new FormControl(this.logggedInUser.sub),
        createdBy :new FormControl({ value: x["createdBy"] }),
        bannerImage :new FormControl({ value: x["bannerImage"] })
      });
      this.imagePath=x.bannerImage
      if (x['status'] == false){
        this.resourceForm.controls['status'].setValue(false);
      }
      else{
        this.resourceForm.controls['status'].setValue(true);
      }
      
    })
  }

  get f() { return this.resourceForm.controls; }

  onSubmit() {
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
    dataToPost['createdBy'] = this.logggedInUser.sub;
    dataToPost['bannerImage']=this.imagePath;
    if (this.resourceForm.invalid || this.imgExtensionWrong==true) {
      return;
    }
    else {
      this.submitted = false;
      if (this.resourceKeyValue > 0) {
       // dataToPost['categoryImage'] = this.imagePath
        dataToPost[this.resourceKey] = this.resourceKeyValue;
        this.resourceForm.reset();
        this.httpService.put(this.resourceUpdateApi, dataToPost).subscribe((x) => {
          if(x.statusCode == 500){
            this.toastrService.error(x.message, 'Fail');
          }
          else{
          this.toastrService.success('Banner Settings Updated Successfully', 'Success');
          this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
      else {
        this.resourceForm.reset();
        this.httpService.post(this.resourceCreateApi, dataToPost).subscribe((x) => {
          if(x.statusCode == 400){
            this.toastrService.warning(x.message, 'Fail');
          }
          else{
            this.resourceForm.reset();
            this.toastrService.success('Banner Settings Created Successfully', 'Success');
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
