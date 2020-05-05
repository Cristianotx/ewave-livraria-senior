import { OnInit, OnDestroy, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AngularFireStorage } from '@angular/fire/storage';

import { Subscription } from 'rxjs';

import * as actions from './../../../store/actions';

export abstract class CadastroBase implements OnInit, OnDestroy {
  protected subscribtions = new Subscription();
  protected formBuilder: FormBuilder;
  protected storage: AngularFireStorage;
  protected store: Store;

  form: FormGroup;

  submitted = false;
  isEdicao = false;
  titulo;

  constructor(injector: Injector) {
    this.formBuilder = injector.get(FormBuilder);
    this.storage = injector.get(AngularFireStorage);
    this.store = injector.get(Store);

    this.construirFormulario();
  }

  abstract onInit();

  abstract construirFormulario();

  abstract salvar();

  ngOnInit(): void {
    this.onInit();
    this.store.dispatch(actions.alterarTiuloDaPagina({ titulo: this.titulo }));
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

  submit() {
    if (this.form.valid) {
      this.submitted = false;
      this.salvar();
    }

    this.submitted = true;
  }

  cancelar() {
    this.onInit();
    this.setFormularioSemAlteracao();
  }

  setFormularioSemAlteracao(form?: FormGroup) {
    const formulario = form ?? this.form;
    formulario.markAsPristine();
    formulario.markAsUntouched();
  }

  enableControlsForm(formControls: string[], enable: boolean = true, form?: FormGroup) {
    const formulario = form ?? this.form;
    formControls.map((campo) => (enable ? formulario.get(campo).enable() : formulario.get(campo).disable()));
  }

  setValidatorsFormControls(formControls: string[], validacoes: any[], form?: FormGroup) {
    const formulario = form ?? this.form;
    formControls.map((control) => {
      formulario.get(control).setValidators(validacoes);
      formulario.get(control).updateValueAndValidity();
    });
  }

  controlFormInvalid(control: any, form?: any) {
    const formulario = form ?? this.form;
    return formulario.get(control).invalid && formulario.get(control).dirty;
  }

  resetForm(form?: FormGroup) {
    const formulario = form ?? this.form;
    formulario.reset();
  }

  resetFormControls(controls: string[], form?: FormGroup) {
    const formulario = form ?? this.form;
    controls.map((control) => formulario.get(control).setValue(null));
  }

  setFormDirty(form?: FormGroup) {
    const formulario = form ?? this.form;
    (Object as any).values(formulario.controls).map((control) => {
      if (control.controls) {
        this.setFormDirty(control);
      } else {
        control.markAsTouched();
        control.markAsDirty();
      }
    });
  }
}
