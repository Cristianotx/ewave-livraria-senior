import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneroRoutingModule } from './genero-routing.module';
import { GeneroComponent } from './genero.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [GeneroComponent],
  imports: [CommonModule, GeneroRoutingModule, SharedModule],
})
export class GeneroModule {}
