import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  nombre: any;
  tipo_usuario:any;

  constructor(private router:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.nombre= sessionStorage.getItem("nombre");
    this.tipo_usuario = sessionStorage.getItem("tipo_usuario");

  }
  cerrar(){
    sessionStorage.setItem("id", "");
       sessionStorage.setItem("email", "");
       sessionStorage.setItem("nombre", "");
       sessionStorage.setItem("apellidos", "");
       sessionStorage.setItem("tipo_usuario", "");
       this.router.navigate(['login']);
  }

}
