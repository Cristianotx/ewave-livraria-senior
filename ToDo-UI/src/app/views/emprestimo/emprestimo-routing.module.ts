import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmprestimoComponent } from './emprestimo.component';

const routes: Routes = [
  {
    path: '',
    component: EmprestimoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmprestimoRoutingModule {}
