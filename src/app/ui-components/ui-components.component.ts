import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-components',
  templateUrl: './ui-components.component.html',
  styleUrls: ['./ui-components.component.scss']
})
export class UiComponentsComponent implements OnInit {
  dataSource: any[] = [];
  simpleProducts: string[] = [];
  priorities: string[] = [];
  isFirstDisabled: boolean = false;


  constructor() { }

  ngOnInit() {
    this.dataSource = [
      {
        "Appt Time": "3:30pm",
        "Appt Type": "Delivery",
        "Customer": "Imperial Sugar",
        "Status": "Cancelled"
      },
      {
        "Appt Time": "3:30pm",
        "Appt Type": "Delivery",
        "Customer": "Imperial Sugar",
        "Status": "Cancelled"
      },
      {
        "Appt Time": "3:30pm",
        "Appt Type": "Delivery",
        "Customer": "Imperial Sugar",
        "Status": "Cancelled"
      },
      {
        "Appt Time": "3:30pm",
        "Appt Type": "Delivery",
        "Customer": "Imperial Sugar",
        "Status": "Cancelled"
      },
      {
        "Appt Time": "3:30pm",
        "Appt Type": "Delivery",
        "Customer": "Imperial Sugar",
        "Status": "Cancelled"
      }
    ]

    this.simpleProducts = [
      "HD Video Player",
      "SuperHD Video Player",
      "SuperPlasma 50",
      "SuperLED 50",
      "SuperLED 42",
      "SuperLCD 55",
      "SuperLCD 42",
      "SuperPlasma 65",
      "SuperLCD 70",
      "Projector Plus",
      "Projector PlusHT",
      "ExcelRemote IR",
      "ExcelRemote BT",
      "ExcelRemote IP"
    ];
    this.priorities = [
      "Low",
      "Normal",
      "Urgent",
      "High"
    ];

  }

}
