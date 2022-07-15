import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Colaborador } from '../models/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private _httpClient: HttpClient) { }

  listar(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/colaborador`);
  }

  salvar(colaborador: Colaborador): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/colaborador`, colaborador);
  }

  editar(id: number, colaborador: Colaborador): Observable<any> {
    return this._httpClient.put(`${environment.apiUrl}/colaborador/${id}`, colaborador);
  }

  excluir(id: number): Observable<any> {
    return this._httpClient.delete(`${environment.apiUrl}/colaborador/${id}`);
  }
}
