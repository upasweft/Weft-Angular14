import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-invoicecreate',
  templateUrl: './invoicecreate.component.html',
  styleUrls: ['./invoicecreate.component.scss']
})
export class InvoicecreateComponent implements OnInit {
  public resourceForm!: FormGroup;
  submitted!: boolean;
  qrCodeValue: any;
  images: any = [];
  invoiceItems: any;
  items: any;
  categories: any;
  selectedCategoryId: any;
  dataSource: any = [];
  selectedProduct: any;
  loggedInUser: any;
  user: any;
  precentage!: boolean;
  Payment: any = [];
  selectedProductId: any;
  resourceManagementNavPath: string = "/admin/invoice-management";
  cash: boolean = false;
  card: boolean = true;

  constructor(
    private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    this.loggedInUser = userLoggedIn ? JSON.parse(userLoggedIn) : null;
    this.createForm();
    this.getCategories();
    this.getUserDeatils();
    this.Payment = [
      { id: 1, "paymentMode": "Cash", },
      { id: 2, "paymentMode": "Card", },
      { id: 3, "paymentMode": "Card+Cash", },
    ]

  }
  getUserDeatils() {
    this.httpService.get(WeftAPIConfig.userService + '/profile/' + this.loggedInUser.info.sub).subscribe(res => {
      this.user = res;
    }
    )
  }

  onPaymentSelect(event: { paymentMode: string; }) {
    if (event.paymentMode == 'Cash') {
      this.cash = true;
      this.card = false;
      this.resourceForm.controls['cashAmount'].setValue(this.resourceForm.controls['rececivedAmount'].value)
      this.resourceForm.controls['authorizationCode'].setValue(" ")
    }
    else if (event.paymentMode == 'Card') {
      this.cash = false;
      this.card = true;
      this.resourceForm.controls['cardAmount'].setValue(this.resourceForm.controls['rececivedAmount'].value)
    }
    else {
      this.cash = true;
      this.card = true;
      this.resourceForm.controls['cardAmount'].setValue(this.resourceForm.controls['rececivedAmount'].value)
    }

  }

  getCategories() {
    this.httpService.get(WeftAPIConfig.categoryService).subscribe(res => {
      this.categories = res.filter((s: { status: any; }) => s.status)
      this.categories.sort((a: { categoryName: number; }, b: { categoryName: number; }) => (a.categoryName > b.categoryName) ? 1 : -1);
    })
  }

  changeTextToUppercase(field: string): void {
    const obj: { [key: string]: any } = {};
    obj[field] = this.resourceForm.controls[field].value.toUpperCase();
    this.resourceForm.patchValue(obj);
  }

  onCategorySelect(event: { categoryId: any; }) {
    this.selectedCategoryId = event.categoryId;
    this.resourceForm.controls['productId'].setValue(null)
    this.resourceForm.controls['price'].setValue(null)
    this.getItemData();
  }
  get f() {
    return this.resourceForm.controls;
  }
  onCreateClick() {
    //  this.submitted = true
    if (this.resourceForm.controls['quantity'].value == null || this.resourceForm.controls['price'].value == null
      || this.resourceForm.controls['productId'].value == null || this.resourceForm.controls['categoryId'].value == null) {
      return;
    }

    this.dataSource.push({
      productName: this.selectedProduct,
      productId: this.selectedProductId,
      quantity: this.resourceForm.controls['quantity'].value,
      price: this.resourceForm.controls['price'].value,
      amount: this.resourceForm.controls['price'].value * this.resourceForm.controls['quantity'].value,
      createdBy: this.loggedInUser.sub,
      status: true,
    })

    const totalAmount = this.dataSource.reduce((total: any, item: { amount: any; }) => total + item.amount, 0);
    this.resourceForm.controls['subTotal'].setValue(totalAmount)
    const vat = (this.user.siteSettings.vat / 100) * this.resourceForm.controls['subTotal'].value
    this.resourceForm.controls['vatAmount'].setValue(vat)
    const netAmount = totalAmount + vat;
    this.resourceForm.controls['rececivedAmount'].setValue(netAmount)
    this.resourceForm.controls['cardAmount'].setValue(netAmount)

    this.resourceForm.controls['quantity'].setValue(null);
    this.resourceForm.controls['price'].setValue(null);
    this.resourceForm.controls['productId'].setValue(null);
    this.resourceForm.controls['categoryId'].setValue(null);
  }


  createForm() {
    this.resourceForm = this.fb.group({
      qrCodeData: new FormControl(null, Validators.required),
      price: new FormControl(null),
      quantity: new FormControl(null),
      categoryId: new FormControl(null),
      productId: new FormControl(null),
      // grandTotal: new FormControl(null, Validators.required),
      subTotal: new FormControl(null, Validators.required),
      discount: new FormControl(0, Validators.required),
      inPrecentage: new FormControl(false),
      precentage: new FormControl(0),
      vatAmount: new FormControl(null, Validators.required),
      rececivedAmount: new FormControl(null, Validators.required),
      discountAmount: new FormControl(0, Validators.required),
      paymentMode: new FormControl('card', Validators.required),
      cardAmount: new FormControl(null, Validators.required),
      cashAmount: new FormControl(0, Validators.required),
      balance: new FormControl(0),
      authorizationCode: new FormControl(null, Validators.required),
      email: new FormControl(""),
      phone: new FormControl(""),
      guest: new FormControl(""),
      photoCode: new FormControl("")
      // images: this.fb.array([]) // Initialize as an empty array
    });
    this.invoiceItems = {
      invoiceItemId: 0,
      InvoiceId: 0,
      ProductId: 0,
      Quantity: 0,
      price: 0,
      amount: 0,
      discount: 0,

    }

  }
  onDiscountChange() {
    const discountValue = this.resourceForm.controls['discount'].value;
    const grossTotal = this.resourceForm.controls['subTotal'].value;
    const vatFixed = 2; // Assuming VAT is a fixed amount

    let netAmount: number;

    if (this.precentage) {
      const prec = grossTotal * discountValue / 100;
      this.resourceForm.controls['precentage'].setValue(prec);
      //const adjustedGrossTotal = grossTotal + discountValue;
      const vat = ((this.user.siteSettings.vat / 100) * (this.resourceForm.controls['subTotal'].value - this.resourceForm.controls['discount'].value)).toFixed(2);
      this.resourceForm.controls['vatAmount'].setValue(parseFloat(vat));
      netAmount = grossTotal + parseFloat(vat) - prec;
    } else {
      const prec = grossTotal - discountValue;
      this.resourceForm.controls['precentage'].setValue(prec);
      const vat = (this.user.siteSettings.vat / 100) * this.resourceForm.controls['subTotal'].value
      this.resourceForm.controls['vatAmount'].setValue(vat)
      netAmount = grossTotal + vat - discountValue;
    }

    this.resourceForm.controls['rececivedAmount'].setValue(netAmount);
    this.resourceForm.controls['cardAmount'].setValue(netAmount);
  }




  onPrecentageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
        this.precentage = true;
        const subTotal = this.resourceForm.controls['subTotal'].value;
        const discount = this.resourceForm.controls['discount'].value;
        const prec = subTotal * discount / 100;
        this.resourceForm.controls['precentage'].setValue(prec);
        const vat = ((this.user.siteSettings.vat / 100) * (subTotal - discount)).toFixed(2);
        this.resourceForm.controls['vatAmount'].setValue(parseFloat(vat));
    } else {
        this.precentage = false;
        const subTotal = this.resourceForm.controls['subTotal'].value;
        const discount = this.resourceForm.controls['discount'].value;
        const prec = subTotal - discount;
        this.resourceForm.controls['precentage'].setValue(prec);
        const vat = (this.user.siteSettings.vat / 100) * subTotal;
        this.resourceForm.controls['vatAmount'].setValue(vat);
    }
}


  onEnterKeyPressed(event: { preventDefault: () => void; }) {
    event.preventDefault();
    this.qrCodeValue = this.resourceForm.controls['qrCodeData'].value;
    this.displayImages();

  }
  onProductSelect(event: { productName: any; productId: any; price: any; }) {
    this.resourceForm.controls['price'].setValue(null)
    this.selectedProduct = event.productName;
    this.selectedProductId = event.productId;
    this.resourceForm.controls['price'].setValue(event.price)
  }
  getItemData(): any {
    this.httpService.get(WeftAPIConfig.productService).subscribe(result => {
      if (result) {
        this.items = result.filter((a: { categoryId: any; }) => a.categoryId == this.selectedCategoryId)
      }
    })
  }
  selectAllImages(event: any) {
    const allSelected = this.images.every((image: { selected: any; }) => image.selected);
    this.images.forEach((image: { selected: boolean; }) => image.selected = !allSelected);
  }

  displayImages() {
    console.log(this.qrCodeValue)
    this.httpService
      .get(WeftAPIConfig.imageUploadService + '/s3bucketdownload/database/' + this.qrCodeValue)
      .subscribe((res) => {
        this.images = res;
        if (this.images.length === 0) {
          this.resourceForm.controls['qrCodeData'].setValue(null)
          this.toastrService.warning('No Images in this QrCode');
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
    dataToPost['invoiceItems'] = this.dataSource;
    dataToPost['createdBy'] = this.loggedInUser.info.sub;

    if (this.resourceForm.invalid) {

      return;
    }
    else {
      this.resourceForm.reset();
      this.httpService.post(WeftAPIConfig.invoiceService, dataToPost).subscribe(res => {
        if (res) {
          this.toastrService.success("Invoice Created Sucessfully")
          this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
        }
      })
    }
  }
}
