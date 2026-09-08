import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { Solicitud, EstadoSolicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private solicitudes: Solicitud[] = [
    { id: 1, folio: 'FOL-001', area: 'Recursos Humanos', asunto: 'Solicitud de vacaciones', estado: 'pendiente', fechaCreacion: '2025-01-15' },
    { id: 2, folio: 'FOL-002', area: 'TI', asunto: 'Compra de equipo', estado: 'en_revision', fechaCreacion: '2025-01-14' },
    { id: 3, folio: 'FOL-003', area: 'Finanzas', asunto: 'Reembolso de gastos', estado: 'atendida', fechaCreacion: '2025-01-13' },
    { id: 4, folio: 'FOL-004', area: 'Operaciones', asunto: 'Mantenimiento de maquinaria', estado: 'pendiente', fechaCreacion: '2025-01-12' },
    { id: 5, folio: 'FOL-005', area: 'Ventas', asunto: 'Autorización de descuento', estado: 'en_revision', fechaCreacion: '2025-01-11' },
  ];

  private perfilUsuario: 'consulta' | 'captura' = 'captura';
  private simularError = false;

  constructor() {}

  setPerfil(perfil: 'consulta' | 'captura'): void {
    this.perfilUsuario = perfil;
  }

  getPerfil(): 'consulta' | 'captura' {
    return this.perfilUsuario;
  }

  toggleSimularError(): void {
    this.simularError = !this.simularError;
  }

  getSolicitudes(): Observable<Solicitud[]> {
    if (this.simularError) {
      return throwError(() => new Error('Error al cargar las solicitudes')).pipe(delay(500));
    }
    return of([...this.solicitudes]).pipe(delay(500));
  }

  getSolicitudById(id: number): Observable<Solicitud | undefined> {
    if (this.simularError) {
      return throwError(() => new Error('Error al cargar el detalle')).pipe(delay(300));
    }
    const solicitud = this.solicitudes.find(s => s.id === id);
    return of(solicitud).pipe(delay(300));
  }

  crearSolicitud(solicitud: Omit<Solicitud, 'id' | 'folio' | 'fechaCreacion'>): Observable<Solicitud> {
    if (this.simularError) {
      return throwError(() => new Error('Error al crear la solicitud')).pipe(delay(500));
    }
    const nuevaSolicitud: Solicitud = {
      ...solicitud,
      id: Math.max(...this.solicitudes.map(s => s.id), 0) + 1,
      folio: `FOL-${String(Math.max(...this.solicitudes.map(s => s.id), 0) + 1).padStart(3, '0')}`,
      fechaCreacion: new Date().toISOString().split('T')[0]
    };
    this.solicitudes.push(nuevaSolicitud);
    return of(nuevaSolicitud).pipe(delay(500));
  }

  actualizarSolicitud(id: number, cambios: Partial<Solicitud>): Observable<Solicitud> {
    if (this.simularError) {
      return throwError(() => new Error('Error al actualizar la solicitud')).pipe(delay(500));
    }
    const index = this.solicitudes.findIndex(s => s.id === id);
    if (index === -1) {
      return throwError(() => new Error('Solicitud no encontrada'));
    }
    this.solicitudes[index] = { ...this.solicitudes[index], ...cambios };
    return of(this.solicitudes[index]).pipe(delay(500));
  }

  filtrarSolicitudes(asunto?: string, estado?: EstadoSolicitud): Observable<Solicitud[]> {
    if (this.simularError) {
      return throwError(() => new Error('Error al filtrar')).pipe(delay(500));
    }
    let resultado = [...this.solicitudes];
    if (asunto && asunto.trim()) {
      resultado = resultado.filter(s => 
        s.asunto.toLowerCase().includes(asunto.toLowerCase())
      );
    }
    if (estado) {
      resultado = resultado.filter(s => s.estado === estado);
    }
    return of(resultado).pipe(delay(500));
  }
}
