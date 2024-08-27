import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';

@Component({
  selector: 'app-printqr-code',
  templateUrl: './printqr-code.component.html',
  styleUrls: ['./printqr-code.component.scss']
})
export class PrintqrCodeComponent implements OnInit {
  @Input() insertedQrCodes: any;
  resourceKey: string = 'printData';
  invoiceData: any;
  resourceManagementNavPath: string = "/admin/qrCodeManagement";

  constructor(private router: Router,
    public route: ActivatedRoute, private httpService: WeftHttpService) { }

    ngOnInit() {
      const printElement = document.getElementById('printAllQrCode');
      if (printElement) {
        const printContents = printElement.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        setTimeout(() => { window.location.reload(); }, 200);
      } else {
        console.error("Element with ID 'printAllQrCode' not found.");
      }
    }
    
   

 
  
    
    cancel(){
      this.router.navigate([this.resourceManagementNavPath], { replaceUrl: true });
    }
  
}
