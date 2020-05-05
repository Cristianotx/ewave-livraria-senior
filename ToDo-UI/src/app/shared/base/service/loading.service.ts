import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingChange: Subject<boolean> = new Subject<boolean>();

  iniciarLoading() {
    this.loadingChange.next(true);
  }

  finalizarLoading() {
    this.loadingChange.next(false);
  }
}
