import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'

import { Funcionario } from './funcionario'
import {HttpErrorHandler, HandleError} from '../http-error-handler.service'

@Injectable()
export class FuncionarioService {
    private handleError: HandleError

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
        this.handleError = httpErrorHandler.createHandleError('FuncionarioService')
    }

    getFuncionario(): Observable<Funcionario[]> {
        return this.http
            .get<Funcionario[]>('api/funcionario')
            .pipe(catchError(this.handleError('getFuncionario', [])))
    }

    addFuncionario(funcionario: Funcionario): Observable<Funcionario>{
        return this.http
            .post<Funcionario>('api/funcionario', funcionario)
            .pipe(catchError(this.handleError('addFuncionario', funcionario)))
    }

    deleteFuncionario(id: number): Observable<{}>{
        const url = `api/funcionario/${id}`
        return this.http
            .delete(url)
            .pipe(catchError(this.handleError('deleteFuncionario')))
    }

    updateFuncionario(funcionario: Funcionario): Observable<Funcionario>{
        return this.http
            .put<Funcionario>('api/funcionario/${funcionario.id}', funcionario)
            .pipe(catchError(this.handleError('updateFuncionario', funcionario)))
    }
}
