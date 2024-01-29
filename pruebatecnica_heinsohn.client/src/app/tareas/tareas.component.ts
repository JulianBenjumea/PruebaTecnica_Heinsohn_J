import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea, Usuario, Estado, Tarea_Estado, V_Tareas_Usuario } from '../models/modelos';
import { EstadoService } from '../services/estado.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css'],
  providers: [TareaService],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TareasComponent implements OnInit {
  usuario: Usuario = {
    nombre: "",
    contraseña: "",
    iD_Usuario: 0
  };

  tarea: Tarea = {
    iD_Tarea: 0,
    titulo: "",
    descripcion: "",
    iD_Usuario: 0,
  }
  estado: Estado = {
    iD_Estado: 0,
    nombre: ""
  }

  tarea_estado: Tarea_Estado = {
    iD_Tarea_Estado: 0,
    iD_Estado: 0,
    iD_Tarea: 0,
    fecha_Movimiento: new Date,
    estado: this.estado,
    tarea: this.tarea
  }
  idtarea: number = 0;
  estados: Estado[] = [];
  selectEstado: number = 0;

  visibleEstado = false;

  reactiveFormTarea = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    descripcion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    selectEstado: [1, [Validators.required]]
  });


  constructor(private fb: FormBuilder, private serviceTarea: TareaService, private router: Router,
    public dialogRef: MatDialogRef<TareasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: number, estados: Estado[], v_tarea: V_Tareas_Usuario, id_usuario: number }) {
    this.idtarea = this.data.data;
    this.estados = this.data.estados;
    this.usuario.iD_Usuario = this.data.id_usuario;
    if (this.data.data > 0) {
      this.tarea.iD_Tarea = this.data.v_tarea.iD_Tarea;
      this.tarea.iD_Usuario = this.data.v_tarea.iD_Tarea;
      this.tarea.titulo = this.data.v_tarea.titulo;
      this.tarea.descripcion = this.data.v_tarea.descripcion;
      this.selectEstado = this.valueEstado(this.data.v_tarea.estado!);
      this.reactiveFormTarea = this.fb.nonNullable.group({
        titulo: [this.tarea.titulo!, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        descripcion: [this.tarea.descripcion!, [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
        selectEstado: [this.selectEstado, [Validators.required]]
      });
      this.visibleEstado = true;
    }
  }
  valueEstado(nombre: string)
  {
    return this.estados.filter(element => element.nombre == nombre)[0].iD_Estado!;
  }
  ngOnInit() {

  }
  guardar() {
    if (this.reactiveFormTarea.valid) {
      this.tarea.descripcion = this.reactiveFormTarea.get("descripcion")?.value;
      this.tarea.titulo = this.reactiveFormTarea.get("titulo")?.value;
      this.tarea.iD_Usuario = this.usuario.iD_Usuario;
      this.tarea_estado.iD_Estado = this.reactiveFormTarea.get("selectEstado")?.value;
      
      if (this.idtarea > 0) {
        this.tarea_estado.tarea = this.tarea;
        this.tarea_estado.iD_Tarea = this.idtarea;
        this.tarea_estado.estado = this.estados.find(f => f.iD_Estado == this.tarea_estado.iD_Estado);
        this.serviceTarea.putMovimientos(this.tarea_estado).subscribe((result: any) => {
          if (result.respuesta == "OK") {
            this.dialogRef.close();
            alert("Tarea Guardada Exitosamente");
          }
          else {
            console.log("ERROR " + result.valor);
          }
        }, error => console.error(error));
      }
      else {
        this.serviceTarea.postTareasUsuario(this.tarea).subscribe((result: any) => {
          console.log(this.tarea);
          if (result > 0) {
            this.tarea_estado.iD_Tarea = result;
            this.serviceTarea.postMovimientos(this.tarea_estado).subscribe((result: any) => {
              if (result > 0) {
                this.dialogRef.close();
                alert("Tarea Guardada Exitosamente");
              }
            }, error => console.error(error));
          }
        }, error => console.error(error));
      }
    }  
    else {
      alert("Revise los valores ingresados");
    }
  }
}
