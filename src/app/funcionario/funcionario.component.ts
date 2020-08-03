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

    //Método de chamar o funcionarioService para buscar os funcionários cadastrados no banco de dados
    getFuncionarios():void{
        this.funcionarioService.getFuncionarios().subscribe(funcionarios => (this.funcionarios = funcionarios))
    }
    
    //Método de chamar o funcionarioService para adicionar o funcionário cadastrado
    //Recebe como parâmetro os valores que um funcionário possui, como nome, cpf, email etc.
    add(login: string, nome: string, cpf: number, email: string, endereco: string, senha: string): void {
        
        //Verificação se possui espaços em branco no login inserido
        login = login.trim()
        if(!login){
            return
        }
        
        //Verificação se possui espaços em branco no email inserido
        email = email.trim()
        if(!email){
            return
        }

        const newFuncionario: Funcionario = {login, nome, cpf, email, endereco, senha}
        this.funcionarioService.addFuncionario(newFuncionario).subscribe(funcionarios => {
            this.funcionarios.push(funcionarios)
            //Realiza o redirecionamento para página '/home'
             this.router.navigate(['/home']);
            },
            error => {
                if(error.error.errors.nome){
                alert(error.error.errors.nome[0])
                }else {
                    alert(error.error.errors.login[0])
                }
            });
    }
    
    //Método de chamar o funcionarioService para atualizar o funcionário cadastrado
    //Recebe como parâmetro os valores que um funcionário possui, como nome, cpf, email etc.
    update(login: string, nome: string, cpf: number, email: string, endereco: string, senha: string) {       
        
        const updatedFuncionario: Funcionario = {id:this.id, login, nome, cpf, email, endereco, senha}
        this.funcionarioService.updateFuncionario(updatedFuncionario).subscribe( () => {
        //Realiza o redirecionamento para página '/home'
        this.router.navigate(['/home']);
        },
        error => {
            if(error.error.errors.nome){
            alert(error.error.errors.nome[0])
            }else {
                alert(error.error.errors.login[0])
            }
        });
    }
}