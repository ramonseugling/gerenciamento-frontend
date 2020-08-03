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

  //Método que faz a requisação HTTP para o backend para retornar as empresas cadastradas no banco da dados
  //Retorna um array de empresas
  getTodasEmpresas(): Observable<Empresa[]> {
        return this.http
            .get<Empresa[]>('api/empresa')
            .pipe(catchError(this.handleError('getTodasEmpresas', [])))
  }
  
  //Método que faz a requisação HTTP para o backend para adicionar a empresa no banco de dados
  //Recebe como parâmetro, a empresa que está sendo adicionada
  addEmpresa(empresa: Empresa): Observable<Empresa>{
    return this.http
        .post<Empresa>('api/empresa', empresa)
  }
 
  //Método que faz a requisação HTTP para o backend para deletar a empresa no banco de dados
  //Recebe como parâmetro, o id da empresa que está sendo deletada
  deleteEmpresa(id: number): Observable<{}>{
    const url = `api/empresa/${id}`
    return this.http
        .delete(url)
        .pipe(catchError(this.handleError('deleteEmpresa')))
  }

  //Método que faz a requisação HTTP para o backend para atualizar algum dado da empresa no banco de dados
  //Recebe como parâmetro, a empresa que está sendo editada
  updateEmpresa(empresa: Empresa): Observable<Empresa>{
    return this.http
        .put<Empresa>(`api/empresa/${empresa.id}`, empresa)
  }

  }
