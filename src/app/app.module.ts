import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { HomeComponent } from './home/home.component';

import { Route, RouterModule } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
const routes: Route[] = [
  {path:'home', component: HomeComponent},
  {path:'funcionario', component: FuncionarioComponent},
  {path: 'funcionario/:id', component: FuncionarioComponent},
  {path: 'empresa', component: EmpresaComponent}
];

@NgModule({
  declarations: [
    AppComponent, 
    FuncionarioComponent, 
    HomeComponent, 
    EmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //HttpModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [MessageService, HttpErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
