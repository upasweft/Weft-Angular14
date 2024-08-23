import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/authentication-services/auth.service';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  resourceForm: any;
  submitted: boolean = false;
  userLoggedIn: any;
  userId: any;
  authService!: AuthService;
  constructor( private fb: FormBuilder,private router :Router
    ,private httpService:WeftHttpService,private toastrService: ToastrService,
    ) { }

  ngOnInit() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this.userLoggedIn = userLoggedIn ? JSON.parse(userLoggedIn) : null;
    
    this.userId = this.userLoggedIn ? this.userLoggedIn.info.sub : null;
    this.createForm();
  }
  createForm(){
    this.resourceForm = this.fb.group({
      oldpassword:new FormControl('',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}")])),
      password:new FormControl('',Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}")])),
      confirmPassword: new FormControl('', Validators.required),

    }, { validator: this.passwordMatch('password', 'confirmPassword') })
    
  }

  passwordMatch(passwordControl: string, confirmPasswordControl: string) {
    
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[passwordControl];
      const matchingControl = formGroup.controls[confirmPasswordControl];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  get f() { return this.resourceForm.controls; }
  cancel(){
    this.router.navigate(['/report/dashboard'], { replaceUrl: true });
  }
  onSubmit(){
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
    dataToPost['iuserId'] = this.userId;
    if (this.resourceForm.invalid) {
      return;
    }
    else{
      this.httpService.put(WeftAPIConfig.userService+'/changePassword',dataToPost).subscribe(res=>{
        console.log(res)
        if(res.data==200){
          this.toastrService.success('Password Changed Successfully');
          this.router.navigate(['/report/dashboard'], { replaceUrl: true });
        }
        else{
          this.toastrService.error(res.message);
        }
      })
    }
  }
}
