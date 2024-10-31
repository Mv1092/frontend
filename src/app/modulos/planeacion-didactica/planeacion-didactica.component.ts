import { Component } from '@angular/core';
import { PlaneacionDidacticaService } from '../../servicios/planeacion-didactica.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-planeacion-didactica',
  templateUrl: './planeacion-didactica.component.html',
  styleUrl: './planeacion-didactica.component.scss'
})
export class PlaneacionDidacticaComponent {

  planeacion_didactica: any;
  id_planeacion: any;

  obj_planeacion ={
    id_planeacion:"",
    fo_usuario:"",
    tema:"",
    fecha:"",
    contenido_clase:"",
    Ejercitacion:"",
    resultados:"",
  }
  validar_id_planeacion=true;
  validar_fo_usuario=true;
  validar_tema=true;
  validar_fecha=true;
  validar_contenido_clase=true;
  validar_Ejercitacion=true;
  validar_resultados=true;

  mform=false;
  botones_form =false;

  constructor(private splan:PlaneacionDidacticaService){}

  ngOnInit(): void {
    this.consulta();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  consulta(){
    this.splan.consultar().subscribe((resultado:any)=>{
      this.planeacion_didactica =resultado;
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
  this.obj_planeacion={
    id_planeacion:"",
    fo_usuario:"",
    tema: "",
    fecha:"",
    contenido_clase:"",
    Ejercitacion:"",
    resultados:"",
       }
     }
  validar(funcion: any){
        if (this.obj_planeacion.fo_usuario==""){
          this.validar_fo_usuario=false;
        }else{
          this.validar_fo_usuario=true;
        }
        if (this.obj_planeacion.tema==""){
          this.validar_tema=false;
        }else{
          this.validar_tema=true;
        }
        if (this.obj_planeacion.fecha==""){
          this.validar_fecha=false;
        }else{
          this.validar_fecha=true;
        }if (this.obj_planeacion.Ejercitacion==""){
          this.validar_Ejercitacion=false;
        }else{
          this.validar_Ejercitacion=true;
        }if (this.obj_planeacion.resultados==""){
          this.validar_resultados=false;
        }else{
          this.validar_resultados=true;
        }if (this.obj_planeacion.contenido_clase==""){
          this.validar_contenido_clase =false;
        }else{
          this.validar_contenido_clase=true;
        }if (this.obj_planeacion.id_planeacion==""){
          this.validar_id_planeacion =false;
        }else{
          this.validar_id_planeacion=true;
        }
        if(this.validar_id_planeacion== true && this.validar_fo_usuario== true && this.validar_tema== true && this.validar_fecha==true &&  this.validar_contenido_clase== true && this.validar_Ejercitacion== true && this.validar_resultados== true && funcion=='guardar'){
          this.guardar();
        }
        if(this.validar_id_planeacion== true && this.validar_fo_usuario== true && this.validar_tema== true && this.validar_fecha== true &&  this.validar_contenido_clase== true && this.validar_Ejercitacion== true && this.validar_resultados== true && funcion=='editar'){
          this.editar();
        }
        
      }
  guardar(){
      this.splan.insertar(this.obj_planeacion).subscribe((datos:any)=>{
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
            this.splan.eliminar(id).subscribe((datos:any)=>{
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
      this.obj_planeacion={
        id_planeacion:items.id_planeacion,
        fo_usuario:items.fo_usuario,
        tema:items.tema,
        fecha:items.fecha,
        contenido_clase:items.contenido_clase,
        Ejercitacion:items.Ejercitacion,
        resultados:items.resultados,
      }
      this.id_planeacion;
      this.botones_form =true;
      this.mostrar_form( 'ver');
    }
    editar(){
      this.splan.editar(this.id_planeacion, this.obj_planeacion).subscribe((datos:any)=>{
        if(datos['resultado']=="OK"){
          this.consulta();
        }
      });
      this.limpiar();
      this.mostrar_form('no ver ');
    }
    }

