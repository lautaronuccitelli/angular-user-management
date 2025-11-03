import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlumnosService {
  private url = 'https://681c48d86ae7c794cf713d77.mockapi.io/Alumnos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  add(alumno: any): Observable<any> {
    return this.http.post(this.url, alumno);
  }

  update(id: string, alumno: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, alumno);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
