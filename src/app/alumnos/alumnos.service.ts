import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

export interface Alumno {
  id?: string;
  nombre: string;
  edad: number;
  curso: string;
  telefono: string;
}

@Injectable({ providedIn: 'root' })
export class AlumnosService {
  private apiUrl = 'https://681c48d86ae7c794cf713d77.mockapi.io/Alumnos';
  private cache = new BehaviorSubject<Alumno[]>([]);
  data$ = this.cache.asObservable();

  constructor(private http: HttpClient) {}

  load() {
    this.http.get<Alumno[]>(this.apiUrl).pipe(
      tap(data => {
        if (data.length === 0) {
          const defaults: Alumno[] = [
            { id: '1', nombre: 'Alumno 1', edad: 20, curso: 'Programacion', telefono: '1111111111' },
            { id: '2', nombre: 'Alumno 2', edad: 22, curso: 'Diseño', telefono: '2222222222' }
          ];
          this.cache.next(defaults);
        } else {
          this.cache.next(data);
        }
      })
    ).subscribe();
  }

  add(alumno: Alumno) {
    this.http.post<Alumno>(this.apiUrl, alumno).subscribe(res => {
      this.cache.next([...this.cache.value, res]);
    });
  }

  update(alumno: Alumno) {
    this.http.put<Alumno>(`${this.apiUrl}/${alumno.id}`, alumno).subscribe(res => {
      const updated = this.cache.value.map(a => a.id === res.id ? res : a);
      this.cache.next(updated);
    });
  }

  delete(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.cache.next(this.cache.value.filter(a => a.id !== id));
    });
  }
}
