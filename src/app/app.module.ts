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

@NgModule({
  declarations: [
    AppComponent, FuncionarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //HttpModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MessageService, HttpErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
