import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarea, Tarea_Estado, Usuario, V_Tareas_Usuario } from '../models/modelos';
import { Observable } from 'rxjs';

@Injectable()
export class TareaService {
  constructor(private https: HttpClient) {
  }
  getTareasUsuario(usuario: Usuario): Observable<V_Tareas_Usuario> {
    return this.https.get<V_Tareas_Usuario>('/tareaEstado/V_Tareas_Usuarios?ID_Usuario=' + usuario.iD_Usuario);
  }
  postTareasUsuario(tarea: Tarea) {
    return this.https.post<number>('/tarea', tarea);
  }
  postMovimientos(tarea: Tarea_Estado) {
    return this.https.post<number>('/tareaEstado/postMovimientos', tarea);
  }
  putMovimientos(tarea: Tarea_Estado) {
    return this.https.put<any>('/tareaEstado/putMovimientos', tarea);
  }
  deleteTarea(iD_tarea: number) {
    return this.https.delete<any>('/tarea?ID_Tarea=' + iD_tarea);
  }
}
