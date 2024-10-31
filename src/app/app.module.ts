import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
//import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './estructura/nav/nav.component';
import { AsideComponent } from './estructura/aside/aside.component';
import { ContentComponent } from './estructura/content/content.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { PlaneacionDidacticaComponent } from './modulos/planeacion-didactica/planeacion-didactica.component';
import { EvaluacionComponent } from './modulos/evaluacion/evaluacion.component';
import { UsuarioComponent } from './modulos/usuario/usuario.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';
import { LoginComponent } from './modulos/login/login.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideComponent,
    ContentComponent,
    FooterComponent,
    PrincipalComponent,
    DashboardComponent,
    PlaneacionDidacticaComponent,
    EvaluacionComponent,
    UsuarioComponent,
    NoEncontroComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [
     provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent],
  
   
  
})
export class AppModule { }
