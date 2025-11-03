import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnosService } from './alumnos.service';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
  providers: [AlumnosService]
})
export class AlumnosComponent {
  alumnos: any[] = [];
  nuevo = { Nombre: '', Apellido: '', Curso: '' };
  edit = { id: '', Nombre: '', Apellido: '', Curso: '' };
  deleteId = '';

  constructor(private servicio: AlumnosService) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.servicio.getAll().subscribe({
      next: (data) => (this.alumnos = data),
      error: () => alert('Error al cargar alumnos')
    });
  }

  add() {
    if (!this.nuevo.Nombre || !this.nuevo.Apellido || !this.nuevo.Curso) {
      alert('Faltan datos');
      return;
    }
    this.servicio.add(this.nuevo).subscribe({
      next: () => {
        alert('Alumno agregado');
        this.getAll();
        this.nuevo = { Nombre: '', Apellido: '', Curso: '' };
      },
      error: () => alert('Error al agregar')
    });
  }

  update() {
    if (!this.edit.id || !this.edit.Nombre || !this.edit.Apellido || !this.edit.Curso) {
      alert('Faltan datos');
      return;
    }
    this.servicio.update(this.edit.id, this.edit).subscribe({
      next: () => {
        alert('Alumno modificado');
        this.getAll();
        this.edit = { id: '', Nombre: '', Apellido: '', Curso: '' };
      },
      error: () => alert('Error al modificar')
    });
  }

  delete() {
    if (!this.deleteId) {
      alert('Falta el ID');
      return;
    }
    this.servicio.delete(this.deleteId).subscribe({
      next: () => {
        alert('Alumno eliminado');
        this.getAll();
        this.deleteId = '';
      },
      error: () => alert('Error al eliminar')
    });
  }

  cargarParaEditar(alumno: any) {
    this.edit = { ...alumno };
  }
}
