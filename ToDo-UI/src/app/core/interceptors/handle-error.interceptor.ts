import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { LoadingService } from 'src/app/shared/base/service/loading.service';
import { NotificationsService } from 'src/app/shared/base/service/notifications.service';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService, private notificationsService: NotificationsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.loadingService.iniciarLoading();

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 500) {
          this.notificationsService.showErrorMessage('Erro', 'Erro ao processar sua requisição');
          return of([]);
        }

        if (error.status === 400) {
          this.notificationsService.showWarningMessage('Atenção', error.error || error.message);
          return of([]);
        }

        if (error.status === 404) {
          return of(error);
        }

        this.notificationsService.showErrorMessage('Erro', error.error || error.message);
        return throwError(error.message);
      }),
      finalize(() => {
        if (request.url != 'assets/data/menus.json') {
          this.loadingService.finalizarLoading();
        }
      })
    );
  }
}
