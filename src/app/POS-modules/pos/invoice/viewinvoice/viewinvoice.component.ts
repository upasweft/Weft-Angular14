import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-viewinvoice',
  templateUrl: './viewinvoice.component.html',
  styleUrls: ['./viewinvoice.component.scss']
})
export class ViewinvoiceComponent implements OnInit {
  @Input() id: any;
  invoice: any;
  constructor(private httpService: WeftHttpService, private bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.getInvoice();
  }
  getInvoice() {
    this.httpService.get(WeftAPIConfig.invoiceService + '/' + this.id).subscribe(res => {
      this.invoice = res;
    })
  }
  close(){
    this.bsModalRef.hide();
  }
}
