import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridManagementComponent } from './grid-management/grid-management.component';
import { WeftCommonModule } from 'src/app/weft-common/weft-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [GridManagementComponent],
  imports: [
    CommonModule,
    WeftCommonModule,
    ReactiveFormsModule,
    FormsModule,
    DxDataGridModule,
    DxButtonModule,
    NgSelectModule,
    HttpClientModule,
   
  ],
  exports:[
    GridManagementComponent, 
  ]
})
export class PosCommonModule { }
