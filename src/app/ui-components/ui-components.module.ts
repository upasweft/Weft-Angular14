import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsComponent } from './ui-components.component';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxRadioGroupModule } from 'devextreme-angular/ui/radio-group';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { UiComponentsRoutingModule } from './ui-components-routing.module';

@NgModule({
  declarations: [
    UiComponentsComponent,
  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxRadioGroupModule,
    DxDateBoxModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    UiComponentsRoutingModule
  ],
  exports: [
    UiComponentsComponent
  ],
  providers: [
    BsModalService
  ]
})
export class UiComponentsModule { }
