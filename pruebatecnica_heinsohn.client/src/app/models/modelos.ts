export class Usuario {
  iD_Usuario?: number;
  nombre?: string;
  contraseña?: string;
}
export class Tarea {
  iD_Tarea?: number;
  titulo?: string;
  descripcion?: string;
  iD_Usuario?: number;
}
export class V_Tareas_Usuario {
  iD_Tarea?: number;
  iD_Usuario?: number;
  usuario?: string;
  titulo?: string;
  descripcion?: string;
  estado?: string;
  fecha_Movimiento?: string;
}
export class Estado {
  iD_Estado?: number;
  nombre?: string;
}
export class Tarea_Estado {
  iD_Tarea_Estado?: number;
  iD_Tarea?: number;
  iD_Estado?: number;
  fecha_Movimiento?: Date;
  tarea?: Tarea;
  estado?: Estado;
}
