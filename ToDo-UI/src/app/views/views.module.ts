import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewsRoutingModule } from './views-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ViewsRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
  exports: [FormsModule, ReactiveFormsModule],
})
export class ViewsModule {}
