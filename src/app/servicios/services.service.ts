import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registros } from '../models/registros';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  URL: string = "http://localhost:5000/api"

  constructor(private http: HttpClient) { }

  readRegistros(): Observable<Registros[]> {
    return this.http.get<Registros[]>(this.URL + '/registro');
  }

  readRegistroxId(id: number): Observable<Registros[]> {
    return this.http.get<[]>(this.URL + '/registro/' + id);
  }

  saveRegistro(reg: Registros): Observable<Registros> {
    return this.http.post<Registros>(this.URL + '/registro', reg);
  }

  putRegistro(reg: Registros, id: number) {
    return this.http.put<Registros>(this.URL + '/registro/' + id, reg);
  }

  deleteRegistro(id: number) {
    return this.http.delete<Registros>(this.URL + '/registro/' + id)
  }


}
