import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../models/modelos';
import { Observable } from 'rxjs';

@Injectable()
export class EstadoService {
  constructor(private https: HttpClient) {
  }
  getEstados(): Observable<Estado> {
    return this.https.get<Estado>('/estado');
  }
  
}
