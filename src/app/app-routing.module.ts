import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { PlaneacionDidacticaComponent } from './modulos/planeacion-didactica/planeacion-didactica.component';
import { EvaluacionComponent } from './modulos/evaluacion/evaluacion.component';
import { UsuarioComponent } from './modulos/usuario/usuario.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';
import { LoginComponent } from './modulos/login/login.component';
import { validaruserGuard } from './guard/validaruser.guard';
//import { LoginComponent } from './modulos/login/login.component';


const routes: Routes = [
  {
    path:'', component: PrincipalComponent,
    children:
    [
      {path: 'dashboard', component: DashboardComponent, canActivate:[validaruserGuard]},
      {path: 'planeacion_didactica', component: PlaneacionDidacticaComponent, canActivate:[validaruserGuard]},
      {path: 'evaluacion', component: EvaluacionComponent, canActivate:[validaruserGuard]},
      {path: 'usuario', component: UsuarioComponent, canActivate:[validaruserGuard]},
      
      {path: '', redirectTo: 'dashboard', pathMatch:'full'},
    
      
    ]
  },
  {path:'login', component: LoginComponent},
  {path:'**' , component: NoEncontroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
