import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud, EstadoSolicitud } from '../../models/solicitud';

@Component({
  selector: 'app-solicitud-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './solicitud-lista.component.html',
  styleUrl: './solicitud-lista.component.css'
})
export class SolicitudListaComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  filtroAsunto: string = '';
  filtroEstado: EstadoSolicitud | '' = '';
  loading: boolean = false;
  error: string | null = null;
  perfilUsuario: 'consulta' | 'captura' = 'captura';

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.perfilUsuario = this.solicitudService.getPerfil();
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.loading = true;
    this.error = null;
    
    this.solicitudService.filtrarSolicitudes(
      this.filtroAsunto || undefined,
      this.filtroEstado || undefined
    ).subscribe({
      next: (data) => {
        this.solicitudes = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  aplicarFiltros(): void {
    this.cargarSolicitudes();
  }

  limpiarFiltros(): void {
    this.filtroAsunto = '';
    this.filtroEstado = '';
    this.cargarSolicitudes();
  }

  getEstadoColor(estado: EstadoSolicitud): string {
    switch (estado) {
      case 'pendiente': return 'badge-warning';
      case 'en_revision': return 'badge-info';
      case 'atendida': return 'badge-success';
      default: return 'badge-secondary';
    }
  }

  reintentar(): void {
    this.cargarSolicitudes();
  }
}
