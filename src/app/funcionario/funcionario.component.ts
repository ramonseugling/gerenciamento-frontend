import { Component, OnInit } from '@angular/core'
import { Funcionario } from './funcionario'
import { FuncionarioService } from './funcionario.service'
import { ActivatedRoute } from '@angular/router'

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

    constructor(private funcionarioService: FuncionarioService, private activatedRoute: ActivatedRoute){
    this.id = this.activatedRoute.snapshot.params['id'];
        if(this.id){
            this.editing = true;
            this.funcionarioService.getFuncionario().subscribe((data: Funcionario[]) => {
                this.funcionarios == data;
                // this.funcionario = this.funcionarios.find((m) => { return m.id == this.id });
                console.log(data);
            });
        }else{
            this.editing = false;
        }
    }

    ngOnInit(){
        this.getFuncionario()
    }

    getFuncionario():void{
        this.funcionarioService.getFuncionario().subscribe(funcionarios => (this.funcionarios = funcionarios))
    }

    add(login: string, nome: string, cpf: number, email: string, endereco: string, senha: string): void {
        
        login = login.trim()
        if(!login){
            return
        }

        const newFuncionario: Funcionario = {login, nome, cpf, email, endereco, senha}
        this.funcionarioService.addFuncionario(newFuncionario).subscribe(funcionarios => this.funcionarios.push(funcionarios))
    }

    edit(funcionario){
        // this.editFuncionario = funcionario
    }

    // update() {
    //     if(this.editFuncionario){
    //         this.funcionarioService.updateFuncionario(this.editFuncionario).subscribe(funcionario => {
    //             const ix = funcionario ? this.funcionario.findIndex(h => h.id === funcionario.id) : -1
    //             if(ix > -1) {
    //                 this.funcionario[ix] = funcionario
    //             }
    //         })
    //         this.editFuncionario = undefined
    //     }
    // }
}
