import { Routes } from '@angular/router';
import { SolicitudListaComponent } from './components/solicitud-lista/solicitud-lista.component';
import { SolicitudFormularioComponent } from './components/solicitud-formulario/solicitud-formulario.component';
import { SolicitudDetalleComponent } from './components/solicitud-detalle/solicitud-detalle.component';

export const routes: Routes = [
  { path: '', redirectTo: '/lista', pathMatch: 'full' },
  { path: 'lista', component: SolicitudListaComponent },
  { path: 'nueva', component: SolicitudFormularioComponent },
  { path: 'editar/:id', component: SolicitudFormularioComponent },
  { path: 'detalle/:id', component: SolicitudDetalleComponent },
  { path: '**', redirectTo: '/lista' }
];
