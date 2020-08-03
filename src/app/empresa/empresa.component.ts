import { Component, OnInit } from '@angular/core';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service'
import { ActivatedRoute, Router } from '@angular/router'
import { subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  providers: [EmpresaService]
})
export class EmpresaComponent implements OnInit { 
  
  empresa: Empresa = {
    nome: null,
    cnpj: null,
    endereco: null
  }
  empresas: Empresa[] 
  id: any;
  editing: boolean =  false;

  constructor(private empresaService: EmpresaService,private activatedRoute: ActivatedRoute, private router: Router) { 
    this.id = this.activatedRoute.snapshot.params['id'];
    
    if(this.id){
        this.editing = true;
        this.empresaService.getTodasEmpresas().subscribe((data: Empresa[]) => {
            this.empresas = data;
            this.empresa = this.empresas.find(empresa => { return empresa.id == this.id });
            console.log(data);
        });
    }else{
        this.editing = false;
    }
  }

  ngOnInit(): void {
    this.getTodasEmpresas();
  }

  //Método de chamar o empresaService para buscar as empresas cadastradas no banco de dados
  getTodasEmpresas():void{
    this.empresaService.getTodasEmpresas().subscribe(empresas => (this.empresas = empresas))
  }

  //Método de chamar o empresaService para adicionar a empresa cadastrada
  //Recebe como parâmetro os valores que uma empresa possui: nome, cnpj e endereço
  add(nome: string, cnpj: number, endereco: string){
    const newEmpresa: Empresa = {nome, cnpj, endereco};
    
    this.empresaService.addEmpresa(newEmpresa).subscribe(empresas => {
      this.empresas.push(empresas)
      //Realiza o redirecionamento para página '/home'
      this.router.navigate(['/home']);
    },
    error => alert(error.error.errors.nome[0]));
  }

  //Método de chamar o empresaService para atualizar a empresa cadastrada
  //Recebe como parâmetro os valores que uma empresa possui: nome, cnpj e endereço
  update(nome: string, cnpj: number, endereco: string) {       
    const updatedEmpresa: Empresa = {id:this.id, nome, cnpj, endereco}
    this.empresaService.updateEmpresa(updatedEmpresa).subscribe( () => {
      //Realiza o redirecionamento para página '/home'
      this.router.navigate(['/home']);
    } , error => {alert(error.error.errors.nome[0])});
  }

}
