import { Component, ViewChild, ElementRef, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as actions from '../../../store/actions';
import * as selectors from '../../../store/selectors';

import { CadastroBase } from 'src/app/shared/base/cadastro/cadastro.base';
import { Autor } from 'src/app/shared/interfaces/autor.interface';
import { Genero } from 'src/app/shared/interfaces/genero.interface';
import { ActivatedRoute } from '@angular/router';
import { Livro } from 'src/app/shared/interfaces/livro.interface';

@Component({
  selector: 'app-livro-cadastro',
  templateUrl: './livro-cadastro.component.html',
  styleUrls: ['./livro-cadastro.component.scss'],
})
export class LivroCadastroComponent extends CadastroBase {
  autores$: Observable<Autor[]>;
  generos$: Observable<Genero[]>;

  constructor(public injector: Injector, private activatedRoute: ActivatedRoute) {
    super(injector);
    this.titulo = this.isEdicao ? 'Editar livro' : 'Cadastar livro';

    this.store.dispatch(actions.carregarAutoresAtivos());
    this.autores$ = this.store.select(selectors.selectAutoresAtivos);

    this.store.dispatch(actions.carregarGenerosAtivos());
    this.generos$ = this.store.select(selectors.selectGenerosAtivos);
  }

  @ViewChild('arquivoInput') arquivoInput: ElementRef;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  onInit() {
    this.activatedRoute.params.subscribe(({ id: aggregateId }) => {
      if (aggregateId) {
        this.store.dispatch(actions.obterLivroPorId({ aggregateId }));
      }
    });

    this.store.select(selectors.selectLivroSelecionado).subscribe((livro) => {
      if (livro) {
        this.isEdicao = true;
        this.patchValue(livro);
      }
    });
  }

  construirFormulario() {
    this.form = this.formBuilder.group({
      aggregateId: [null],
      titulo: [null, Validators.required],
      sinopse: [null, Validators.required],
      paginas: [null, Validators.required],
      capa: [null, Validators.required],
      disponivel: [true, Validators.required],
      autorId: [null, Validators.required],
      generoId: [null, Validators.required],
    });
  }

  patchValue(livro: Livro) {
    this.form.patchValue(livro);
  }

  salvar() {
    const model = this.form.getRawValue();
    const action = this.isEdicao ? actions.alterarLivro({ livro: model }) : actions.salvarLivro({ livro: model });
    this.store.dispatch(action);
  }

  async obterArquivoFormData(inputFile) {
    const file = inputFile.srcElement.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      this.uploadFotoStorage(file);
    } else {
      if (this.arquivoInput) {
        this.arquivoInput.nativeElement.value = '';
      }
    }
  }

  uploadFotoStorage(file: File) {
    const randomId = Math.random().toString(36).substring(2);
    const fileRef = this.storage.ref(randomId);
    const task = fileRef.put(file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe((url) => {
            this.form.get?.('capa').setValue(url);
          })
        )
      )
      .subscribe();

    this.uploadPercent = task.percentageChanges();
  }
}
