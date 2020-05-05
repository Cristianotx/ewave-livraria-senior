import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'livros',
    pathMatch: 'full',
  },
  {
    path: 'livros',
    loadChildren: () => import('./livro/livro.module').then((m) => m.LivroModule),
  },
  {
    path: 'emprestimos',
    loadChildren: () => import('./emprestimo/emprestimo.module').then((m) => m.EmprestimoModule),
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reserva/reserva.module').then((m) => m.ReservaModule),
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  {
    path: 'instituicoes-de-ensino',
    loadChildren: () =>
      import('./instituicao-de-ensino/instituicao-de-ensino.module').then((m) => m.InstituicaoDeEnsinoModule),
  },
  {
    path: 'autores',
    loadChildren: () => import('./autor/autor.module').then((m) => m.AutorModule),
  },
  {
    path: 'generos',
    loadChildren: () => import('./genero/genero.module').then((m) => m.GeneroModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
