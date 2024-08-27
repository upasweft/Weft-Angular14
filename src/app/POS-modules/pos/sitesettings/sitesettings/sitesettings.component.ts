import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-sitesettings',
  templateUrl: './sitesettings.component.html',
  styleUrls: ['./sitesettings.component.scss']
})
export class SitesettingsComponent implements OnInit {
  public resourceForm!: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
  resourceGetByIdApi: string = WeftAPIConfig.siteSettings + "/";
  resourceCreateApi: string = WeftAPIConfig.siteSettings;
  resourceCreateUserApi: string = WeftAPIConfig.siteSettings;
  resourceUpdateApi: string = WeftAPIConfig.siteSettings;
  resourceKey: string = 'siteSettingId';
  resourceKeyValue!: number;
  resourceName: string = 'Site Settings';
  resourceUploadApi: string = WeftAPIConfig.productService + '/upload';
  resourceManagementNavPath: string = "admin/sitesettings-management";
  logggedInUser: any;
  categories: any;
  subcategories: any;
  selectedCategoryId: any;
  imgExtensionWrong: boolean = false;

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
    this.getCategories()
  }
  getCategories() {
    this.httpService.get(WeftAPIConfig.categoryService).subscribe(res => {
      this.categories = res.filter((s: { status: any; }) => s.status)
      this.categories.sort((a: { categoryName: number; }, b: { categoryName: number; }) => (a.categoryName > b.categoryName) ? 1 : -1);
    })

  }

  getSubCategories() {
    this.httpService.get(WeftAPIConfig.subcategoryService).subscribe(res => {
      this.subcategories = res.filter((s: { status: boolean; categoryId: any; }) => s.status == true && s.categoryId == this.selectedCategoryId)
      this.subcategories.sort((a: { subcategoryName: number; }, b: { subcategoryName: number; }) => (a.subcategoryName > b.subcategoryName) ? 1 : -1);
    })
  }
  createForm() {
    if (this.resourceKeyValue > 0) {
      this.getResourceById();
    }
    else {
      this.resourceForm = this.fb.group({
        siteCode: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(10)])),
        siteName: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(250)])),
        address: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(250)])),
        contact: new FormControl("", Validators.compose([ Validators.pattern("^[0-9,+]*$")])),
        email: new FormControl("", Validators.compose([Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"), Validators.email])),
        vat: new FormControl("", Validators.required),
        tax: new FormControl(0),
        trn:new FormControl("",Validators.required),
        createdBy: new FormControl(null),
        status: new FormControl(true)
      });
    }
  }

  getResourceById() {
    
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      console.log(x)
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        siteCode: new FormControl({ value: x["siteCode"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(10)])),
        siteName: new FormControl({ value: x["siteName"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(150)])),
        address: new FormControl({ value: x["address"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(150)])),
        contact: new FormControl({ value: x["contact"], disabled: false },Validators.compose([ Validators.pattern("^[0-9,+]*$")])),
        email: new FormControl({ value: x["email"], disabled: false },Validators.compose([Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"), Validators.email])),
        vat: new FormControl({ value: x["vat"], disabled: false }, Validators.required),
        tax: new FormControl({ value: x["tax"], disabled: false }, ),
        status:new FormControl({ value: x["tax"], disabled: false }, ),
        trn:new FormControl({ value: x["trn"], disabled: false },Validators.required ),
        lastModifiedBy: new FormControl(this.logggedInUser.sub),
      });
      if (x['status'] == false) {
        this.resourceForm.controls['status'].setValue(false);
      }
      else {
        this.resourceForm.controls['status'].setValue(true);
      }
      this.getCategories();
      this.selectedCategoryId = x['categoryId']
      this.getSubCategories()
    })
  }

  onPriceChange(event: { which: any; keyCode: any; }) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      return true;
    }
  }
  getKeyCodes(e: any) {
    if ((e.keyCode == 8 || (e.keyCode == 46 || (e.keyCode == 9))) ||
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode >= 35 && e.keyCode <= 40) || (e.keyCode != 46 && e.keyCode > 31
        && (e.keyCode < 48 || e.keyCode > 57))) {
      return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }
  nonZeroNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    console.log(control)
    if (value === "0" || isNaN(value)) {
      return { nonZeroNumber: true };
    }
    return null;
  }
  get f()
   {
     return this.resourceForm.controls;
     }


  onSubmit() {
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
    dataToPost['createdBy'] = this.logggedInUser.sub;

    if (this.resourceForm.invalid) {
      return;

    }
    else {
    
      this.submitted = false;
      if (this.resourceKeyValue > 0) {
        dataToPost[this.resourceKey] = this.resourceKeyValue;
       
        this.resourceForm.reset();
        this.httpService.put(this.resourceUpdateApi, dataToPost).subscribe((x) => {
          console.log(x)
          if (x.statusCode == 500) {
            this.toastrService.error(x.message, 'Fail');
          }
          else {
            this.toastrService.success('Site Settings Updated Successfully', 'Success');
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
            this.toastrService.success('Site Settings Successfully', 'Success');
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
