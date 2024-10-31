import { Component } from '@angular/core';
import { LoginService } from '../../servicios/login.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: any;
  clave: any;
  error = false;
  usuario: any;

  user={
    id_usuario:"",
    nombre:"",
    apellidos: "",
    email:"",
    clave:"",
    tipo_usuario:"",
    fecha_de_nacimiento:""
  }
  constructor(private slogin: LoginService, private router :Router){};
  ngOnInit(): void {
      sessionStorage.setItem("id", "");
       sessionStorage.setItem("email", "");
       sessionStorage.setItem("nombre", "");
       sessionStorage.setItem("apellidos", "");
      sessionStorage.setItem("apellidos", "");
    

  }
  consulta(tecla: any){
    if(tecla==13 || tecla==""){
      this.slogin.consultar( this.email, this.clave).subscribe((resultado :any)=>{
        this.usuario = resultado;
        console.log(this.usuario);
         if(this.usuario[0].validar=="valida"){
          sessionStorage.setItem("id", this.usuario[0]['id_usuario'])
          sessionStorage.setItem("email", this.usuario[0]['email']);
          sessionStorage.setItem("nombre", this.usuario[0]['nombre']);
          sessionStorage.setItem("apellidos", this.usuario[0]['apellidos']);
          this.router.navigate(['dashboard']);
         }else{
            console.log("no entro");
            this.error = true;
         }

         
         
      })
    }
  }
}