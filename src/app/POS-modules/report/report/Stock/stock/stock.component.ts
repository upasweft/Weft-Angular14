import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  resourceForm: any;
  categories: any;
  selectedCategoryId: any;
  submitted: boolean;
  subcategories: any;
  getProductReportPath: string = '/report/stock-report-management'
  getStockReportPath: string = '/report/stock-report-Details-management'
  products: any;
  sites: any[];
  siteId: any;
  summary: boolean  = true;
  constructor(private fb: FormBuilder, private router: Router, private httpService: WeftHttpService) { }

  ngOnInit() {

    this.createForm()
    this.getProducts()
    this.getSites();
    this.getProducts();
  }
  createForm() {
    this.resourceForm = this.fb.group({
    
      productId: new FormControl(null, Validators.required),
      dateFrom: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      dateTo: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      siteSettingsId:new FormControl(0,Validators.required),
      reportOption:new FormControl("summary",Validators.required)
    })
  }
  getSites() {
    this.httpService.get(WeftAPIConfig.siteSettings).subscribe(res => {
      const filteredSites = res.filter(s => s.status == true);
      const sortedSites = filteredSites.sort((a, b) => (a.siteName > b.siteName) ? 1 : -1);
        // Create a default site option
    const defaultSite = { siteSettingId: 0, siteName: 'All' }; // Modify the properties accordingly

    // Add the default site to the beginning of the array
    this.sites = [defaultSite, ...sortedSites];
    })
  }
  onSiteSelect(event){
    this.resourceForm.controls['productId'].setValue(null);
    this.siteId= event.siteSettingId;
   
  }
  getProducts() {
    this.httpService.get(WeftAPIConfig.productService).subscribe(res => {
    //  res.splice(0, 0, { productId: 0, productName: "All", status: true });
      this.products = res;
    })

  }
  onProductSelect(event)
  {

  }
  get f() { return this.resourceForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    const dataToPost = this.resourceForm.value;

    if (this.resourceForm.invalid) {
      return;
    }
    else {
      if(this.resourceForm.get('reportOption').value=='summary')
      {
      this.router.navigate([this.getProductReportPath, JSON.stringify(dataToPost)]);
      }
      else{
        this.router.navigate([this.getStockReportPath, JSON.stringify(dataToPost)]);
      }
    }
  }
  cancel() {

  }
  Changeoption(event) {
    const selectedOption = this.resourceForm.get('reportOption').value;
    if(selectedOption =='summary')
    {
      this.summary = true;
    }
    else{
      this.summary = false;
    }
  }
}

