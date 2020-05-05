import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivroRoutingModule } from './livro-routing.module';
import { LivroConsultaComponent } from './livro-consulta/livro-consulta.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LivroCadastroComponent } from './livro-cadastro/livro-cadastro.component';
import { LivroComponent } from './livro-consulta/livro/livro.component';

@NgModule({
  declarations: [LivroConsultaComponent, LivroCadastroComponent, LivroComponent],
  imports: [CommonModule, LivroRoutingModule, SharedModule],
})
export class LivroModule {}
