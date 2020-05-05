import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaConsultaComponent } from './reserva-consulta/reserva-consulta.component';
import { ReservaCadastroComponent } from './reserva-cadastro/reserva-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: ReservaConsultaComponent,
  },
  {
    path: '/cadastrar',
    component: ReservaCadastroComponent,
  },
  {
    path: ':id/editar',
    component: ReservaCadastroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaRoutingModule {}
