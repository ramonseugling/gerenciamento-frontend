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
    funcionario: Funcionario[]
    editFuncionario: Funcionario

    constructor(private funcionarioService: FuncionarioService){}

    ngOnInit(){
        this.getFuncionario()
    }

    getFuncionario():void{
        this.funcionarioService.getFuncionario().subscribe(funcionario => (this.funcionario = funcionario))
    }

    add(login: string, nome: string, cpf: number, email: string, endereco: string, senha: string): void {
        this.editFuncionario = undefined
        login = login.trim()
        if(!login){
            return
        }

        const newFuncionario: Funcionario = {login, nome, cpf, email, endereco, senha}
        this.funcionarioService.addFuncionario(newFuncionario).subscribe(funcionario => this.funcionario.push(funcionario))
        alert('Funcionário adicionado!');
    }

    delete(funcionario: Funcionario): void {
        this.funcionario = this.funcionario.filter(h => h !== funcionario)
        this.funcionarioService.deleteFuncionario(funcionario.id).subscribe();
        alert('Funcionário removido!');
    }

    edit(funcionario){
        this.editFuncionario = funcionario
    }

    update() {
        if(this.editFuncionario){
            this.funcionarioService.updateFuncionario(this.editFuncionario).subscribe(funcionario => {
                const ix = funcionario ? this.funcionario.findIndex(h => h.id === funcionario.id) : -1
                if(ix > -1) {
                    this.funcionario[ix] = funcionario
                }
            })
            this.editFuncionario = undefined
        }
    }
}
