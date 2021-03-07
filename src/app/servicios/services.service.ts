import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registros } from '../models/registros';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  URL:string = "http://localhost:5000/api"

  constructor(private http : HttpClient) { }

  readRegistro():Observable<Registros[]>
  {
      return this.http.get<Registros[]>(this.URL+'/registro')
  }

}
