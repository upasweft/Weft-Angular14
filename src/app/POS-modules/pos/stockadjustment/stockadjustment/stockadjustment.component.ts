import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NullValidationHandler } from 'angular-oauth2-oidc';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-stockadjustment',
  templateUrl: './stockadjustment.component.html',
  styleUrls: ['./stockadjustment.component.scss']
})
export class StockadjustmentComponent implements OnInit {
  thumbnailPopup = false;
  public resourceForm!: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
  resourceGetByIdApi: string = WeftAPIConfig.stockAdjustment + "/";
  resourceCreateApi: string = WeftAPIConfig.stockAdjustment;
  resourceUpdateApi: string = WeftAPIConfig.stockAdjustment;
  resourceKey: string = 'stockAdjustmentId';
  resourceKeyValue!: number;
  resourceName: string = 'Stock Adjustment';
  resourceManagementNavPath: string = "/admin/Stock-adjustment";
  logggedInUser: any;
  sites: any;
  adjustmentTypes!: { adjustmentType: number; adjustmentTypeDescription: string; }[];
  products: any;
  siteId!: void;
  productId!: void;
  productsFulter: any;
  savedQty: any;


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
    this.adjustmentTypes = [
      { adjustmentType: 1, adjustmentTypeDescription: "Damage Stock" },
      { adjustmentType: 2, adjustmentTypeDescription: "Stock Removal" }, { adjustmentType: 3, adjustmentTypeDescription: "Stock Addition" }
    ]
    this.createForm();
    this.getSites();
    //this.getProducts();
  }

  createForm() {
    if (this.resourceKeyValue > 0) {
      this.getResourceById();
    }
    else {
      this.resourceForm = this.fb.group({
        docDate: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
        docNum: new FormControl("",),
        siteSettingId: new FormControl(null, Validators.required),
        productId: new FormControl(null, Validators.required),
        availQuantity: new FormControl(0),
        docType: new FormControl(null, Validators.required),
        quantity: new FormControl(null, Validators.required),
        remarks: new FormControl(null, Validators.required),
      });
    }
  }

  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      x.docDate = moment(x["docDate"]).format("YYYY-MM-DD");
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        docDate: new FormControl({ value: x["docDate"], disabled: false }, Validators.compose([Validators.required])),
        docNum: new FormControl({ value: x["docNum"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(150)])),
        // lastModifiedBy: new FormControl(this.logggedInUser.sub),
        // createdBy :new FormControl({ value: x["createdBy"] }),
        siteSettingId: new FormControl({ value: x["siteSettingId"], disabled: true }, Validators.compose([Validators.required])),
        productId: new FormControl({ value: x["productId"], disabled: true }, Validators.compose([Validators.required])),
        docType: new FormControl({ value: x["docType"], disabled: false }, Validators.compose([Validators.required])),
        availQuantity: new FormControl(0),
        quantity: new FormControl({ value: x["quantity"], disabled: false }, Validators.compose([Validators.required])),
        remarks: new FormControl({ value: x["remarks"], disabled: false }, Validators.compose([Validators.required])),
        docSl: new FormControl({ value: x['docSl'], disabled: false }),
      })
      this.siteId = x['siteSettingId']
      this.productId = x['productId']
      this.savedQty=x['quantity'];
      this.getProducts()
    })
  }

  get f() { return this.resourceForm.controls; }

  onSubmit() {
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
   console.log((parseFloat(this.resourceForm.controls['availQuantity'].value)-this.savedQty))
    if (
      parseFloat(this.resourceForm.controls['quantity'].value) > 
      parseFloat(this.resourceForm.controls['availQuantity'].value) &&
      parseFloat(this.resourceForm.controls['availQuantity'].value) >= 0 &&
      this.resourceForm.controls['docType'].value !== 3 
  ) {
      this.toastrService.error('Quantity cannot be greater than available quantity');
      return;
  }
  
    // dataToPost['createdBy'] = this.logggedInUser.sub;

    if (this.resourceForm.invalid) {
      return;
    }
    else {
      this.submitted = false;
      if (this.resourceKeyValue > 0) {
       
        if((parseFloat(this.resourceForm.controls['availQuantity'].value)-this.savedQty)<(this.resourceForm.controls['quantity'].value) && ((this.resourceForm.controls['docType'].value) != 3))
          {
            this.toastrService.error("Invalid Stock");
            return;
          }
        // dataToPost['categoryImage'] = this.imagePath
        dataToPost[this.resourceKey] = this.resourceKeyValue;
        dataToPost['docNum'] = this.resourceForm.controls['docNum'].value;
        dataToPost['productId'] = this.resourceForm.controls['productId'].value;
        dataToPost['siteSettingId'] = this.resourceForm.controls['siteSettingId'].value;
        dataToPost['lastModifiedBy'] = this.logggedInUser.sub,
        this.resourceForm.reset();
        this.httpService.put(this.resourceUpdateApi, dataToPost).subscribe((x) => {
          if (x.statusCode == 500) {
            this.toastrService.error(x.message, 'Fail');
          }
          else {
            this.toastrService.success('Stock Adjustment Updated Successfully', 'Success');
            this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
      else {
        this.resourceForm.reset();
        this.httpService.post(this.resourceCreateApi, dataToPost).subscribe((x) => {
          if (x.statusCode == 400) {
            this.toastrService.warning(x.message, 'Fail');
          }
          else {
            this.resourceForm.reset();
            this.toastrService.success('Stock Adjustment Created Successfully', 'Success');
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
  onSiteSelect(event: { siteSettingId: void; }) {

    this.resourceForm.controls['productId'].setValue(null);
    this.resourceForm.controls['availQuantity'].setValue(0);
    this.siteId = event.siteSettingId;
    this.getProducts()
  }
  getSites() {
    this.httpService.get(WeftAPIConfig.siteSettings).subscribe(res => {
      this.sites = res.filter((s: { status: boolean; }) => s.status == true)
      this.sites.sort((a: { siteName: number; }, b: { siteName: number; }) => (a.siteName > b.siteName) ? 1 : -1);
    })
  }
  onProductSelect(event: { stockQuantity: any; }) {
    this.resourceForm.controls['availQuantity'].setValue(event.stockQuantity);
  }
  getProducts() {
    this.httpService.get(WeftAPIConfig.productService).subscribe(res => {
      this.products = res.filter((a: { siteSettingId: void; })=>a.siteSettingId == this.siteId)
      if(this.editted)
      {
        this.productsFulter=this.products.filter((a: { productId: void; })=>a.productId == this.productId)
        this.resourceForm.controls['availQuantity'].setValue(this.productsFulter[0].stockQuantity);
      }
    })
  }
  quantityStockCheck(event: any) {

  }
  ontypeSelect(event: any) {

  }
}

