import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import * as moment from 'moment';
import 'jspdf-autotable';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-user-report-managment',
  templateUrl: './user-report-managment.component.html',
  styleUrls: ['./user-report-managment.component.scss']
})
export class UserReportManagmentComponent implements OnInit {
  public title: string = 'User Report';
  public getGridDataApi: string = WeftAPIConfig.userService+'/userreport';
  public gridKey: string = 'GRD';
  public keyField: string = "categoryId";
  public isReport :boolean = false;
  public columnDefs: any[];
  public resourceKey: string = 'usersReportData';
  resourceKeyValue: any;
  dataGrid: any;
  today = new Date();
  
  constructor(public route: ActivatedRoute,) {
    this.columnDefs = [
    {dataField : 'name',caption : 'Name'},
    { dataField : 'email', caption : 'Email'}, 
    { dataField : 'siteSettings.siteName', caption : 'Site Name'}, 
    { dataField : 'phone', caption : 'Phone'},
    { dataField : 'userType', caption : 'User Type'},
    { dataField : 'statusName', caption : 'Status'},
  ];
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get(this.resourceKey)) {
      this.route.paramMap.subscribe((params) => {
        const paramValue = params.get(this.resourceKey);
        if (paramValue) {
          this.resourceKeyValue = JSON.parse(paramValue);
        }
      });
    }
  }
  

  customizeColumns(columns: any) {
   
  }

  generatePDF(event: any) {
    this.transferData(this.dataGrid.instance);
  }
  
  transferData(event: any) {
    const doc = new jsPDF('l', 'px', 'a4');
    let coordX = 0, coordY = 0;
    
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: event,
      // Use the correct options for PDF export if available
    }).then(() => {
      const pages = doc.getNumberOfPages();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      let horizontalPos = pageWidth / 2;
      let verticalPos = pageHeight - 10;
      doc.setFontSize(10);
      
      for (let j = 1; j < pages + 1; j++) {
        doc.setPage(j);
        doc.setDrawColor(0, 0, 0);
        doc.line(5, 43, 623, 43);
        doc.line(10, 73, 620, 73);
        if (j == pages) {
          doc.line(10, coordY - 15, 620, coordY - 15); // Footer line - up
          doc.line(10, coordY, 620, coordY); // Footer line - down
        }
        doc.text(this.title.toLocaleUpperCase(), horizontalPos, 32, { align: "center" });
        doc.text("Printed on: " + moment(this.today).format("MM/DD/YYYY"), 10, verticalPos);
        doc.setFontSize(10);
        doc.text(`Page ${j} of ${pages}`, horizontalPos, verticalPos, { align: 'center' });
      }
      doc.output('dataurlnewwindow');
      doc.save(this.title + '.pdf');
    });
  }
  
}




