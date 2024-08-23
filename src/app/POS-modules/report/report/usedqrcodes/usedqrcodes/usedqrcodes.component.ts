import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';

@Component({
  selector: 'app-usedqrcodes',
  templateUrl: './usedqrcodes.component.html',
  styleUrls: ['./usedqrcodes.component.scss']
})
export class UsedqrcodesComponent implements OnInit {
  resourceForm: any;
  categories: any;
  selectedCategoryId: any;
  submitted: boolean;
  subcategories: any;
  getProductReportPath: string = '/report/usedqrcode-report-management'
  products: any;
  sites: any[];
  constructor(private fb: FormBuilder, private router: Router, private httpService: WeftHttpService) { }

  ngOnInit() {

    this.createForm()
  }
  createForm() {
    this.resourceForm = this.fb.group({
     
      dateFrom: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
      dateTo: new FormControl(moment().format("YYYY-MM-DD"), Validators.required),
     
    })
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

  }
}
