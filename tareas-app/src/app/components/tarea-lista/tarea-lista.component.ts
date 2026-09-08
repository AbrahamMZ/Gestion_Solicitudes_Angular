import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

@Component({
  selector: 'app-tarea-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarea-lista.component.html',
  styleUrl: './tarea-lista.component.css'
})
export class TareaListaComponent {
  nuevaTarea: string = '';
  tareas: Tarea[] = [];
  siguienteId: number = 1;

  agregarTarea(): void {
    if (this.nuevaTarea.trim()) {
      this.tareas.push({
        id: this.siguienteId++,
        titulo: this.nuevaTarea.trim(),
        completada: false
      });
      this.nuevaTarea = '';
    }
  }

  eliminarTarea(id: number): void {
    this.tareas = this.tareas.filter(t => t.id !== id);
  }

  toggleCompletada(tarea: Tarea): void {
    tarea.completada = !tarea.completada;
  }

  getTareasCompletadasCount(): number {
    return this.tareas.filter(t => t.completada).length;
  }
}
