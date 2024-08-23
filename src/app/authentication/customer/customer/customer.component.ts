import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  resourceForm: any;
  submitted = false;
  qrCode = ''; // To store QR code

  constructor(
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
      image: new FormControl('')
    });
  }

  get f() { return this.resourceForm.controls; }

  onSubmit() {
    if (this.resourceForm.invalid) {
      this.submitted = true;
      return;
    }

    this.qrCode = this.resourceForm.value.qrCode;
    this.router.navigate(['/viewphoto'], {
      queryParams: {
        qrCode: this.qrCode
      }
    });
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; // Extract Base64 string
        let mimeType = '';
  
        // Determine the MIME type based on the file extension
        if (file.type === 'image/jpeg') {
          mimeType = 'data:image/jpeg;base64,';
        } else if (file.type === 'image/png') {
          mimeType = 'data:image/png;base64,';
        } else if (file.type === 'image/gif') {
          mimeType = 'data:image/gif;base64,';
        } else {
          console.error('Unsupported image format:', file.type);
          return;
        }
  
        // Create full Base64 string with prefix
        const base64Image = mimeType + base64String;
  
        // Navigate with the Base64 image and optional QR code
        this.router.navigate(['/viewphoto'], {
          queryParams: {
            qrCode: this.qrCode, 
            image: base64Image
          }
        });
      };
  
      reader.readAsDataURL(file);
    }
  }
}  
