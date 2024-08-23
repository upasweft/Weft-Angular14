import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ManagementComponent } from "./management/management.component";
import { AgGridModule } from "ag-grid-angular";
import { HttpClientModule } from "@angular/common/http";
import { NgSelectModule } from "@ng-select/ng-select";
import { ReactiveFormsModule } from "@angular/forms";
import { CflSelectComponent } from "./cfl-select/cfl-select.component";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    ManagementComponent,
    CflSelectComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatIconModule, MatButtonModule ,
  ],
  exports: [
    ManagementComponent,
    CflSelectComponent,
    UploadComponent
  ],
})
export class ZineCommonModule {}
