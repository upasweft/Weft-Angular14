import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-categorycreate',
  templateUrl: './categorycreate.component.html',
  styleUrls: ['./categorycreate.component.scss']
})
export class CategorycreateComponent implements OnInit {
  @ViewChild('logoPicker', { static: false })
  logoPicker!: { nativeElement: any; };
  thumbnailPopup = false;
  public resourceForm!: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
  resourceGetByIdApi: string = WeftAPIConfig.categoryService + "/";
  resourceCreateApi: string = WeftAPIConfig.categoryService;
  resourceCreateUserApi: string = WeftAPIConfig.categoryService;
  resourceUpdateApi: string = WeftAPIConfig.categoryService;
  resourceKey: string = 'categoryId';
  resourceKeyValue!: number;
  resourceName: string = 'Category';
  resourceManagementNavPath: string = "/admin/category-management";
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
        categoryCode: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(10)])),
        categoryName:new FormControl("", Validators.compose([Validators.required, Validators.maxLength(150)])),
        categoryDescription: new FormControl(""),
        createdBy: new FormControl(null),
        categoryImage:new FormControl(),
        status: new FormControl(true)
      });
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
            return; // Simply exit the method without returning any value
        } else {
            this.imgExtensionWrong = false;
        }
        result.append('media', media.files[0], fileName);
        result.append('path', "Images/Category");
        console.log(result);
        this.httpService.post(this.resourceUploadApi, result)
            .subscribe((x) => {
                this.imagePath = x.path;
                this.resourceForm.controls["categoryImage"].setValue(x.path);
            });
    }
}


  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      console.log(x)
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        categoryCode: new FormControl({ value: x["categoryCode"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(10)])),
        categoryName: new FormControl({ value: x["categoryName"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(150)])),
        status: new FormControl({ value: x["status"] },),
        lastModifiedBy: new FormControl(this.logggedInUser.sub),
        createdBy :new FormControl({ value: x["createdBy"] }),
        categoryImage :new FormControl({ value: x["categoryImage"] })
      });
      this.imagePath=x.categoryImage
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
    dataToPost['categoryImage']=this.imagePath;
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
          this.toastrService.success('Category Updated Successfully', 'Success');
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
            this.toastrService.success('Category Created Successfully', 'Success');
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
