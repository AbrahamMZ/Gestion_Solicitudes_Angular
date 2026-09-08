import { Component } from '@angular/core';
import { TareaListaComponent } from './components/tarea-lista/tarea-lista.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TareaListaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tareas-app';
}
