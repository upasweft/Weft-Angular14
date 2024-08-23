import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';


@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  resourceForm: any;
  submitted:boolean;
  getSalesReportPath:string ='/report/sales-report-management'
  showDateInputs: boolean=true;
  sites: any;
  constructor(private fb: FormBuilder,private router: Router,private httpService: WeftHttpService) { }

  ngOnInit() {
    this.createForm()
    this.getSites();
  }
  createForm(){
    this.resourceForm = this.fb.group({
      reportOption:new FormControl("date",Validators.required),
      dateFrom: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      dateTo: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      siteSettingsId:new FormControl(0,Validators.required)
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
    console.log(this.sites)
    })
  }
  onSiteSelect(event)
  {

  }
  get f() { return this.resourceForm.controls; }
  cancel(){
    this.submitted = false;
    this.resourceForm.reset();

  }

  Changeoption(event) {
    const selectedOption = this.resourceForm.get('reportOption').value;
    const today = moment();
  
    if (selectedOption === 'weekly' || selectedOption === 'monthly' || selectedOption === 'annually') {
      this.showDateInputs = false;
  
      // Set default date range based on the selected option
      let dateFrom, dateTo;
  
      if (selectedOption === 'weekly') {
        dateFrom = today.startOf('isoWeek').format('YYYY-MM-DD');
        dateTo = today.endOf('isoWeek').format('YYYY-MM-DD');
      } else if (selectedOption === 'monthly') {
        dateFrom = today.startOf('month').format('YYYY-MM-DD');
        dateTo = today.endOf('month').format('YYYY-MM-DD');
      } else if (selectedOption === 'annually') {
        dateFrom = today.startOf('year').format('YYYY-MM-DD');
        dateTo = today.endOf('year').format('YYYY-MM-DD');
      }
  
      this.resourceForm.patchValue({
        dateFrom: dateFrom,
        dateTo: dateTo,
      });
    } else if (selectedOption === 'date') {
      // Handle 'date' option separately
      this.showDateInputs = true;
      this.resourceForm.patchValue({
        dateFrom: today.format('YYYY-MM-DD'),
        dateTo: today.format('YYYY-MM-DD'),
      });
    }
  }
  
  onSubmit(){
    this.submitted = true;
   
    const dataToPost = this.resourceForm.value;
   
   
    if (this.resourceForm.invalid) {
      return;
    }
    else {
      this.router.navigate([this.getSalesReportPath, JSON.stringify(dataToPost)]);
    }
  }
}
