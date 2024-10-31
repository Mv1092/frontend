import { Component } from '@angular/core';
import { UsaurioService } from '../../servicios/usaurio.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

  usuario: any;
  id_usuario: any;

  obj_usuario ={
    id_usuario:"",
    nombre:"",
    apellidos: "",
    email:"",
    clave:"",
    tipo_usuario:"",
    fecha_de_nacimiento:""
  }
  validar_id_usuario=true;
  validar_nombre=true;
  validar_apellidos=true;
  validar_email=true;
  validar_clave=true;
  validar_tipo_usuario=true;
  validar_fecha_de_nacimiento=true;

  mform=false;
  botones_form =false;

  constructor(private suse:UsaurioService){}

  ngOnInit(): void {
    this.consulta();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  consulta(){
    this.suse.consultar().subscribe((resultado:any)=>{
      this.usuario =resultado;
    })

  }

  mostrar_form(dato:any){
  switch(dato){
  case"ver":
  this.mform = true;
  break;
  case"no ver":
  this.mform = false;
  this.botones_form = false;
  break
 }
}
  limpiar(){
  this.usuario={
    id_usuario:"",
    nombre:"",
    apellidos: "",
    email:"",
    clave:"",
    tipo_usuario:"",
    fecha_de_nacimiento:"",
       }
     }
  validar(funcion: any){
    if (this.obj_usuario.id_usuario==""){
      this.validar_id_usuario=false;
    }else{
      this.validar_id_usuario=true;
    }

    if (this.obj_usuario.nombre==""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }

    if (this.obj_usuario.apellidos==""){
      this.validar_apellidos=false;
    }else{
      this.validar_apellidos=true;
    }

    if (this.obj_usuario.email==""){
      this.validar_email=false;
    }else{
      this.validar_email=true;
    }
    if (this.obj_usuario.clave==""){
      this.validar_clave=false;
    }else{
      this.validar_clave=true;
    }
    if (this.obj_usuario.tipo_usuario==""){
      this.validar_tipo_usuario=false;
    }else{
      this.validar_tipo_usuario=true;
    }if (this.obj_usuario.fecha_de_nacimiento==""){
      this.validar_fecha_de_nacimiento=false;
    }else{
      this.validar_fecha_de_nacimiento=true;
    }
    if(this.validar_id_usuario== true && this.validar_nombre== true && this.validar_apellidos== true && this.validar_email==true &&  this.validar_clave== true && this.validar_tipo_usuario== true && this.validar_fecha_de_nacimiento== true && funcion=='guardar'){
          this.guardar();
    }
    if(this.validar_id_usuario== true && this.validar_nombre== true && this.validar_apellidos== true && this.validar_email==true &&  this.validar_clave== true && this.validar_tipo_usuario== true && this.validar_fecha_de_nacimiento== true && funcion=='editar'){
          this.editar();
        }
        
      }
  guardar(){
      this.suse.insertar(this.obj_usuario).subscribe((datos:any)=>{
        if(datos['resultado']=='OK'){
          this.consulta();
        }
        });
        this.mostrar_form('no ver');
      }
   eliminar(id:number){
        
        Swal.fire({
          title: "Esta seguro de elimar esta evaluacion?",
          text: "no se podra recuperar esta evaluacion",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar, Eliminar!",
          cancelButtonText:"Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            ////
            this.suse.eliminar(id).subscribe((datos:any)=>{
              if(datos['resultado']== 'OK'){
                 this.consulta();
               }
              })
              ////
            Swal.fire({
              title: "Evaluacion Eliminada!",
              text: "La evaluacion ha sido elimanda.",
              icon: "success"
            });
          }
        });
    }
    cargar_datos(items: any, id: number){
      this.obj_usuario={
        id_usuario: items.id_usuario,
        nombre:items.nombre,
        apellidos:items.apellidos,
        email:items.email,
        clave:items.clave,
        tipo_usuario:items.usuario,
        fecha_de_nacimiento:items.fecha_de_nacimiento
       
      }
      this.id_usuario;
      this.botones_form =true;
      this.mostrar_form( 'ver');
    }
    editar(){
      this.suse.editar(this.id_usuario, this.obj_usuario).subscribe((datos:any)=>{
        if(datos['resultado']=="OK"){
          this.consulta();
        }
      });
      this.limpiar();
      this.mostrar_form('no ver ');
    }
    }


  


