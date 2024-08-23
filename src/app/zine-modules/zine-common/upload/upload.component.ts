import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftApiConfigService } from 'src/app/core/services/weft-api-config.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public fileToUpload: File = null;

  public uploadForm: FormGroup;
  public fileParams;

  public fileName: any;

  constructor(private fb: FormBuilder, private httpService: WeftHttpService) { 
  }

  ngOnInit() {
  }

  agInit(fileParams): void {
    this.uploadForm = this.fb.group({
      imagePath: new FormControl(),
    });

    // if (fileParams.value != undefined) {
    //   this.uploadForm.controls["imagePath"].setValue(this.image);
    // }
    this.fileParams = fileParams;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    if (this.fileToUpload && this.fileParams.data) {
      this.fileName = this.fileParams.data["itemCode"] + "_" + this.fileParams.data["baseEntry"] + "_" + this.fileParams.data["baseLine"] + "_" +  this.fileToUpload.name.split(" ").join("-");
      const upload = new FormData();
      upload.append("image", this.fileToUpload);
      this.fileParams.data["imagePath"] = "Images/CreditNote/" + this.fileName;
      upload.append("filename", this.fileName);

      this.httpService.post(WeftAPIConfig.uploadCreditNoteItem, upload)
        .subscribe(() => { });
    }

    if (this.fileParams.onChange instanceof Function) {
      const params = {
        image: files,
        row: this.fileParams,
      };
      this.fileParams.onChange(params, this.fileToUpload);
    }
  }
}
