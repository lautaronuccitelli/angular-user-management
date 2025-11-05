import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos/alumnos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AlumnosComponent],
  template: `<app-alumnos></app-alumnos>`,
})
export class AppComponent {}
