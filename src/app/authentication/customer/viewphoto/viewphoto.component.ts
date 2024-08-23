import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as JSZip from 'jszip';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-viewphoto',
  templateUrl: './viewphoto.component.html',
  styleUrls: ['./viewphoto.component.scss']
})
export class ViewphotoComponent implements OnInit {
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  loading!: boolean;
  orginalImages: any = [];
  editedImages: any = [];
  resourceForm: any;
  submitted!: boolean;
  qrCodes: any = [];
  resourceKey: string = 'qrCode';
  resourceKeyValue: any;
  watermark!: boolean;
  qrStatatus!: boolean;
  base64Image: any;
  videoFiles: any;
  constructor(private httpService: WeftHttpService,
    private router: Router, private http: HttpClient,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.resourceKeyValue = params['qrCode']||null;
      this.base64Image = params['image']||null; // Extract the base64 image string
    });

    if (this.resourceKeyValue) {
      this.getQrBasedImage();
    } else if (this.base64Image) {
      this.uploadImage();
    }
  }
  addWatermark(imageUrl: string, watermarkText: string): void {
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) { // Ensure context is not null
      const image = new Image();
      image.crossOrigin = 'anonymous'; // Enable CORS for the image
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0); // Draw the original image

        // Draw the watermark text
        context.font = '30px Arial';
        context.fillStyle = 'rgba(255, 255, 255, 0.5)'; // Semi-transparent white
        context.fillText(watermarkText, 10, canvas.height - 10); // Position the watermark text

        // Convert canvas to data URL
        const watermarkedImageUrl = canvas.toDataURL('image/jpeg');
        
        // Now you can use watermarkedImageUrl as the source of your watermarked image
      };

      image.src = imageUrl;
    }
  }

   uploadImage() {
    this.loading = true; 
    const base64Image = this.base64Image;
    console.log("this.qrcode", this.qrCodes);

    const url = WeftAPIConfig.imageUploadService + '/s3bucket/image';
    this.httpService.post(url, { base64Image }).subscribe(
      (res: any) => {
        this.qrCodes = res;
        this.loading = false;

        if (this.qrCodes.length > 0) {
          this.editedImages = res.filter((a: { photoType: number; imagePath: string; }) => a.photoType === 0 && (a.imagePath.endsWith('.jpg') || a.imagePath.endsWith('.png')));
          this.editedImages = this.editedImages.length === 0 ? res : this.editedImages;
          this.videoFiles = res.filter((a: { imagePath: string; }) => a.imagePath.endsWith('.mp4'));
          this.qrStatatus = this.qrCodes[0].qrStatus !== 0;
        } else {
          this.orginalImages = null;
          this.editedImages = null;
          this.videoFiles = null;
          this.toastrService.warning("No Images or Videos Found");
        }
      },
      error => {
        this.loading = false;
        console.error("Error uploading image:", error);
        this.toastrService.error("Error uploading image");
      }
    );
  }

  
  getQrBasedImage() {
    this.loading = true;
    
    this.httpService.get(WeftAPIConfig.imageUploadService + '/s3bucketdownload/database/' + this.resourceKeyValue).subscribe(res => {
      this.qrCodes = res;
      console.log("this.qrcode", this.qrCodes);
      this.loading = false;

      if (this.qrCodes.length > 0) {
        this.editedImages = res.filter((a: { photoType: number; imagePath: string; }) => a.photoType === 0 && (a.imagePath.endsWith('.jpg') || a.imagePath.endsWith('.png'))); 
        this.editedImages = this.editedImages.length === 0 ? res : this.editedImages;
        this.videoFiles = res.filter((a: { imagePath: string; }) => a.imagePath.endsWith('.mp4'));

        this.qrStatatus = this.qrCodes[0].qrStatus !== 0;
      } else {
        this.orginalImages = null;
        this.editedImages = null;
        this.videoFiles = null;
        this.toastrService.warning("No Images or Videos Found");
      }
    });
  }

  selectAll(event: any) {
    const allSelected = this.editedImages.every((image: { selected: any; }) => image.selected);
    this.editedImages.forEach((image: { selected: boolean; }) => image.selected = !allSelected);
  }

 getFilenameFromResponse(response: HttpResponse<any>): string {
    const contentDispositionHeader = response.headers.get('content-disposition');
    if (contentDispositionHeader) {
      const matches = contentDispositionHeader.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (matches && matches.length > 1 && matches[1]) {
        return matches[1].replace(/['"]/g, '');
      }
    }
    return 'downloaded_images.zip'; // Default filename if not found in headers
  }

  onCheckboxChange(event: Event, image: any): void {
    const target = event.target as HTMLInputElement;
    // Ensure that the target is not null
    if (target) {
      const checked = target.checked;
      console.log(`Checkbox changed: ${checked} for image:`, image);
      // Update the image selection based on checkbox change
      image.selected = checked;
    }
  }


  downloadAllSelectedImages(): void {
    if (this.qrStatatus) {
      const selectedImagePaths: any[] = [];

      this.editedImages.forEach((image: { selected: any; imagePath: string | null; orginalImagePath: string | null; }) => {
        if (image.selected) {
          if (image.imagePath && image.imagePath !== "null") {
            selectedImagePaths.push(image.imagePath);
          } else if (image.orginalImagePath) {
            selectedImagePaths.push(image.orginalImagePath);
          }
        }
      });
      if (selectedImagePaths.length === 0) {
        this.toastrService.warning("No images selected for download");
        return;
      }

      this.httpService.post(WeftAPIConfig.imageUploadService + '/download', selectedImagePaths)
        .subscribe(response => {
          const zipFileBase64: string = response.zipFileData;
          const zipFileData: Uint8Array = this.base64ToArrayBuffer(zipFileBase64);
          const blob = new Blob([zipFileData], { type: 'application/zip' });
         
          // Create a URL for the Blob object
          const url = window.URL.createObjectURL(blob);

          // Create a link element to trigger the download
          const link = document.createElement('a');
          link.href = url;
          link.download = 'downloaded_images.zip';
          document.body.appendChild(link); // Required for Firefox
          link.click();

          // Clean up
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        });
    } else {
      this.toastrService.warning("QR code not paid. Please make the payment to access images.");
    }
  }

  private base64ToArrayBuffer(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  downloadFile(data: Blob): void {
    
    const blob = new Blob([data], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    window.open(url); // Opens the file download dialog
  }

  downloadImage(imageUrl: string): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imageUrl, true);
    xhr.responseType = 'blob';

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        saveAs(blob, 'image.jpg');
      }
    };

    xhr.send();
  }

  printSelectedImages(): void {
    if (this.qrStatatus == true) {
      const selectedImages = this.editedImages.filter((image: { selected: any; }) => image.selected);
      if (selectedImages.length === 0) {
        this.toastrService.warning("No images selected for printing");
        return;
      }


      let htmlContent = '<html><head><title>Print Images</title>';
      htmlContent += '<style>';
      htmlContent += 'img { width: auto; height: auto; max-width: 100%; max-height: 100%; }';
      htmlContent += 'body { display: flex; flex-direction: column; align-items: center; }'; // Center the images
      htmlContent += '</style>';
      htmlContent += '</head><body>';

      selectedImages.forEach((image: { base64Image: any; }) => {
        htmlContent += `<img src="${image.base64Image}" /><br>`;
      });
      htmlContent += '</body></html>';

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.print();
      }
    } else {
      this.toastrService.warning("QR code not paid. Please make the payment to access images.");
    }
  }
  disableRightClick(event: MouseEvent): void {
    event.preventDefault();
  }


}


