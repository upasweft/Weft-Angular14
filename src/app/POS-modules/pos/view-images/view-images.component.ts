import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.scss']
})
export class ViewImagesComponent implements OnInit {
  orginalImages: any[] = [];
  editedImages: any[] = [];
  resourceForm: any;
  submitted: boolean = false;
  images: any[] = [];
  loading: boolean = false;

  selectedImage: string | null = null;
  showModal: boolean = false;
  deleteModal: boolean = false;
  selectedImages: any[] = [];
  deleted: any[] = [];
  imageError: boolean = false;
  videoFiles: any;

  constructor(
    private httpService: WeftHttpService,
    private router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  get f() { return this.resourceForm.controls; }

  createForm() {
    this.resourceForm = this.fb.group({
      qrCode: new FormControl(""),
      image: new FormControl("")
    });
  }

  cancel() {
    this.submitted = false;
    this.resourceForm.reset();
  }

  onSubmit() {

    if (this.resourceForm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.submitted = false;
      if (this.resourceForm.get('image').value) {
        this.uploadImage();
      } else if (this.resourceForm.get('qrCode').value) {
        this.displayImages();
      }
    }
  }

  // openModal(imageSrc: string): void {
  //   this.showModal = true;
  //   this.selectedImage = imageSrc;
  // }

  // closeModal(): void {
  //   this.showModal = false;
  //   this.selectedImage = null;
  // }

  onImageChange(event: any) {
    this.loading = true;
    const file = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then(base64 => {
        this.resourceForm.patchValue({
          image: base64
        });
        this.resourceForm.get('image')?.updateValueAndValidity(); // Trigger validation
        this.loading = false;
      }).catch(error => {
        console.error('Error converting file to base64:', error);
        this.loading = false;
      });
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  uploadImage() {
    this.loading = true;
    this.imageError = false;

    const base64Image = this.resourceForm.get('image')?.value;
    const url = WeftAPIConfig.imageUploadService + '/s3bucket/image';
    this.httpService.post(url, { base64Image }).subscribe(
      (res: any) => {
        this.images = res;
        this.displayImagesFromResponse(this.images);
        this.loading = false;
      },
      err => {
        console.error('Upload failed:', err);
        this.toastrService.error('Image upload failed.');
        this.loading = false;
      }
    );
  }


  displayImages() {
    this.loading = true;
    this.httpService.get(WeftAPIConfig.imageUploadService + '/s3bucketdownload/database/' + this.resourceForm.controls['qrCode'].value)
      .subscribe(res => {
        this.images = res;
        this.loading = false;
        this.processImageResponse(res);
      }, err => {
        this.loading = false;
        this.toastrService.error('Failed to fetch images.');
      });
  }

  displayImagesFromResponse(res: any) {
    this.loading = true;
    this.processImageResponse(res);
  }

  processImageResponse(res: any) {
    if (res.length > 0) {
      this.orginalImages = res.filter((a: { photoType: number; imagePath: string; }) => a.photoType == 1 && this.isImageFile(a.imagePath));
      this.editedImages = res.filter((a: { photoType: number; imagePath: string; }) => a.photoType == 0 && this.isImageFile(a.imagePath));
      this.videoFiles = res.filter((a: { imagePath: string; }) => this.isVideoFile(a.imagePath));
    } else if (res.length === 0) {
      this.toastrService.warning("No Images Found");
    } else {
      this.toastrService.warning("Invalid QR Code");
    }
  }

  // Helper method to determine if the path is an image
  isImageFile(filePath: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  }

  // Helper method to determine if the path is a video
  isVideoFile(filePath: string): boolean {
    return /\.(mp4|avi|mov|wmv)$/i.test(filePath);
  }


  // Select all original images
  selectAllOriginalImages(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.orginalImages.forEach(image => {
        image.selected = true;
        if (!this.deleted.includes(image.orginalImagePath)) {
          this.deleted.push(image.orginalImagePath);
        }
      });
    } else {
      this.orginalImages.forEach(image => {
        image.selected = false;
        const index = this.deleted.indexOf(image.orginalImagePath);
        if (index !== -1) {
          this.deleted.splice(index, 1);
        }
      });
    }
  }

  // Select all edited images
  selectAllEditedImages(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.editedImages.forEach(image => {
        image.selected = true;
        if (!this.deleted.includes(image.imagePath)) {
          this.deleted.push(image.imagePath);
        }
      });
    } else {
      this.editedImages.forEach(image => {
        image.selected = false;
        const index = this.deleted.indexOf(image.imagePath);
        if (index !== -1) {
          this.deleted.splice(index, 1);
        }
      });
    }
  }

  // Select all videos
  selectAllVideos(event: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.videoFiles.forEach((video: { selected: boolean; imagePath: any; }) => {
        video.selected = true;
        if (!this.deleted.includes(video.imagePath)) {
          this.deleted.push(video.imagePath);
        }
      });
    } else {
      this.videoFiles.forEach((video: { selected: boolean; imagePath: any; }) => {
        video.selected = false;
        const index = this.deleted.indexOf(video.imagePath);
        if (index !== -1) {
          this.deleted.splice(index, 1);
        }
      });
    }
  }

  // Handle individual checkbox change for image or video
  onCheckboxChange(imagePath: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.deleted.push(imagePath);
    } else {
      const index = this.deleted.indexOf(imagePath);
      if (index !== -1) {
        this.deleted.splice(index, 1);
      }
    }
  }

onDelete() {
  if (this.deleted.length > 0) {
    this.deleteModal = true;
  } else {
    this.toastrService.warning("No items selected for deletion.");
  }
}


closeModalDelete() {
  this.deleteModal = false; 
  this.displayImages();
}


onYes() {
  if (this.deleted && this.deleted.length > 0) {
    const apiUrl = `${WeftAPIConfig.imageUploadService}/deletes3`;

    this.httpService.post(apiUrl, this.deleted).subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
      
          this.toastrService.success(res.message || "Items deleted successfully.");
          this.displayImages();
        } else {
          
          this.toastrService.warning(res.message || "Failed to delete the items.");
        }
     
        this.closeModalDelete();
      },
      (error) => {
        // Handle error
        this.toastrService.error("An error occurred while deleting items.");
        this.closeModalDelete();
      }
    );
  } else {
    this.toastrService.warning("No items selected for deletion.");
    this.closeModalDelete();
  }
  this.closeModalDelete();
 
}



openModal(imagePath: string) {
  this.selectedImage = imagePath;
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
  this.selectedImage = null;
}
}