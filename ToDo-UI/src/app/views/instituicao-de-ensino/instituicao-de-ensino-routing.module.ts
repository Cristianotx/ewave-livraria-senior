import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstituicaoDeEnsinoConsultaComponent } from './instituicao-de-ensino-consulta/instituicao-de-ensino-consulta.component';
import { InstituicaoDeEnsinoCadastroComponent } from './instituicao-de-ensino-cadastro/instituicao-de-ensino-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: InstituicaoDeEnsinoConsultaComponent,
  },
  {
    path: 'cadastrar',
    component: InstituicaoDeEnsinoCadastroComponent,
  },
  {
    path: ':id/editar',
    component: InstituicaoDeEnsinoCadastroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstituicaoDeEnsinoRoutingModule {}
