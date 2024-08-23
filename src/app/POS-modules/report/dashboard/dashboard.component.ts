import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  logggedInUser: any;
  sites: any;
  dashboard: any;
  constructor(private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService) {

  }

  ngOnInit() {
   
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this.logggedInUser = userLoggedIn ? JSON.parse(userLoggedIn) : null;
    
    if(this.logggedInUser.UserType=='S'){
    this.getSiteDeatils();
    }
   
  }
  getSiteDeatils() {
    this.httpService.get(WeftAPIConfig.userService+'/profile/'+this.logggedInUser.sub).subscribe(res=>
      {
       this.sites=res;
       this.dashboardDetails();
       console.log(this.sites)
      })
  }
  dashboardDetails()
  {
    this.httpService.get(WeftAPIConfig.dashboardService+'/'+this.sites.siteSettingId).subscribe(res=>
      {
        this.dashboard=res;
      })

  }

}
