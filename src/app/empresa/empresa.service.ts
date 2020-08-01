import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from './empresa';
import {HttpErrorHandler, HandleError} from '../http-error-handler.service'
import { catchError } from 'rxjs/operators'
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private handleError: HandleError

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) { 
    this.handleError = httpErrorHandler.createHandleError('FuncionarioService')
  }

  addEmpresa(empresa: Empresa): Observable<Empresa>{
    return this.http
        .post<Empresa>('api/empresa', empresa)
        .pipe(catchError(this.handleError('addEmpresas', empresa)))
  }

  getTodasEmpresas(): Observable<Empresa[]> {
        return this.http
            .get<Empresa[]>('api/empresa')
            .pipe(catchError(this.handleError('getTodasEmpresas', [])))
  }

  deleteEmpresa(id: number): Observable<{}>{
    const url = `api/empresa/${id}`
    return this.http
        .delete(url)
        .pipe(catchError(this.handleError('deleteEmpresa')))
}


}
