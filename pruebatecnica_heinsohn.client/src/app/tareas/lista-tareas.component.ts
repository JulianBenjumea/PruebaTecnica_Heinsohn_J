import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado, Tarea, Usuario, V_Tareas_Usuario } from '../models/modelos';
import { TareaService } from '../services/tarea.service';
import { EstadoService } from '../services/estado.service';
import { MatTableDataSource } from '@angular/material/table';
import { TareasComponent } from '..//tareas/tareas.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css'],
  providers: [TareaService, EstadoService],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ListaTareasComponent implements OnInit {
  dataSource = new MatTableDataSource<V_Tareas_Usuario>([]);
  usuario: Usuario = {
    nombre: "",
    contraseña: "",
    iD_Usuario: 0
  };
  selectTarea: V_Tareas_Usuario = {
  };
  displayedColumns: string[] = ['titulo', 'descripcion', 'estado', 'fecha_Movimiento', 'actions'];
  constructor(private fb: FormBuilder, private serviceTarea: TareaService, private router: Router,
    public dialog: MatDialog, private EstadoService: EstadoService, private a_router: ActivatedRoute) {
    
  }
  ngOnInit() {
    var user = this.a_router.snapshot.queryParamMap.get('id_user')?.valueOf();
    if (user?.toString() != "0" || user != null) {
      this.usuario.iD_Usuario = Number.parseInt(user?.valueOf()!);
      this.actualizarLista();
    }
  }
  nuevaTarea(tarea: number) {
    if (tarea > 0) {
      this.selectTarea = this.dataSource.data.find(f => f.iD_Tarea == tarea)!;
    }
    this.EstadoService.getEstados().subscribe((result: any) => {
      const dialogoEDT = this.dialog.open(TareasComponent, { data: { data: tarea, estados: result, v_tarea: this.selectTarea, id_usuario: this.usuario.iD_Usuario } });
      dialogoEDT.beforeClosed().subscribe(result => {
        this.actualizarLista();
      });
    });
  }
  actualizarLista() {
    this.serviceTarea.getTareasUsuario(this.usuario).subscribe((result: any) => {
      this.dataSource.data = result;
    }, error => console.error(error));
  }
  eliminarTarea(tarea: number) {
    if (tarea > 0) {
      if (window.confirm('¿Desea eliminar la tarea?') === true) {
        this.serviceTarea.deleteTarea(tarea).subscribe((result: any) => {
          this.actualizarLista();
          if (result)
            alert("Tarea Eliminada");
        }, error => console.error(error));
      }      
    }
  }
}
