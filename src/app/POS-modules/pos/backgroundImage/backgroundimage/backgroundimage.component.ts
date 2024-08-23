import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-backgroundimage',
  templateUrl: './backgroundimage.component.html',
  styleUrls: ['./backgroundimage.component.scss']
})
export class BackgroundimageComponent implements OnInit {
  @ViewChild('logoPicker', { static: false })
  logoPicker!: { nativeElement: any; };
  thumbnailPopup = false;
  public resourceForm!: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
  resourceGetByIdApi: string = WeftAPIConfig.backgroundImage + "/";
  resourceCreateApi: string = WeftAPIConfig.backgroundImage;
  resourceCreateUserApi: string = WeftAPIConfig.backgroundImage;
  resourceUpdateApi: string = WeftAPIConfig.backgroundImage;
  resourceKey: string = 'backgroundImageId';
  resourceKeyValue!: number;
  resourceName: string = 'Background Image';
  resourceManagementNavPath: string = "/admin/backgroundImage";
  logggedInUser: any;
  imgExtensionWrong!: boolean;
  resourceUploadApi:string = WeftAPIConfig.backgroundImage+"/upload";
  imagePath: any;
  sites: any;
 
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
    this.getSites();
  }
  
  createForm() {
    if (this.resourceKeyValue > 0) {
      this.getResourceById();
    }
    else {
      this.resourceForm = this.fb.group({
        siteSettingId: new FormControl(null, Validators.compose([Validators.required])),
        description: new FormControl("",Validators.required),
        createdBy: new FormControl(null),
        bImage:new FormControl("",Validators.required),
        status: new FormControl(true)
      });
    }
  }
  upload(): boolean {
    const result = new FormData();
    const media = this.logoPicker.nativeElement;
    const currentTimeInMilliseconds = Date.now();
  
    if (media.files && media.files[0]) {
      let fileName = media.files[0].name.split(" ").join("-");
      fileName = currentTimeInMilliseconds.toString().concat("_", fileName);
      const ext = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
  
      if (ext === 'pdf' || ext === 'xlsx') {
        this.imgExtensionWrong = true;
        return false;
      } else {
        this.imgExtensionWrong = false;
      }
  
      result.append('media', media.files[0], fileName);
      result.append('path', "Images/BackgroundImage");
  
      this.httpService.post(this.resourceUploadApi, result).subscribe((x) => {
        this.imagePath = x.path;
        this.resourceForm.controls["bImage"].setValue(x.path);
      });
  
      return true; // Return true after a successful upload
    }
  
    return false; // Return false if no file was selected
  }
  
  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        siteSettingId: new FormControl({ value: x["siteSettingId"], disabled: false }, Validators.compose([Validators.required])),
        status: new FormControl({ value: x["status"] },),
        lastModifiedBy: new FormControl(this.logggedInUser.sub),
        createdBy :new FormControl({ value: x["createdBy"] }),
        bImage :new FormControl({ value: x["bImage"] }),
        description: new FormControl({ value: x["description"], disabled: false }, Validators.compose([Validators.required])),
      });
      this.imagePath=x.bImage
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
    dataToPost['bImage']=this.imagePath;
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
          this.toastrService.success('Background Image Updated Successfully', 'Success');
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
            this.toastrService.success('Background Image Created Successfully', 'Success');
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
  getSites() {
    this.httpService.get(WeftAPIConfig.siteSettings).subscribe(res => {
      this.sites = res.filter((s: { status: boolean; }) => s.status == true)
      this.sites.sort((a: { siteName: number; }, b: { siteName: number; }) => (a.siteName > b.siteName) ? 1 : -1);
    })
  }
  changeTextToUppercase(field: string): void {
    const obj: { [key: string]: any } = {};
    obj[field] = this.resourceForm.controls[field].value.toUpperCase();
    this.resourceForm.patchValue(obj);
  }
  
  onSiteSelect(event: any)
  {

  }
}
