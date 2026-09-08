import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud, EstadoSolicitud } from '../../models/solicitud';

@Component({
  selector: 'app-solicitud-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './solicitud-formulario.component.html',
  styleUrl: './solicitud-formulario.component.css'
})
export class SolicitudFormularioComponent implements OnInit {
  formulario: FormGroup;
  esEdicion: boolean = false;
  solicitudId: number | null = null;
  loading: boolean = false;
  error: string | null = null;
  exito: boolean = false;
  estados: EstadoSolicitud[] = ['pendiente', 'en_revision', 'atendida'];

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      area: ['', [Validators.required, Validators.minLength(3)]],
      asunto: ['', [Validators.required, Validators.minLength(5)]],
      estado: ['pendiente', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion = true;
      this.solicitudId = +idParam;
      this.cargarSolicitud(this.solicitudId);
    }
  }

  cargarSolicitud(id: number): void {
    this.loading = true;
    this.solicitudService.getSolicitudById(id).subscribe({
      next: (data) => {
        if (data) {
          this.formulario.patchValue({
            area: data.area,
            asunto: data.asunto,
            estado: data.estado
          });
        } else {
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

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const formData = this.formulario.value;

    if (this.esEdicion && this.solicitudId) {
      this.solicitudService.actualizarSolicitud(this.solicitudId, formData).subscribe({
        next: () => {
          this.exito = true;
          this.loading = false;
          setTimeout(() => this.router.navigate(['/lista']), 1500);
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        }
      });
    } else {
      this.solicitudService.crearSolicitud(formData).subscribe({
        next: () => {
          this.exito = true;
          this.loading = false;
          setTimeout(() => this.router.navigate(['/lista']), 1500);
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        }
      });
    }
  }

  get campoArea() { return this.formulario.get('area'); }
  get campoAsunto() { return this.formulario.get('asunto'); }
  get campoEstado() { return this.formulario.get('estado'); }
}
