import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlumnosComponent } from './alumnos/alumnos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlumnosComponent, HttpClientModule],
  template: `
    <h1>Gestion de Alumnos</h1>
    <app-alumnos></app-alumnos>
  `
})
export class AppComponent { }
