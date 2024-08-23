import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup;
  submitted: boolean = false;
  otpData: any=[];
  otp: any;
  responseMessage!: string;
  otpResponse: any;

  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '30px',
      'height': '30px',
      'font-size' : '15px',
      'outline' : 'none',
      'padding' : '10px 8px'
    }
  };
  bsModalRef!: BsModalRef;
  otpInput: any;
  noEmail: boolean=false;
 

  constructor(
    private toastrService: ToastrService,
   public modalService: BsModalService,
    private fb: FormBuilder,
    private httpService: WeftHttpService,
    ) { }

  ngOnInit() {
    this.createForm();
  }
  
  createForm(){
    this.forgetPasswordForm = this.fb.group({
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      otp :new FormControl()
    })
  }

  get f() { return this.forgetPasswordForm.controls; }

  sendEmail(){
    this.submitted = true;
    if (this.forgetPasswordForm.invalid) {
      return;
    }
    
    let mailRequest = {
      // "otpId": 0,
      // "type": "F",
      // "token": "123456",
      // "iUserId": "00000000-0000-0000-0000-000000000000",
      "userClaim": this.forgetPasswordForm.controls["email"].value,
      // "validUpto": new Date(),
      // "status": false
    }

    // this.httpService.get(WeftAPIConfig.otpService+'/ForgotPassword'+'/'+this.forgetPasswordForm.controls["email"].value).subscribe(res =>{
    //  if(res)
    //  {
     
    //   this.otpData = res;
    //   console.log(this.otpData)
    //   if(this.otpData.otp=='Null')
    //   {
    //     this.noEmail=false;
    //     this.responseMessage = this.otpData.message
    //     console.log(this.responseMessage)
    //   }
    //   else
    //   {
    //     this.noEmail=true;
    //   }
     
    //  }
     
    // })
  }

  onOtpChange(event: any){
    this.otp = event;
  }

  validateOTP(){
    this.otpInput = this.otpData.otp;
    console.log(this.otpInput)
    console.log(this.otp)
    if(this.otp==this.otpInput)
    {
      const initialState = {
        email: this.forgetPasswordForm.controls["email"].value
      }
      // this.bsModalRef = this.modalService.show(ResetpasswordComponent,
      //    { initialState, backdrop: 'static', keyboard: false, class: 'modal-lg modal-dialog-centered forget-password' });
    }
    else{
      this.toastrService.error("Invalid OTP")
      
    }
    
        // this.bsModalRef = this.modalService.show(ForgetPasswordComponent,
        // { initialState, backdrop: 'static', keyboard: false, class: 'modal-lg modal-dialog-centered forget-password' });   
        
        // this.bsModalRef.content.onClose.subscribe(result => {
        //   if (result)
        //     this.router.navigate(["/reset-password-success"], {replaceUrl: true});
        //   else 
        //     this.router.navigate(["/login"], {replaceUrl: true});
        // })
           
  }

  
  Exit() {
    //this.bsModalRef.hide();
  }

}
