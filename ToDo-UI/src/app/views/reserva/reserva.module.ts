import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaConsultaComponent } from './reserva-consulta/reserva-consulta.component';
import { ReservaCadastroComponent } from './reserva-cadastro/reserva-cadastro.component';

@NgModule({
  declarations: [ReservaConsultaComponent, ReservaCadastroComponent],
  imports: [CommonModule, ReservaRoutingModule],
})
export class ReservaModule {}
