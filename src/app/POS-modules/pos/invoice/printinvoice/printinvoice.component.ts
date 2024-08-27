import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

interface InvoiceItem {
  quantity: string;
  amount: string;
}
@Component({
  selector: 'app-printinvoice',
  templateUrl: './printinvoice.component.html',
  styleUrls: ['./printinvoice.component.scss']
})
export class PrintinvoiceComponent implements OnInit {
  resourceKey: string = 'invoiceId';
  id: any;
  resourceGetByIdApi: string=WeftAPIConfig.invoiceService;
  generalreceipts: any;
  constructor(private router: Router, public route: ActivatedRoute,private httpService:WeftHttpService) { }

  ngOnInit(): void {
    const invoiceId = this.route.snapshot.paramMap.get(this.resourceKey);
    if (invoiceId) {
      this.id = JSON.parse(invoiceId);
      this.PrintData();
    }
  }
  
  PrintData()
  {
    this.httpService.get(this.resourceGetByIdApi + '/print/' + this.id).subscribe(x => {
    // this.generalreceipts = x
      setTimeout(() => {
        this.generalreceipts = x
      }, 10)

      setTimeout(() => {
        const element = document.getElementById('printInvDat');
        if (element) {
          const printData = element.innerHTML;
          document.body.innerHTML = printData;
        }
      }, 20);

      setTimeout(() => {
        window.print();
      }, 30);

      setTimeout(() => {
        this.router.navigate(['/admin/invoice-management'], { replaceUrl: true });
        setTimeout(() => {
          window.location.reload();
        }, 40);
      }, 50);
    });
  // })
  }
  getTotalNetAmount(): number {
    return this.generalreceipts.invoiceItems.reduce((total: number, item: InvoiceItem) => total + parseFloat(item.quantity), 0);
  }
  
  getTotalCrAmount(): number {
    return this.generalreceipts.invoiceItems.reduce((total: number, item: InvoiceItem) => total + parseFloat(item.amount), 0);
  }
}
