import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {
  nombre = '';
  alumnos: string[] = [];

  agregarAlumno() {
    if (this.nombre.trim() !== '') {
      this.alumnos.push(this.nombre);
      this.nombre = '';
    }
  }

  eliminarAlumno(i: number) {
    this.alumnos.splice(i, 1);
  }
}
