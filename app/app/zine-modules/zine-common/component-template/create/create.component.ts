import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import { WeftApiConfigService } from 'src/app/core/services/weft-api-config.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  resourceName: string = '';
  resourceForm: FormGroup;
  resourceKey: string = '';
  resourceKeyValue: number;
  resourceGetByIdApi:string = '';
  resourceCreateApi:string = '';
  resourceUpdateApi:string = '';
  resourceManagementNavPath:string = '';
  
  submitted: boolean = false;
  
  constructor(private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get(this.resourceKey)) {
      this.route.paramMap.subscribe((params) => {
        this.resourceKeyValue = Number(params.get(this.resourceKey));
      });
    }
    this.createForm();
  }

  createForm() {
    if (this.resourceKeyValue > 0) {
      this.getResourceById();
    }
    else {
      this.resourceForm = this.fb.group({
        code: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)])),
        name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)]))
      })
    }
  }

  get f() { return this.resourceForm.controls; }

  onSubmit() {
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
    if (this.resourceForm.invalid) {
      return;
    }
    if (this.resourceKeyValue > 0) {
      dataToPost[this.resourceKey] = this.resourceKeyValue;

      // dataToPost['code']=this.resourceForm.controls['code'].value;
      
      this.httpService.put(this.resourceUpdateApi, dataToPost).subscribe((x) => {
        this.toastrService.success(this.resourceName+ ' updated successfully','Success');
        this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
      });
    } else {
      this.httpService
      .post(this.resourceCreateApi, dataToPost)
      .subscribe(() => {
        this.resourceForm.reset();
        this.toastrService.success(this.resourceName+ ' created successfully','Success');
        this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
      });
    }
  }

  cancel() {
    this.submitted = false;
    this.resourceForm.reset();
    this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
  }

  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
      });
    })
  }
}
