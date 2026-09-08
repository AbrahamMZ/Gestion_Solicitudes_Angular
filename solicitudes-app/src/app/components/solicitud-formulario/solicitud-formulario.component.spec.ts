import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SolicitudFormularioComponent } from './solicitud-formulario.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';

class MockActivatedRoute {
  snapshot = { paramMap: { get: () => null } };
}

describe('SolicitudFormularioComponent', () => {
  let component: SolicitudFormularioComponent;
  let fixture: ComponentFixture<SolicitudFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudFormularioComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        provideRouter([]),
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        SolicitudService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.formulario.valid).toBeFalsy();
  });

  it('should have valid form when all fields are filled', () => {
    component.formulario.setValue({
      area: 'Recursos Humanos',
      asunto: 'Solicitud de material',
      estado: 'pendiente'
    });
    expect(component.formulario.valid).toBeTruthy();
  });

  it('should validate area field', () => {
    const area = component.formulario.get('area');
    
    // Required validation
    expect(area?.valid).toBeFalsy();
    
    // Min length validation
    area?.setValue('AB');
    expect(area?.valid).toBeFalsy();
    
    area?.setValue('ABC');
    expect(area?.valid).toBeTruthy();
  });

  it('should validate asunto field', () => {
    const asunto = component.formulario.get('asunto');
    
    // Required validation
    expect(asunto?.valid).toBeFalsy();
    
    // Min length validation
    asunto?.setValue('ABC');
    expect(asunto?.valid).toBeFalsy();
    
    asunto?.setValue('ABCDE');
    expect(asunto?.valid).toBeTruthy();
  });
});
