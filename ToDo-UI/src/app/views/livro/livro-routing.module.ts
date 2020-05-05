import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivroConsultaComponent } from '../livro/livro-consulta/livro-consulta.component';
import { LivroCadastroComponent } from './livro-cadastro/livro-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: LivroConsultaComponent,
  },
  {
    path: 'cadastrar',
    component: LivroCadastroComponent,
  },
  {
    path: ':id/editar',
    component: LivroCadastroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivroRoutingModule {}
