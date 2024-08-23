import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZineRoutingModule } from './zine-routing.module';
import { WeftCommonModule } from 'src/app/weft-common/weft-common.module';
import { MasterPageComponent } from './master-page/master-page.component';

@NgModule({
  declarations: [MasterPageComponent],
  imports: [
    CommonModule,
    ZineRoutingModule,
    WeftCommonModule,
  ],
  exports: []

})
export class ZineModule { }
