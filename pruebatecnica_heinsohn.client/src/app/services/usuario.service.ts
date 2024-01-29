import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/modelos';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService {
  listaUsuarios: Usuario[] = [];
  constructor(private https: HttpClient) {
  }
  getUsuarios(): Observable<Usuario> {
    return this.https.get<Usuario>('/usuario');
  }
  postUsuario(usuario: Usuario) {
    return this.https.post<number>('/usuario', usuario);
  }
  getUsuario(usuario: Usuario): Observable<Usuario> {
    return this.https.get<Usuario>('/usuario/detalleUsuario?nombre=' + usuario.nombre);
  }
  putUbicacion(usuario: Usuario) {
    return this.https.put<number>('/usuario', usuario);
  }
  deleteUbicacion(usuario: Usuario) {
    return this.https.delete<number>('/usuario?ID_Usuario=' + usuario.iD_Usuario);
  }
  getClaveEncrypt() {
    return this.https.get<any>('usuario/KeyEncrypt');
  }
}
