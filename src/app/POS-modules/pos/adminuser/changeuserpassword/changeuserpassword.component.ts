import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-changeuserpassword',
  templateUrl: './changeuserpassword.component.html',
  styleUrls: ['./changeuserpassword.component.scss']
})
export class ChangeuserpasswordComponent implements OnInit {
  @Input() iuserId: any;
  @Input()
  admin: boolean = false;
  resourceForm: any;
  submitted: boolean = false;
  constructor(private fb: FormBuilder,private httpService:WeftHttpService,
    private router:Router,private toastrService: ToastrService,private bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.createForm();
  }
  get f() { return this.resourceForm.controls; }
  createForm() {
    this.resourceForm = this.fb.group({
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}")])),

    })
  }
  onSubmit(){
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
    dataToPost['iuserId'] = this.iuserId;
    if (this.resourceForm.invalid) {
      return;
    }
    else{
      this.httpService.put(WeftAPIConfig.userService+'/changePassword',dataToPost).subscribe(res=>{
        if(res.data==200){
          this.toastrService.success('Password Changed Successfully');
          this.bsModalRef.hide();
          if(this.admin==true){
          this.router.navigate(['/admin/adminusers-management'], { replaceUrl: true });}
          else{
            this.router.navigate(['/admin/users-management'], { replaceUrl: true });}
          
        }
        else{
          this.toastrService.error(res.message);
        }
      })
    }
  }
  close() {
 this.bsModalRef.hide()
  }
}
