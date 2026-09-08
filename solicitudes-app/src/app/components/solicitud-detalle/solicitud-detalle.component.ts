import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud, EstadoSolicitud } from '../../models/solicitud';

@Component({
  selector: 'app-solicitud-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './solicitud-detalle.component.html',
  styleUrl: './solicitud-detalle.component.css'
})
export class SolicitudDetalleComponent implements OnInit {
  solicitud: Solicitud | null = null;
  loading: boolean = false;
  error: string | null = null;
  perfilUsuario: 'consulta' | 'captura' = 'captura';

  constructor(
    private route: ActivatedRoute,
    private solicitudService: SolicitudService
  ) {}

  ngOnInit(): void {
    this.perfilUsuario = this.solicitudService.getPerfil();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.cargarDetalle(+idParam);
    }
  }

  cargarDetalle(id: number): void {
    this.loading = true;
    this.error = null;
    
    this.solicitudService.getSolicitudById(id).subscribe({
      next: (data) => {
        this.solicitud = data || null;
        if (!data) {
          this.error = 'Solicitud no encontrada';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
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
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.cargarDetalle(+idParam);
    }
  }
}
