import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-usedqrview',
  templateUrl: './usedqrview.component.html',
  styleUrls: ['./usedqrview.component.scss']
})
export class UsedqrviewComponent implements OnInit {
  @Input() id: any;
  invoice: any;
  editedImages: any;
  loading: boolean;
  constructor(private httpService: WeftHttpService, private bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.getInvoice();
  }
  getInvoice() {
    this.loading=true;
    this.httpService.get(WeftAPIConfig.imageUploadService + '/s3bucketdownload/database/' + this.id).subscribe(res => {
      this.editedImages = res;
      this.loading=false;
      console.log(this.editedImages)
    })
  }
  close(){
    this.bsModalRef.hide();
  }
}
