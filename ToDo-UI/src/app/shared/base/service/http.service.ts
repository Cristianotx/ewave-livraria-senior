import { Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { buildQueryParams } from './../../utils/query-params.util';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

export class HttpService<T> {
  private http: HttpClient;
  private readonly urlBase = environment.url_api;

  constructor(injector: Injector, controllerName: string, urlBase?: string) {
    this.http = injector.get(HttpClient);

    if (urlBase) {
      this.urlBase = urlBase;
    }

    if (controllerName) {
      this.urlBase = `${this.urlBase}/${controllerName}`;
    }
  }

  get(endpoint?: string, params?: any) {
    params = buildQueryParams(params);
    return this.http.get<T[]>(this.getEndPoint(endpoint), params);
  }

  post(endpoint: string, body: T): Observable<T> {
    return this.http.post<T>(this.getEndPoint(endpoint), body, httpOptions);
  }

  put(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.getEndPoint(endpoint)}`, body);
  }

  delete(endpoint: string, id: any) {
    return this.http.delete<T>(`${this.getEndPoint(endpoint)}/${id}`);
  }

  getEndPoint = (url: string) => (url ? `${this.urlBase}/${url}` : this.urlBase);
}
