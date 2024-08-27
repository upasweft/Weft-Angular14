import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-void-report',
  templateUrl: './void-report.component.html',
  styleUrls: ['./void-report.component.scss']
})
export class VoidReportComponent implements OnInit {
  resourceForm: any;
  categories: any;
  selectedCategoryId: any;
  submitted: boolean = false;
  subcategories: any;
  getProductReportPath: string = '/report/void-report-management'
  products: any;
  sites: any[] = [];
  siteId: any;
  constructor(private fb: FormBuilder, private router: Router, private httpService: WeftHttpService) { }

  ngOnInit() {
    this.createForm();
    this.getSites();
  }
  createForm() {
    this.resourceForm = this.fb.group({
      dateFrom: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      dateTo: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      siteSettingsId: new FormControl(0, Validators.required)
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
  onSiteSelect(event: any) {
    this.resourceForm.controls['productId'].setValue(null);
  }

  get f() { return this.resourceForm.controls; }

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
  this.resourceForm.reset()
  }
}
