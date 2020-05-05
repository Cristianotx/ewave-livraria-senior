import { OnInit, OnDestroy, Injector } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HttpParams } from '@angular/common/http';

import { Subscription, Observable } from 'rxjs';

import * as actions from './../../../store/actions';

import { Paginacao } from './../../../shared/models/paginacao';

export abstract class ConsultaBase implements OnDestroy, OnInit {
  protected subscribtions = new Subscription();

  protected router: Router;
  protected formBuilder: FormBuilder;
  protected store: Store<any>;

  formConsulta: FormGroup;

  data$: Observable<any>;

  parametrosPesquisa: Paginacao;

  paginaDaURL: number;
  pageNumber = 1;
  pageSize = 30;

  tags: any;
  titulo: string;

  pesquisaRapidaHabilitada = false;
  pesquisaAvancadaHabilitada = false;
  queryParamsHabilitado = false;

  protected constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.formBuilder = injector.get(FormBuilder);
    this.store = injector.get(Store);

    this.construirFormulario();

    this.parametrosPesquisa = new Paginacao(this.pageNumber, this.pageSize);
  }

  abstract onInit();
  abstract realizarConsulta(pagina?: number);

  construirFormulario() {
    this.formConsulta = this.formBuilder.group({
      texto: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.habilitarQueryParams();
    this.consulta();
    this.onInit();
    this.store.dispatch(actions.alterarTiuloDaPagina({ titulo: this.titulo }));
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

  cancelar() {}

  consulta() {
    this.pageNumber = 1;
    this.realizarConsulta();
  }

  private async beforeConsulta() {
    await this.obterParametrosDePesquisaRapida();
  }

  private habilitarQueryParams() {
    const params = new HttpParams({
      fromString: this.router.url.split('?')[1],
    });

    if (params.has('pageNumber')) {
      this.paginaDaURL = +params.get('pageNumber');
    }

    this.obterParametrosDePesquisaDaURL(params);
    this.adicionarParametrosDePesquisaNaURL();
    this.queryParamsHabilitado = true;
  }

  private obterParametrosDePesquisaDaURL(params) {
    const keys = Array.from(params.keys()) as Array<any>;

    keys.map((key) => {
      const p = params.get(key);
    });
  }

  private adicionarParametrosDePesquisaNaURL() {
    const url = this.router.url.split('?');
    const route = url[0].replace('/', '');

    const urlParams = this.obterParametros();
    let queryParams = {};
    const keys = Array.from(urlParams.keys()) as Array<any>;
    keys.forEach((key) => (queryParams = { ...queryParams, [key]: urlParams.get(key) }));

    const navigationExtras: NavigationExtras = {
      queryParams,
      replaceUrl: true,
    };

    this.router.navigate([route], navigationExtras);
  }

  setTextoControlPesquisaRapida(value: string) {
    if (this.formConsulta && this.formConsulta.get('texto')) {
      this.formConsulta.get('texto').setValue(value);
    }
  }

  private obterParametros = (): HttpParams => this.obterParametrosDePesquisaRapida();

  private obterParametrosDePesquisaRapida(): HttpParams {
    const urlParams = new HttpParams({ fromString: this.router.url.split('?')[1] });
    const pagina = this.parametrosPesquisa.pageNumber.toString();

    if (
      urlParams.has('texto') &&
      this.formConsulta &&
      this.formConsulta.get('texto') &&
      !this.formConsulta.get('texto').value
    ) {
      this.formConsulta.get('texto').setValue(decodeURIComponent(urlParams.get('texto')));
    }

    // this.parametrosPesquisa.texto = this.form && this.form.get('texto') ? this.form.get('texto').value : null;
    const urlSearchParams = new HttpParams()
      .set('pageNumber', pagina)
      .set('texto', this.formConsulta.get('texto').value);
    return urlSearchParams;
  }

  /**
   * Altera a página atual da página de consulta e dos models de pesquisas rápida e avançada.
   * @param pagina Página atual.
   */
  beforeSubscribe(pagina?: number) {
    let pag = 1;
    if (pagina) {
      pag = pagina;
    } else if (this.paginaDaURL) {
      pag = this.paginaDaURL;
      this.paginaDaURL = undefined;
    }

    this.pageNumber = pag;
    this.parametrosPesquisa.pageNumber = pag;
  }

  afterSubscribe(response) {
    if ((!response || response.length === 0) && this.pageNumber > 1) {
      const paginaAtual = this.pageNumber - 1;
      this.store.dispatch(actions.alterarPaginarAtual({ paginaAtual }));
    }

    if (this.queryParamsHabilitado) {
      this.adicionarParametrosDePesquisaNaURL();
    }
  }
}
