import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftConfig } from 'src/app/core/weft-config';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  public resourceForm!: FormGroup;
  submitted: boolean = false;
  editted: boolean = false;
  resourceGetByIdApi: string = WeftAPIConfig.subcategoryService + "/";
  resourceCreateApi: string = WeftAPIConfig.subcategoryService;
  resourceCreateUserApi: string = WeftAPIConfig.subcategoryService;
  resourceUpdateApi: string = WeftAPIConfig.subcategoryService;
  resourceKey: string = 'subcategoryId';
  resourceKeyValue!: number;
  resourceName: string = 'Subcategory';
  resourceManagementNavPath: string = "/admin/subcategory-management";
  logggedInUser: any;
  categories: any;

  constructor(private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService) {

  }

  ngOnInit() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this.logggedInUser = userLoggedIn ? JSON.parse(userLoggedIn) : null;
    if (this.route.snapshot.paramMap.get(this.resourceKey)) {
      this.route.paramMap.subscribe((params) => {
        this.resourceKeyValue = Number(params.get(this.resourceKey));
      });
    }
    this.createForm();
    this.getCategories()
  }
  getCategories() {
    this.httpService.get(WeftAPIConfig.categoryService).subscribe(res => {
      this.categories = res.filter((s: { status: any; }) => s.status)
      this.categories.sort((a: { categoryName: number; }, b: { categoryName: number; }) => (a.categoryName > b.categoryName) ? 1 : -1);
    })
  }
  createForm() {
    if (this.resourceKeyValue > 0) {
      this.getResourceById();
    }
    else {
      this.resourceForm = this.fb.group({
        subCategoryCode: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(10)])),
        subCategoryName: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(150)])),
        categoryId: new FormControl(null, Validators.required),
        createdBy: new FormControl(null),
        status: new FormControl(true)
      });
    }
  }
  onCategorySelect(event: any) {

  }
  getResourceById() {
    this.httpService.get(this.resourceGetByIdApi + this.resourceKeyValue).subscribe(x => {
      this.editted = true;
      this.resourceForm = this.fb.group({
        resourceKeyValue: new FormControl({ value: x[this.resourceKey], disabled: true }),
        subCategoryCode: new FormControl({ value: x["subcategoryCode"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(10)])),
        subCategoryName: new FormControl({ value: x["subcategoryName"], disabled: false }, Validators.compose([Validators.required, Validators.maxLength(150)])),
        categoryId: new FormControl({ value: x["categoryId"], disabled: false }),
        status: new FormControl({ value: x["status"] },),
        lastModifiedBy: new FormControl(this.logggedInUser.sub),
      });
      if (x['status'] == false) {
        this.resourceForm.controls['status'].setValue(false);
      }
      else {
        this.resourceForm.controls['status'].setValue(true);
      }
      this.getCategories()
    })
  }

  get f() { return this.resourceForm.controls; }

  onSubmit() {
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
    dataToPost['createdBy'] = this.logggedInUser.sub;

    if (this.resourceForm.invalid) {
      return;
    }
    else {
      this.submitted = false;
      if (this.resourceKeyValue > 0) {
        dataToPost[this.resourceKey] = this.resourceKeyValue;
        this.resourceForm.reset();
        this.httpService.put(this.resourceUpdateApi, dataToPost).subscribe((x) => {
          if (x.statusCode == 500) {
            this.toastrService.error(x.message, 'Fail');
          }
          else {
            this.toastrService.success('SubCategory Updated Successfully', 'Success');
            this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
      else {
        this.resourceForm.reset();
        this.httpService.post(this.resourceCreateApi, dataToPost).subscribe((x) => {
          if (x.statusCode == 500) {
            this.toastrService.error(x.message, 'Fail');
          }
          else {
            this.resourceForm.reset();
            this.toastrService.success('SubCategory Created Successfully', 'Success');
            this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
          }
        });
      }
    }
  }

  cancel() {
    this.submitted = false;
    this.resourceForm.reset();
    this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
  }

  changeTextToUppercase(field: string): void {
    const obj: { [key: string]: any } = {};
    obj[field] = this.resourceForm.controls[field].value.toUpperCase();
    this.resourceForm.patchValue(obj);
  }
}
