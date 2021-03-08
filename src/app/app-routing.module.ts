import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListadoComponent } from './listado/listado.component';
import { SaveComponent } from './save/save.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listados', component: ListadoComponent },
  { path: 'agregar', component:SaveComponent},
  {path: '**', redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
