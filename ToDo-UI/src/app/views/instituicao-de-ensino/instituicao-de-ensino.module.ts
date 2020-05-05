import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstituicaoDeEnsinoRoutingModule } from './instituicao-de-ensino-routing.module';
import { InstituicaoDeEnsinoConsultaComponent } from './instituicao-de-ensino-consulta/instituicao-de-ensino-consulta.component';
import { InstituicaoDeEnsinoCadastroComponent } from './instituicao-de-ensino-cadastro/instituicao-de-ensino-cadastro.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InstituicaoDeEnsinoConsultaComponent, InstituicaoDeEnsinoCadastroComponent],
  imports: [CommonModule, InstituicaoDeEnsinoRoutingModule, SharedModule],
})
export class InstituicaoDeEnsinoModule {}
