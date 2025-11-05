import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AlumnosService, Alumno } from './alumnos.service';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  list: Alumno[] = [];
  showModal = false;
  editItem: Alumno | null = null;
  temp: Alumno = { nombre: '', edad: 0, curso: '', telefono: '' };

  constructor(private srv: AlumnosService) {}

  ngOnInit() {
    this.srv.data$.subscribe(d => {
      // Validamos los nulls y agregamos nombre por defecto
      this.list = d.map((a, i) => ({
        ...a,
        nombre: a.nombre || `Alumno ${i + 1}`,
        curso: a.curso || 'Sin curso',
        telefono: a.telefono || '0000000000',
        edad: a.edad || 0
      }));
    });
    this.srv.load();
  }

  openModal(item?: Alumno) {
    this.editItem = item || null;
    this.temp = item ? { ...item } : { nombre: '', edad: 0, curso: '', telefono: '' };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (!this.validate(this.temp)) return;

    if (this.editItem) this.srv.update(this.temp);
    else this.srv.add(this.temp);
    this.closeModal();
  }

  validate(a: Alumno): boolean {
    if (!a.nombre.trim()) return alert("El nombre es obligatorio"), false;
    if (a.edad <= 0 || a.edad > 120) return alert("Edad invalida"), false;
    if (!a.curso.trim()) return alert("El curso es obligatorio"), false;
    if (!/^[0-9]{7,15}$/.test(a.telefono)) return alert("Telefono invalido (solo numeros, 7 a 15 digitos)"), false;
    return true;
  }

  delete(id: string) {
    this.srv.delete(id);
  }
}
