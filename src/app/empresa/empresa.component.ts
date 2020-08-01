import { Component, OnInit } from '@angular/core';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service'
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  providers: [EmpresaService]
})
export class EmpresaComponent implements OnInit { 
  empresas: Empresa[] 
  
  empresa: Empresa = {
    nome: null,
    cnpj: null,
    endereco: null
  }
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

  getTodasEmpresas():void{
    this.empresaService.getTodasEmpresas().subscribe(empresas => (this.empresas = empresas))
  }

  add(nome: string, cnpj: number, endereco: string){
    const newEmpresa: Empresa = {nome, cnpj, endereco};
    this.empresaService.addEmpresa(newEmpresa).subscribe(empresas => this.empresas.push(empresas))
    this.router.navigate(['/home']);
  }

  update(nome: string, cnpj: number, endereco: string) {       
    const updatedEmpresa: Empresa = {id:this.id, nome, cnpj, endereco}
    this.empresaService.updateEmpresa(updatedEmpresa).subscribe()
    this.router.navigate(['/home']);
}

}
