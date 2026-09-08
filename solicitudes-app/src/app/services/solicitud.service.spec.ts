import { TestBed } from '@angular/core/testing';
import { SolicitudService } from './solicitud.service';

describe('SolicitudService', () => {
  let service: SolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return solicitudes on success', (done) => {
    service.getSolicitudes().subscribe({
      next: (data) => {
        expect(data.length).toBeGreaterThan(0);
        done();
      },
      error: () => fail('Expected success but got error')
    });
  });

  it('should return error when simularError is true', (done) => {
    service.toggleSimularError();
    service.getSolicitudes().subscribe({
      next: () => fail('Expected error but got success'),
      error: (err) => {
        expect(err.message).toContain('Error');
        service.toggleSimularError(); // Reset
        done();
      }
    });
  });

  it('should change user profile', () => {
    expect(service.getPerfil()).toBe('captura');
    service.setPerfil('consulta');
    expect(service.getPerfil()).toBe('consulta');
    service.setPerfil('captura'); // Reset
  });

  it('should filter solicitudes by asunto', (done) => {
    service.filtrarSolicitudes('vacaciones').subscribe({
      next: (data) => {
        expect(data.length).toBeGreaterThan(0);
        data.forEach(s => expect(s.asunto.toLowerCase()).toContain('vacaciones'));
        done();
      }
    });
  });

  it('should filter solicitudes by estado', (done) => {
    service.filtrarSolicitudes(undefined, 'pendiente').subscribe({
      next: (data) => {
        expect(data.length).toBeGreaterThan(0);
        data.forEach(s => expect(s.estado).toBe('pendiente'));
        done();
      }
    });
  });
});
