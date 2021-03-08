import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { ListadoComponent } from './listado/listado.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicesService } from './servicios/services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaveComponent } from './save/save.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EncabezadoComponent,
    ListadoComponent,
    SaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
