import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { PaginacaoComponent } from './components/layout/paginacao/paginacao.component';
import { DatepickerComponent } from './components/layout/datepicker/datepicker.component';
import { EmprestimoCadastroComponent } from './components/layout/emprestimo-cadastro/emprestimo-cadastro.component';
import { EnderecoComponent } from './components/layout/endereco/endereco.component';
import { MeioDeContatoComponent } from './components/layout/meio-de-contato/meio-de-contato.component';
import { EmailsComponent } from './components/layout/meio-de-contato/emails/emails.component';
import { TelefonesComponent } from './components/layout/meio-de-contato/telefones/telefones.component';

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    PaginacaoComponent,
    DatepickerComponent,
    EmprestimoCadastroComponent,
    EnderecoComponent,
    MeioDeContatoComponent,
    EmailsComponent,
    TelefonesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    TooltipModule,
    DatepickerComponent,
    EmprestimoCadastroComponent,
    EnderecoComponent,
    MeioDeContatoComponent,
    EmailsComponent,
    TelefonesComponent,
  ],
  providers: [BsModalRef],
})
export class SharedModule {}
