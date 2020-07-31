import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../funcionario/funcionario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FuncionarioService]
})
export class HomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:8000/api';
  funcionarios: Funcionario[];
  constructor(private funcionarioService: FuncionarioService, private httpClient: HttpClient) { 
    httpClient.get(this.API_ENDPOINT + '/funcionario').subscribe((data: Funcionario[]) => {
      console.log(data);
      this.funcionarios = data;
    });
  }
    ngOnInit(): void {
  }

}
