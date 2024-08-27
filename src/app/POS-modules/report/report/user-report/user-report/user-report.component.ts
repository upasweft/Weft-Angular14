import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent implements OnInit {
  userTypes: { id: string; name: string; }[];
  resourceForm: any;
  submitted: boolean = false;
  getUserReportPath:string = '/report/users-report-management'
  resourceKeyValue: any;
  sites: any[] = [];
  constructor(private fb: FormBuilder, private router: Router,private httpService: WeftHttpService) {
    this.userTypes = [
      { id: 'A', name: "All" },
      { id: 'C', name: "Cameraman" },
      { id: 'S', name: "Site Manager" },
    ];
  }
  get f() { return this.resourceForm.controls; }
  ngOnInit() {
    this.createForm();
    this.getSites();
  }
  createForm() {
    this.resourceForm = this.fb.group({
      userType:new FormControl('A',Validators.required),
      siteSettingsId:new FormControl(0,Validators.required)
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
  onUserTypeSelect(event: { id: any; })
  {
    this.resourceForm.controls['userType'].setValue(event.id)
  }
  onSubmit() {
    this.submitted = true;
   
    const dataToPost = this.resourceForm.value;
   
   
    if (this.resourceForm.invalid) {
      return;
    }
    else {
      this.router.navigate([this.getUserReportPath, JSON.stringify(dataToPost)]);
    }
  }
  cancel() {
    this.submitted = false;
    this.resourceForm.reset();
  }
 
}
