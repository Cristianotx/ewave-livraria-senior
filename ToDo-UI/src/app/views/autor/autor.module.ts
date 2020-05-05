import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorRoutingModule } from './autor-routing.module';
import { AutorComponent } from './autor.component';
import { ModalModule, ModalDirective, BsModalRef } from 'ngx-bootstrap/modal';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AutorComponent],
  imports: [CommonModule, AutorRoutingModule, SharedModule],
  providers: [BsModalRef],
})
export class AutorModule {}
