import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Personagem } from '../models/personagem';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {

  constructor(private _httpClient: HttpClient) { }

  listar(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/characters`);
  }

  salvar(personagem: Personagem): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/characters`, personagem);
  }

  excluir(id: number): Observable<any> {
    return this._httpClient.delete(`${environment.apiUrl}/characters/${id}`);
  }
}
