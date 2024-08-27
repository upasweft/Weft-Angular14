import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-contactus-create',
  templateUrl: './contactus-create.component.html',
  styleUrls: ['./contactus-create.component.scss']
})
export class ContactusCreateComponent implements OnInit {
  public resourceForm!: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
 resourceGetApi : string = WeftAPIConfig.contactUsService+"/allContactUs";
  resourceGetByIdApi: string = WeftAPIConfig.contactUsService + "/";
  resourceCreateApi: string = WeftAPIConfig.contactUsService;
  resourceUpdateApi: string = WeftAPIConfig.contactUsService;
  inspectionTypeServiceApi : string = WeftAPIConfig.contactUsService;

  resourceKey: string = 'contactUsId';
  resourceKeyValue!: number;
  resourceName: string = 'ContactUs';
 
  logggedInUser: any;
  readOnlyUserName: boolean = false;
  hideSubmitFromBranchUser!: boolean;
  imgExtensionWrong!: boolean;
  inspectionTypes: any=[];
  contactUs: any;
  

  constructor(private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService) {
  
  }

  async ngOnInit() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this.logggedInUser = userLoggedIn ? JSON.parse(userLoggedIn) : null;
    await this.getContactUs();
   
  }
 async getContactUs() {
   return await (this.httpService.get(this.resourceGetApi)).toPromise().then(result => {
      if (result) {
        this.contactUs = result;
        if(this.contactUs!=null && this.contactUs.length>0)
        {
          this.contactUs.forEach((contact: { contactUsId: number; }) => {
            this.resourceKeyValue = contact.contactUsId;
          });
        }
        if (this.resourceKeyValue > 0) {
          this.getResourceById();
        }
        else{
          this.createForm();
        }
      }
    })
   
  }
  get f() { return this.resourceForm.controls; }

  createForm() {
    
      this.resourceForm = this.fb.group({
        contactUsId: new FormControl(null),
        contactNumber: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(100)])),
        contactEmail:new FormControl("", Validators.compose([Validators.required])),
        contactAddress: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(100)])),
        createdBy: new FormControl(null),
        status: new FormControl(true),
      });
    
  }
  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      console.log(x)
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        contactUsId: new FormControl({ value: x["contactUsId"], disabled: false }, Validators.compose([Validators.required])),
        contactNumber: new FormControl({ value: x["contactNumber"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(100)])),
        contactEmail: new FormControl({ value: x["contactEmail"], disabled: false }, Validators.compose([Validators.required])),
        contactAddress: new FormControl({ value: x["contactAddress"], disabled: false }, Validators.compose([Validators.required])),
        status: new FormControl({ value: x["status"] },),
        lastModifiedBy: new FormControl(this.logggedInUser.sub),
      });
      if (x['status'] == false){
        this.resourceForm.controls['status'].setValue(false);
      }
      else{
        this.resourceForm.controls['status'].setValue(true);
      }
     
    })
   
  }



  onSubmit() {
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
    dataToPost['createdBy'] = this.logggedInUser.sub;
    dataToPost['lastModifiedBy'] ="";
    if (this.resourceForm.invalid) {
      return;
    }
    else {
      this.submitted = false;
      if (this.resourceKeyValue > 0) {
        dataToPost[this.resourceKey] = this.resourceKeyValue;
        dataToPost['lastModifiedBy'] = this.logggedInUser.sub;
        this.resourceForm.reset();
        this.httpService.put(this.resourceUpdateApi, dataToPost).subscribe((x) => {
          if(x.statusCode == 500){
            this.toastrService.error(x.message, 'Fail');
          }
          else{
          this.toastrService.success('Contact Us Updated Successfully', 'Success');
          this.getContactUs();
          // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
      else {
        dataToPost['contactUsId'] =0;
        this.resourceForm.reset();
        this.httpService.post(this.resourceCreateApi, dataToPost).subscribe((x) => {
          if(x.statusCode == 500){
            this.toastrService.error(x.message, 'Fail');
          }
          else{
            this.resourceForm.reset();
            this.toastrService.success('Contact Us Created Successfully', 'Success');
            this.getContactUs();
            // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }         
        });
      }
    }
  }

  async cancel() {
    this.submitted = false;
    this.resourceForm.reset();
    await this.getContactUs();
    // this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
  }

  changeTextToUppercase(field: string): void {
    const obj: { [key: string]: any } = {};
    obj[field] = this.resourceForm.controls[field].value.toUpperCase();
    this.resourceForm.patchValue(obj);
  }
  
}
