import { Component } from '@angular/core';
import { EvaluacionService } from '../../servicios/evaluacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrl: './evaluacion.component.scss'
})
export class EvaluacionComponent {

  evaluacion: any;
  id_evaluacion:any;

  obj_evaluacion ={
  id_evaluacion:"",
  fo_usuario:"",
  Formulario:"",
  Resultado:"",
  Fecha:""  
 }
 validar_id_evaluacion=true;
 validar_fo_usuario=true;
 validar_Formulario=true;
 validar_Resultado=true;
 validar_Fecha=true;

 mform = false;
 botones_form =false;


 constructor(private seva:EvaluacionService){}

  ngOnInit(): void {
    this.consulta();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  consulta(){
    this.seva.consultar().subscribe((resultado:any)=>{
      this.evaluacion=resultado;
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
      this.obj_evaluacion = {
       id_evaluacion:"",
       fo_usuario: "",
       Formulario:"",
       Resultado:"",
       Fecha:"",
       
     }

   }
  validar(funcion: any){
      
      if (this.obj_evaluacion.fo_usuario==""){
        this.validar_fo_usuario=false;
      }else{
        this.validar_fo_usuario=true;
      }
      if (this.obj_evaluacion.Formulario==""){
        this.validar_Formulario=false;
      }else{
        this.validar_Formulario=true;
      }if (this.obj_evaluacion.Resultado==""){
        this.validar_Resultado=false;
      }else{
        this.validar_Resultado=true;}
      if (this.obj_evaluacion.Fecha==""){
          this.validar_Fecha=false;
      }else{
          this.validar_Fecha=true;}
          if (this.obj_evaluacion.id_evaluacion==""){
            this.validar_id_evaluacion=false;
      }else{
            this.validar_id_evaluacion=true;}

      if(this.validar_id_evaluacion== true && this.validar_fo_usuario==true && this.validar_Formulario && this.validar_Fecha==true && this.validar_Resultado  && funcion=='guardar'){
        this.guardar();
      }
      if(this.validar_id_evaluacion== true && this.validar_fo_usuario==true && this.validar_Formulario && this.validar_Fecha==true && this.validar_Resultado  && funcion=='editar'){
        this.editar();
      }

    }

  guardar(){
      this.seva.insertar(this.obj_evaluacion).subscribe((datos:any)=>{
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
          this.seva.eliminar(id).subscribe((datos:any)=>{
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
    this.obj_evaluacion={
      id_evaluacion: items.id_evaluacion,
      fo_usuario: items.fo_usuario,
      Formulario: items.Formulario,
      Resultado: items.Resultado,
      Fecha: items.Fecha
    }
    this.id_evaluacion;
    this.botones_form =true;
    this.mostrar_form( 'ver');
  }
  editar(){
    this.seva.editar(this.id_evaluacion, this.obj_evaluacion).subscribe((datos:any)=>{
      if(datos['resultado']=="OK"){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver ');
  }
  }
