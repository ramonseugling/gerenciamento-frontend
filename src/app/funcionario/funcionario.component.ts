import { Component, OnInit } from '@angular/core'
import { Funcionario } from './funcionario'
import { FuncionarioService } from './funcionario.service'
import { ActivatedRoute, Router } from '@angular/router'


@Component({
    selector: 'app-funcionario',
    templateUrl: './funcionario.component.html',
    providers: [FuncionarioService]
})

export class FuncionarioComponent implements OnInit {
    funcionario: Funcionario = {
        login: null,
        nome: null,
        cpf: null,
        email: null,
        endereco: null,
        senha: null
    }
    funcionarios: Funcionario[]
    id: any;
    editing: boolean =  false;

    constructor(private funcionarioService: FuncionarioService, private activatedRoute: ActivatedRoute, private router: Router){
    this.id = this.activatedRoute.snapshot.params['id'];
    
        if(this.id){
            this.editing = true;
            this.funcionarioService.getFuncionarios().subscribe((data: Funcionario[]) => {
                this.funcionarios = data;
                this.funcionario = this.funcionarios.find(funcionario => { return funcionario.id == this.id });
                console.log(data);
            });
        }else{
            this.editing = false;
        }
    }

    ngOnInit(){
        this.getFuncionarios()
    }

    getFuncionarios():void{
        this.funcionarioService.getFuncionarios().subscribe(funcionarios => (this.funcionarios = funcionarios))
    }

    add(login: string, nome: string, cpf: number, email: string, endereco: string, senha: string): void {
        
        login = login.trim()
        if(!login){
            return
        }

        const newFuncionario: Funcionario = {login, nome, cpf, email, endereco, senha}
        this.funcionarioService.addFuncionario(newFuncionario).subscribe(funcionarios => this.funcionarios.push(funcionarios))
        this.router.navigate(['/home']);
    }
    
    update(login: string, nome: string, cpf: number, email: string, endereco: string, senha: string) {       
        const updatedFuncionario: Funcionario = {id:this.id, login, nome, cpf, email, endereco, senha}
        this.funcionarioService.updateFuncionario(updatedFuncionario).subscribe()
        this.router.navigate(['/home']);
    }
}