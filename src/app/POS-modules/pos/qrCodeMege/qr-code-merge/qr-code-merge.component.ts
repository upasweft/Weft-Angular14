import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-qr-code-merge',
  templateUrl: './qr-code-merge.component.html',
  styleUrls: ['./qr-code-merge.component.scss']
})
export class QrCodeMergeComponent implements OnInit {
  public resourceForm!: FormGroup;
  submitted = false;
  images: any = [];
  resourceManagementNavPath = "/admin/viewImage";
  qrCodeValueSecond!: string;
  imagesSecond: any;
  qrCodesList: string[] = [];
  
  constructor(
    private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.resourceForm = this.fb.group({
      qrCode: new FormControl('', Validators.required),
      newQrCode: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.resourceForm.controls as {
      [key: string]: FormControl;
    };
  }

  onEnterKeyPressed() {
    const qrCodeInput = this.resourceForm.get('qrCode')?.value || '';
    const newQrCodes = qrCodeInput.split(',').map((qrCode: string) => qrCode.trim());

    newQrCodes.forEach((qrCode: string) => {
      if (!this.qrCodesList.includes(qrCode)) {
        this.qrCodesList.push(qrCode);
        this.displayImages(qrCode);
      }
    });
  }

  displayImages(qrCode: string) {
    this.httpService.get(WeftAPIConfig.imageUploadService + '/s3bucketdownload/database/' + qrCode).subscribe(res => {
      this.images = [...this.images, ...res];
      if (this.images.length === 0) {
        this.toastrService.warning('No Images in this QrCode');
      }
    });
  }

  displayImagesSecond() {
    this.httpService.get(WeftAPIConfig.imageUploadService + '/s3bucketdownload/database/' + this.qrCodeValueSecond).subscribe(res => {
      this.imagesSecond = res;
      if (this.imagesSecond.length === 0) {
        this.toastrService.warning('No Images in this QrCode');
      }
    });
  }

  onEnterKeyPressedqrCodeSecond() {
    this.qrCodeValueSecond = this.resourceForm.get('qrCodeSecond')?.value || '';
    this.displayImagesSecond();
  }

  onSubmit() {
    this.submitted = true;
    const dataToPost = this.resourceForm.value;
    dataToPost['qrCode'] = this.qrCodesList;

    if (this.resourceForm.invalid) {
      return;
    }

    this.httpService.post(WeftAPIConfig.imageUploadService + '/merge', dataToPost).subscribe(res => {
      if (res.statusCode === 200) {
        this.toastrService.success('Image Copied Successfully');
        this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
      } else {
        this.toastrService.warning(res.message);
      }
    });
  }

  cancel() {
    // Cancel logic here
  }
}
