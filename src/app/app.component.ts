import { Component } from '@angular/core';
import { AlumnosComponent } from './alumnos/alumnos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlumnosComponent],
  template: `
    <h1>Gestion de Alumnos</h1>
    <app-alumnos></app-alumnos>
  `
})
export class AppComponent { }
