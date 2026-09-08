import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {
  perfilActual: 'consulta' | 'captura' = 'captura';
  simularError: boolean = false;

  constructor(private solicitudService: SolicitudService) {
    this.perfilActual = this.solicitudService.getPerfil();
  }

  cambiarPerfil(perfil: 'consulta' | 'captura'): void {
    this.solicitudService.setPerfil(perfil);
    this.perfilActual = perfil;
  }

  toggleSimularError(): void {
    this.solicitudService.toggleSimularError();
    this.simularError = !this.simularError;
  }
}
