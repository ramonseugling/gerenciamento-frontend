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

    //Método que faz a requisação HTTP para o backend para retornar os funcionários cadastrados no banco da dados
    //Retorna um array de funcionários
    getFuncionarios(): Observable<Funcionario[]> {
        return this.http
            .get<Funcionario[]>('api/funcionario')
            .pipe(catchError(this.handleError('getFuncionario', [])))
    }
    
    //Método que faz a requisação HTTP para o backend para adicionar o funcionário no banco de dados
    //Recebe como parâmetro, o funcionário que está sendo adicionado
    addFuncionario(funcionario: Funcionario): Observable<Funcionario>{
        return this.http
            .post<Funcionario>('api/funcionario', funcionario)
    }
    
    //Método que faz a requisação HTTP para o backend para deletar o funcionário no banco de dados
    //Recebe como parâmetro, o id do funcionário que está sendo deletado
    deleteFuncionario(id: number): Observable<{}>{
        const url = `api/funcionario/${id}`
        return this.http
            .delete(url)
            .pipe(catchError(this.handleError('deleteFuncionario')))
    }

    //Método que faz a requisação HTTP para o backend para atualizar algum dado do funcionário no banco de dados
    //Recebe como parâmetro, o funcionário que está sendo editado
    updateFuncionario(funcionario: Funcionario): Observable<Funcionario>{
        return this.http
            .put<Funcionario>(`api/funcionario/${funcionario.id}`, funcionario)
    }
}
