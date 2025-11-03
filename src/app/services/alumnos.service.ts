import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  // Tu URL de MockAPI (usa la que venías usando)
  private Url = 'https://681c48d86ae7c794cf713d77.mockapi.io/Alumnos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.Url);
  }

  getById(id: string): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.Url}/${id}`);
  }

  create(al: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.Url, al);
  }

  update(id: string, al: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.Url}/${id}`, al);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.Url}/${id}`);
  }
}
