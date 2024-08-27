import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {
  thumbnailPopup = false;
  imagePath!: string;
  public resourceForm!: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
  resourceCreateApi: string = WeftAPIConfig.qrCodeService;
  resourceGetByIdApi!: string;
  resourceUpdateApi: string = WeftAPIConfig.productService;
  resourceKey: string = 'qrCodeId';
  resourceKeyValue!: number;
  resourceName: string = 'Qr Code';

  resourceManagementNavPath: string = "/admin/qrCodeManagement";
  logggedInUser: any;
  categories: any;
  subcategories: any;
  selectedCategoryId: any;
  imgExtensionWrong: boolean = false;
  sites: any;
  insertedQrCodes: any;
  generated!: boolean;

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
        quantity: new FormControl("", [Validators.required, this.nonZeroNumberValidator]),
        // vat: new FormControl("", Validators.required),
        createdBy: new FormControl(null),
        siteSettingId: new FormControl(null, Validators.required),
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
        stockQuantity: new FormControl({ value: x["stockQuantity"], disabled: false }, [Validators.required]),
        productImage: new FormControl({ value: x["productImage"], disabled: false },),
        status: new FormControl({ value: x["status"] },),
        siteSettingId: new FormControl({ value: x["siteSettingId"], disabled: false }, Validators.required),
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
      console.log("error", dataToPost)
      return;

    }
    else {

      console.log(dataToPost)

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
            this.toastrService.success('Product Updated Successfully', 'Success');
            this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
      else {
        this.resourceForm.reset();
        this.httpService.post(this.resourceCreateApi, dataToPost).subscribe((x) => {
          if (x) {
            this.generated = true
            this.insertedQrCodes = x;
           // this.onQrPrint();
            this.resourceForm.reset();
            this.toastrService.success('QrCode Created Successfully', 'Success');
            // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }

        });

      }
    }
  }
  onQrPrint() {
    const printElement = document.getElementById('printAllQrCode');
    if (printElement) {
      const printContents = printElement.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      setTimeout(() => { window.location.reload(); }, 200);
    } else {
      console.error("Element with ID 'printAllQrCode' not found.");
    }
  }
  


  onQrAllPrint() {
    window.print();
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
