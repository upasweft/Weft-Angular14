import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-dailysales-report',
  templateUrl: './dailysales-report.component.html',
  styleUrls: ['./dailysales-report.component.scss']
})
export class DailysalesReportComponent implements OnInit {
  resourceForm: any;
  submitted: boolean = false;
  getSalesReportPath:string ='/report/dailysales-report-management'
  sites: any[] = [];
  constructor(private fb: FormBuilder,private router: Router,private httpService: WeftHttpService) { }

  ngOnInit() {
    this.createForm()
    this.getSites();
  }
  createForm(){
    this.resourceForm = this.fb.group({
      dateFrom: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      siteSettingsId:new FormControl(0,Validators.required)
      //dateTo: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
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
  onSiteSelect(event: any)
  {

  }
 
  get f() { return this.resourceForm.controls; }
  cancel(){
    this.submitted = false;
    this.resourceForm.reset();

  }
  onSubmit(){
    this.submitted = true;
   
    const dataToPost = this.resourceForm.value;
    dataToPost['dateTo'] = this.resourceForm.controls['dateFrom'].value;
   
    if (this.resourceForm.invalid) {
      return;
    }
    else {
      this.router.navigate([this.getSalesReportPath, JSON.stringify(dataToPost)]);
    }
  }
  customizeColumns(){

  }
}

