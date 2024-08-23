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
        this.resourceKeyValue = JSON.parse((params.get(this.resourceKey)));
      });
      
    }
  }

  customizeColumns(columns) {
   
  }

  generatePDF(event) {
    this.transferData(this.dataGrid.instance);
  }
  
  transferData(event) {
    const doc = new jsPDF('l', 'px', 'a4'), fontSize = 10;
    let coordX = 0, coordY = 0;
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: event,
      autoTableOptions: {
        showHead: "everyPage",
        margin: { right: 20, left: 30, top: 55, bottom: 20 },
        showFoot: "lastPage",
        theme: 'plain',
        headStyles: { fontSize: 8, lineColor: [255, 255, 255], textColor: [0, 0, 0], textStyle: "bold" },
        bodyStyles: { fontSize: 8, lineColor: [255, 255, 255] },
        footStyles: { fontSize: 9, lineColor: [255, 255, 255] },
        tableLineColor: [255, 255, 255],
        didDrawPage: data => {
          coordX = data.cursor.x;
          coordY = data.cursor.y;
        },
      }
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
        // doc.line(10, 57, 620, 57);
         doc.line(10, 73, 620, 73);
        if (j== pages) {
          doc.line(10, coordY - 15, 620, coordY - 15); //Footer line - up
          doc.line(10, coordY, 620, coordY); //Footer line - down
        }
       // doc.setFontSize(14);
       // doc.setFontSize(12);
       // doc.text("HEAD OFFICE", horizontalPos, 32, { align: "center" });
       // doc.setFontSize(10);
        doc.text(this.title.toLocaleUpperCase(),horizontalPos, 32, { align: "center" });
        //doc.text("DATE FROM " + moment(this.today).format("MM/DD/YYYY") + " TO " + moment(this.today).format("MM/DD/YYYY"), 484, 53);
        doc.text("Printed on: " + moment(this.today).format("MM/DD/YYYY"), 10, verticalPos)
       
        doc.setFontSize(10);
        doc.text(`Page ${j} of ${pages}`, horizontalPos, verticalPos, { align: 'center' });
      }
      doc.output('dataurlnewwindow')
      doc.save(this.title + '.pdf');
    })
  }
}




