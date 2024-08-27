import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  @ViewChild('logoPicker', { static: false })
  logoPicker!: { nativeElement: any; };
  thumbnailPopup = false;
  imagePath!: string;
  public resourceForm!: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
  resourceGetByIdApi: string = WeftAPIConfig.productService + "/";
  resourceCreateApi: string = WeftAPIConfig.productService;
  resourceCreateUserApi: string = WeftAPIConfig.productService;
  resourceUpdateApi: string = WeftAPIConfig.productService;
  resourceKey: string = 'productId';
  resourceKeyValue!: number;
  resourceName: string = 'Product';
  resourceUploadApi: string = WeftAPIConfig.productService + '/upload';
  resourceManagementNavPath: string = "/admin/product-management";
  logggedInUser: any;
  categories: any;
  subcategories: any;
  selectedCategoryId: any;
  imgExtensionWrong: boolean = false;
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
    this.getCategories();
    this.getSites()
  }
  getCategories() {
    this.httpService.get(WeftAPIConfig.categoryService).subscribe(res => {
      this.categories = res.filter((s: { status: any; }) => s.status)
      this.categories.sort((a: { categoryName: number; }, b: { categoryName: number; }) => (a.categoryName > b.categoryName) ? 1 : -1);
    })

  }

  getSites() {
    this.httpService.get(WeftAPIConfig.siteSettings).subscribe(res => {
      this.sites = res.filter((s: { status: boolean; }) => s.status == true)
      this.sites.sort((a: { siteName: number; }, b: { siteName: number; }) => (a.siteName > b.siteName) ? 1 : -1);
    })
  }
  createForm() {
    if (this.resourceKeyValue > 0) {
      this.getResourceById();
    }
    else {
      this.resourceForm = this.fb.group({
        productCode: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(10)])),
        productName: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(150)])),
        categoryId: new FormControl(null, Validators.required),
       // subCategoryId: new FormControl(null, Validators.required),
        productImage: new FormControl(null),
        price: new FormControl("", [Validators.required, this.nonZeroNumberValidator]),
        stockQuantity:new FormControl("", [Validators.required, this.nonZeroNumberValidator]),
        // vat: new FormControl("", Validators.required),
        createdBy: new FormControl(null),
        siteSettingId:new FormControl(null,Validators.required),
        status: new FormControl(true)
      });
    }
  }
  onCategorySelect(event: { categoryId: any; }) {
    this.selectedCategoryId = event.categoryId;
    this.resourceForm.controls['categoryId'].setValue(event.categoryId)
  }
  onSiteSelect(event: { siteSettingId: any; }) {
    this.resourceForm.controls['siteSettingId'].setValue(event.siteSettingId)
  }
  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        productCode: new FormControl({ value: x["productCode"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(10)])),
        productName: new FormControl({ value: x["productName"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(150)])),
        categoryId: new FormControl({ value: x["categoryId"], disabled: false }, Validators.required),
       // subCategoryId: new FormControl({ value: x["subCategoryId"], disabled: false }, Validators.required),
        // vat: new FormControl({ value: x["vat"], disabled: false }, Validators.required),
        price: new FormControl({ value: x["price"], disabled: false }, [Validators.required]),
        stockQuantity:new FormControl({ value: x["stockQuantity"], disabled: false }, [Validators.required]),
        productImage: new FormControl({ value: x["productImage"], disabled: false },),
        status: new FormControl({ value: x["status"] },),
        siteSettingId:new FormControl({ value: x["siteSettingId"],disabled: false },Validators.required),
        lastModifiedBy: new FormControl(this.logggedInUser.sub),
      });
      if (x['status'] == false) {
        this.resourceForm.controls['status'].setValue(false);
      }
      else {
        this.resourceForm.controls['status'].setValue(true);
      }
      this.imagePath = x.productImage
      this.getCategories();
      this.selectedCategoryId = x['categoryId']
      this.getSites()
    })
  }
  upload(): boolean {
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
  
        result.append('media', media.files[0], fileName);
        result.append('path', "Images/Products");
  
        this.httpService.post(this.resourceUploadApi, result)
          .subscribe((x) => {
            this.imagePath = x.path
            this.resourceForm.controls["productImage"].setValue(x.path);
          });
  
        return true; // Return true if upload is successful
      }
    }
  
    return false; // Return false if no file was selected
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
    if (value === "0" || isNaN(value)) {
      return { nonZeroNumber: true };
    }
    return null;
  }
  get f() { return this.resourceForm.controls; }

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
          if (x.statusCode == 500) {
            this.toastrService.error(x.message, 'Fail');
          }
          else {
            this.toastrService.success('Product Updated Successfully', 'Success');
            this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
      else {
        this.resourceForm.reset();
        this.httpService.post(this.resourceCreateApi, dataToPost).subscribe((x) => {
          if (x.statusCode == 500) {
            this.toastrService.error(x.message, 'Fail');
          }
          else {
            this.resourceForm.reset();
            this.toastrService.success('Product Created Successfully', 'Success');
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
