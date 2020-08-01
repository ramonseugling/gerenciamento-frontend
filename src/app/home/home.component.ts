import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { EmpresaService } from '../empresa/empresa.service';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../funcionario/funcionario';
import { Empresa } from '../empresa/empresa';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FuncionarioService, EmpresaService]
})

export class HomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:8000/api';
  funcionarios: Funcionario[];
  empresas: Empresa[];
  
  constructor(private funcionarioService: FuncionarioService, private empresaService: EmpresaService, private httpClient: HttpClient) { 
    
    httpClient.get(this.API_ENDPOINT + '/funcionario').subscribe((data: Funcionario[]) => {
      this.funcionarios = data;
    });
    
    httpClient.get(this.API_ENDPOINT + '/empresa').subscribe((data: Empresa[]) => {
      this.empresas = data;
    });
  }

  ngOnInit(): void {
    this.getFuncionarios();
    this.getTodasEmpresas();
  }

  getTodasEmpresas():void{
    this.empresaService.getTodasEmpresas().subscribe(empresas => (this.empresas = empresas))
  }

  getFuncionarios():void{
    this.funcionarioService.getFuncionarios().subscribe(funcionarios => (this.funcionarios = funcionarios))
  }

  deleteEmpresa(empresa: Empresa): void {
    this.empresas = this.empresas.filter(findEmpresa => findEmpresa !== empresa)
    this.empresaService.deleteEmpresa(empresa.id).subscribe();
  }

  deleteFuncionario(funcionario: Funcionario): void {
    this.funcionarios = this.funcionarios.filter(findFuncionario => findFuncionario !== funcionario)
    this.funcionarioService.deleteFuncionario(funcionario.id).subscribe();
  }

}
