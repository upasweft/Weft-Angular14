import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import jsPDF, * as jspdf from 'jspdf';

@Component({
  selector: 'app-invoice-pdf',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.scss']
})
export class InvoicePdfComponent implements OnInit {
  resourceKey: string = 'invoiceId';
  resourceKeyValue: string = "";
  invoice: any;
  imgWidth!: number;
  imgHeight!: number;
  pageHeight!: number;
  heightLeft!: number;
  position: any;

  constructor(private httpService: WeftHttpService,
    private router: Router,
    public route: ActivatedRoute,private metaService: Meta,
    private toastrService: ToastrService) { }

    ngOnInit() {
      const resourceKeyValue = this.route.snapshot.paramMap.get(this.resourceKey);
      if (resourceKeyValue) {
          this.resourceKeyValue = resourceKeyValue;
          this.getInvoiceData(this.resourceKeyValue);
      } else {
          // Handle the case where the parameter is not present
          console.error('Resource key value is missing');
      }
  }
  
  getInvoiceData(id:any){
    this.httpService.get(WeftAPIConfig.invoiceService+'/'+ id).subscribe(result => {
      console.log(result)
      if (result) {
        this.invoice = result;
      }
      else {
        this.toastrService.warning('Invalid link', 'Warning');
      }
    });
  }
  generatePDF() {
    const data = document.getElementById('printInvDataA4');
    if (data) { // Check if data is not null
      html2canvas(data).then((canvas) => {
        this.imgWidth = 200;
        this.imgHeight = (canvas.height * this.imgWidth / canvas.width);
        this.pageHeight = 295;
        this.heightLeft = this.imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        this.position = 0;
        pdf.addImage(contentDataURL, 'PNG', 5, this.position, this.imgWidth, this.imgHeight, '', 'FAST');
        this.heightLeft -= this.pageHeight;
        while (this.heightLeft >= 0) {
          this.position = this.heightLeft - this.imgHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, 'PNG', 5, this.position, this.imgWidth, this.imgHeight);
          this.heightLeft -= this.pageHeight;
        }
        pdf.save(this.invoice.invoiceNumber + '.pdf');
        this.toastrService.success('File downloaded successfully!', 'Success');
      }).catch(err => {
        console.error('Error generating PDF:', err);
        this.toastrService.error('Error generating PDF', 'Error');
      });
    } else {
      console.error('Element with id "printInvDataA4" not found');
      this.toastrService.warning('Element not found', 'Warning');
    }
  }
  
  
}
