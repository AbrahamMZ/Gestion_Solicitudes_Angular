# Gestión de Solicitudes - Proyecto Angular

Aplicación Angular para la gestión de solicitudes que cubre las siguientes funcionalidades:

## Funcionalidades Implementadas

| Funcionalidad                      | Qué practicar                                              | Estado |
| ---------------------------------- | ---------------------------------------------------------- | ------ |
| **Listado de solicitudes**         | Componentes, presentación de datos y estado sin registros. | ✅     |
| **Filtro por asunto y estado**     | Formularios, transformación de datos y búsqueda.           | ✅     |
| **Alta y edición**                 | Formulario reactivo, validaciones y envío de datos.        | ✅     |
| **Detalle por identificador**      | Rutas y parámetros.                                        | ✅     |
| **Servicio de solicitudes**        | Separación entre interfaz y acceso a datos.                | ✅     |
| **Estados de carga y error**       | Mensajes claros, reintento y recuperación de la interfaz.  | ✅     |
| **Perfiles de consulta y captura** | Diferencias de interfaz según permisos.                    | ✅     |
| **Pruebas básicas**                | Validación, consulta exitosa y respuesta fallida.          | ✅     |

## Modelo de Datos

```typescript
type EstadoSolicitud = 'pendiente' | 'en_revision' | 'atendida';

interface Solicitud {
  id: number;
  folio: string;
  area: string;
  asunto: string;
  estado: EstadoSolicitud;
  fechaCreacion: string;
}
```

## Estructura del Proyecto

```
solicitudes-app/
├── src/
│   └── app/
│       ├── components/
│       │   ├── solicitud-lista/       # Listado con filtros
│       │   ├── solicitud-formulario/  # Alta y edición
│       │   ├── solicitud-detalle/     # Detalle por ID
│       │   └── perfil-usuario/        # Cambio de perfil
│       ├── models/
│       │   └── solicitud.ts           # Modelo de datos
│       ├── services/
│       │   └── solicitud.service.ts   # Servicio de datos
│       ├── app.component.ts           # Componente principal
│       ├── app.routes.ts              # Configuración de rutas
│       └── ...
└── ...
```

## Instalación y Ejecución

```bash
cd solicitudes-app
npm install
ng serve --host 0.0.0.0
```

La aplicación estará disponible en `http://localhost:4200`

## Características Principales

### 1. Listado de Solicitudes
- Tabla con todas las solicitudes
- Estado "sin registros" cuando no hay datos
- Badges de colores según el estado

### 2. Filtros
- Búsqueda por asunto (texto libre)
- Filtro por estado (dropdown)
- Botones para aplicar y limpiar filtros

### 3. Alta y Edición
- Formulario reactivo con validaciones
- Campos requeridos con longitud mínima
- Mensajes de error específicos
- Estados de carga y éxito

### 4. Detalle por ID
- Vista de detalle con parámetro de ruta
- Información completa de la solicitud
- Botón para editar (solo perfil captura)

### 5. Servicio de Solicitudes
- Métodos CRUD completos
- Datos mockeados con delay simulado
- Separación clara entre UI y lógica de datos

### 6. Estados de Carga y Error
- Spinners durante las peticiones
- Mensajes de error descriptivos
- Botón de reintentar
- Simulación de errores configurable

### 7. Perfiles de Usuario
- **Perfil Captura**: Puede crear y editar solicitudes
- **Perfil Consulta**: Solo puede ver listado y detalles
- Panel lateral para cambiar entre perfiles

### 8. Pruebas
- Tests de servicio (éxito y error)
- Tests de validación de formularios
- Tests de componentes básicos

## Comandos Útiles

```bash
# Build de producción
npm run build

# Ejecutar tests (si están configurados)
npm test

# Ejecutar con hot-reload
ng serve
```

## Tecnologías Utilizadas

- Angular 19+
- TypeScript
- Reactive Forms
- RxJS
- CSS3 (sin frameworks externos)
