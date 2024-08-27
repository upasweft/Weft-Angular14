import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss']
})
export class ProductReportComponent implements OnInit {
  resourceForm: any;
  categories: any;
  selectedCategoryId: any;
  submitted: boolean = false;
  subcategories: any;
  getProductReportPath: string = '/report/product-report-management'
  products: any;
  sites: any[] = [];
  constructor(private fb: FormBuilder, private router: Router, private httpService: WeftHttpService) { }

  ngOnInit() {

    this.createForm()
    this.getCategories()
    this.getSubCategories(0)
    this.getProducts();
    this.getSites();
  }
  createForm() {
    this.resourceForm = this.fb.group({
      categoryId: new FormControl(0, Validators.required),
      productId: new FormControl(0, Validators.required),
      dateFrom: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      dateTo: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      siteSettingsId:new FormControl(0,Validators.required)
    })
  }
  getCategories() {
    this.httpService.get(WeftAPIConfig.categoryService).subscribe(res => {
      res.splice(0, 0, { categoryId: 0, categoryName: "All", status: true });
      this.categories = res.filter((s: { status: any; }) => s.status)
    })

  }

  getSites() {
    this.httpService.get(WeftAPIConfig.siteSettings).subscribe(res => {
      const filteredSites = res.filter((s: { status: boolean; }) => s.status == true);
      const sortedSites = filteredSites.sort((a: { siteName: number; }, b: { siteName: number; }) => (a.siteName > b.siteName) ? 1 : -1);
        // Create a default site option
    const defaultSite = { siteSettingId: 0, siteName: 'All' }; // Modify the properties accordingly

    // Add the default site to the beginning of the array
    this.sites = [defaultSite, ...sortedSites];
    })
  }
  onSiteSelect(event: any){
    
  }
  getProducts() {
    this.httpService.get(WeftAPIConfig.productService).subscribe(res => {
      res.splice(0, 0, { productId: 0, productName: "All", status: true });
      this.products = res.filter((s: { status: any; }) => s.status)
    })

  }
  onCategorySelect(event: { categoryId: any; }) {
    this.resourceForm.controls['categoryId'].setValue(event.categoryId);
    this.selectedCategoryId = event.categoryId
    this.getSubCategories(this.selectedCategoryId);
  }

  getSubCategories(categoryId: number) {
    this.httpService.get(WeftAPIConfig.subcategoryService).subscribe(res => {
      if (categoryId == 0) {
        res.splice(0, 0, { subcategoryId: 0, subcategoryName: "All", status: true });
        this.subcategories = res;
      }
      else {
        res.splice(0, 0, { subcategoryId: 0, subcategoryName: "All", status: true });
        this.subcategories = res.filter((s: { status: any; categoryId: any; }) => s.status && s.categoryId == categoryId)
      }
    })

  }
  get f() { return this.resourceForm.controls; }
  onSubCategorySelect(event: { subcategoryId: any; }) {
    this.resourceForm.controls['subCategoryId'].setValue(event.subcategoryId);
  }
  onSubmit() {
    this.submitted = true;

    const dataToPost = this.resourceForm.value;

    if (this.resourceForm.invalid) {
      return;
    }
    else {
      this.router.navigate([this.getProductReportPath, JSON.stringify(dataToPost)]);
    }
  }
  cancel() {

  }
}
