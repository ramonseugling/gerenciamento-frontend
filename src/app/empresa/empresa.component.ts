import { Component, OnInit } from '@angular/core';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service'

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  providers: [EmpresaService]
})
export class EmpresaComponent implements OnInit { 
  empresas: Empresa[] 
  constructor(private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.getTodasEmpresas();
  }

  getTodasEmpresas():void{
    this.empresaService.getTodasEmpresas().subscribe(empresas => (this.empresas = empresas))
  }

  add(nome: string, cnpj: number, endereco: string){
    const newEmpresa: Empresa = {nome, cnpj, endereco};
    this.empresaService.addEmpresa(newEmpresa).subscribe(empresas => this.empresas.push(empresas))
  }
}
