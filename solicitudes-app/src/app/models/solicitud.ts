export type EstadoSolicitud = 'pendiente' | 'en_revision' | 'atendida';

export interface Solicitud {
  id: number;
  folio: string;
  area: string;
  asunto: string;
  estado: EstadoSolicitud;
  fechaCreacion: string;
}
