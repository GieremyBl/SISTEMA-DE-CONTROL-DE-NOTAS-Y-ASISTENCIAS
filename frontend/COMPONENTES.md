# Componentes Reutilizables

## Estructura de Componentes

```
src/components/
├── common/
│   ├── BaseButton.vue      (Botones)
│   ├── BaseCard.vue        (Tarjetas genéricas)
│   ├── BaseAlert.vue       (Alertas)
│   ├── BaseModal.vue       (Diálogo modal)
│   ├── BaseLoader.vue      (Spinner / Loader)
│   ├── BasePagination.vue  (Paginación)
│   ├── BaseBreadcrumb.vue  (Migas de pan)
│   ├── BaseDropdown.vue    (Menú desplegable)
│   └── BaseToast.vue       (Notificaciones toast)
├── cards/
│   └── StatCard.vue        (Tarjetas de estadísticas)
├── forms/
│   ├── BaseInput.vue       (Inputs de texto)
│   ├── BaseSelect.vue      (Selectores)
│   ├── BaseCheckbox.vue    (Checkbox)
│   ├── BaseRadio.vue       (Radio button)
│   ├── BaseTextarea.vue    (Área de texto)
│   └── BaseSwitch.vue      (Toggle switch)
├── tables/
│   └── BaseTable.vue       (Tablas)
└── index.ts                (Exportación centralizada)
```

---

## Componentes Disponibles

### 1. BaseButton
Botón reutilizable con variantes y tamaños.

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `icon`: Clase de icon (ej: 'pi pi-save')
- `disabled`: boolean
- `full`: boolean (ancho completo)

**Uso:**
```vue
<BaseButton variant="primary" size="md" icon="pi pi-save">
  Guardar
</BaseButton>

<BaseButton variant="danger" @click="handleDelete">
  Eliminar
</BaseButton>
```

---

### 2. BaseCard
Tarjeta genérica con header, contenido y footer.

**Props:**
- `title`: string
- `subtitle`: string
- `elevated`: boolean (shadow mejorada)

**Slots:**
- `default`: Contenido principal
- `header`: Contenido en el header
- `footer`: Pie de tarjeta

**Uso:**
```vue
<BaseCard title="Información" subtitle="Datos del estudiante">
  <p>Contenido aquí</p>
  <template #footer>
    <BaseButton variant="primary">Guardar</BaseButton>
  </template>
</BaseCard>
```

---

### 3. StatCard
Tarjeta de estadística con icon y valor.

**Props:**
- `value`: string | number
- `label`: string
- `subtitle`: string (opcional)
- `icon`: Clase de icon
- `iconBgColor`: Color de fondo del icon (hex, rgb, etc)

**Uso:**
```vue
<StatCard
  value="127"
  label="Total Alumnos"
  subtitle="4 secciones"
  icon="pi pi-users"
  iconBgColor="#3b82f6"
/>
```

---

### 4. BaseInput
Input de texto con validación y help text.

**Props:**
- `modelValue`: string | number (v-model)
- `type`: 'text' | 'email' | 'password' | 'number' (default: 'text')
- `label`: string
- `placeholder`: string
- `error`: string (mensaje de error)
- `help`: string (texto de ayuda)
- `disabled`: boolean
- `required`: boolean

**Uso:**
```vue
<BaseInput
  v-model="email"
  type="email"
  label="Correo"
  placeholder="ejemplo@correo.com"
  :error="emailError"
  required
/>
```

---

### 5. BaseSelect
Selector dropdown con opciones.

**Props:**
- `modelValue`: string | number (v-model)
- `options`: Array de { id, label }
- `label`: string
- `placeholder`: string
- `error`: string
- `disabled`: boolean
- `required`: boolean

**Uso:**
```vue
<BaseSelect
  v-model="gradeId"
  label="Grado"
  placeholder="Seleccionar grado"
  :options="[
    { id: 1, label: '1° Primaria' },
    { id: 2, label: '2° Primaria' }
  ]"
/>
```

---

### 6. BaseAlert
Alerta desechable con diferentes tipos.

**Props:**
- `modelValue`: boolean (v-model) - controla visibilidad
- `type`: 'success' | 'error' | 'warning' | 'info' (default: 'info')
- `title`: string
- `message`: string

**Uso:**
```vue
<BaseAlert
  v-model="showAlert"
  type="success"
  title="Éxito"
  message="Datos guardados correctamente"
/>

<BaseButton @click="showAlert = true">Mostrar alerta</BaseButton>
```

---

### 7. BaseTable
Tabla con datos y columnas configurables.

**Props:**
- `title`: string
- `columns`: Array de { key, label, width? }
- `data`: Array de objetos
- `emptyMessage`: string

**Slots:**
- `cell-{columnKey}`: Para renderizado personalizado de celdas

**Uso:**
```vue
<BaseTable
  title="Listado de Alumnos"
  :columns="[
    { key: 'name', label: 'Nombre' },
    { key: 'grade', label: 'Grado' },
    { key: 'status', label: 'Estado' }
  ]"
  :data="students"
>
  <template #cell-status="{ value }">
    <span :class="value === 'Activo' ? 'text-green-600' : 'text-red-600'">
      {{ value }}
    </span>
  </template>
</BaseTable>
```

---

### 8. BaseModal
Diálogo modal con overlay, animación y tamaños configurables.

**Props:**
- `modelValue`: boolean (v-model) - controla visibilidad
- `title`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `persistent`: boolean - evita cierre al hacer clic fuera

**Slots:**
- `default`: Contenido del modal
- `header`: Header personalizado
- `footer`: Botones de acción

**Uso:**
```vue
<BaseModal v-model="showModal" title="Confirmar acción" size="md">
  <p>¿Estás seguro de que deseas continuar?</p>
  <template #footer>
    <BaseButton variant="secondary" @click="showModal = false">Cancelar</BaseButton>
    <BaseButton variant="primary" @click="confirm">Confirmar</BaseButton>
  </template>
</BaseModal>
```

---

### 9. BaseLoader
Spinner/loader con variantes.

**Props:**
- `variant`: 'spinner' | 'dots' | 'overlay' (default: 'spinner')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `text`: string (texto debajo del spinner)
- `color`: string (default: '#3b82f6')

**Uso:**
```vue
<!-- Spinner simple -->
<BaseLoader size="md" text="Cargando..." />

<!-- Dots animados -->
<BaseLoader variant="dots" />

<!-- Overlay sobre un contenedor (posición relative requerida) -->
<div class="relative">
  <BaseLoader variant="overlay" text="Procesando..." />
  <!-- contenido -->
</div>
```

---

### 10. BasePagination
Paginación con navegación numérica y selector por página.

**Props:**
- `currentPage`: number (v-model)
- `totalItems`: number
- `itemsPerPage`: number (default: 10)
- `showPerPage`: boolean (default: false)

**Emits:**
- `update:currentPage`
- `update:itemsPerPage`

**Uso:**
```vue
<BasePagination
  v-model:currentPage="page"
  :totalItems="150"
  :itemsPerPage="10"
  showPerPage
  @update:itemsPerPage="perPage = $event"
/>
```

---

### 11. BaseBreadcrumb
Migas de pan para navegación jerárquica.

**Props:**
- `items`: Array de { label, to?, icon? }

**Uso:**
```vue
<BaseBreadcrumb
  :items="[
    { label: 'Inicio', to: '/', icon: 'pi pi-home' },
    { label: 'Alumnos', to: '/alumnos' },
    { label: 'Detalle' }
  ]"
/>
```

---

### 12. BaseDropdown
Menú desplegable con trigger personalizable.

**Props:**
- `items`: Array de { label, icon?, action?, disabled?, divider? }
- `align`: 'left' | 'right' (default: 'left')

**Slots:**
- `trigger`: Contenido del botón que abre el dropdown

**Emits:**
- `select`: emite el item seleccionado

**Uso:**
```vue
<BaseDropdown
  :items="[
    { label: 'Editar', icon: 'pi pi-pencil', action: 'edit' },
    { label: 'Duplicar', icon: 'pi pi-copy', action: 'duplicate' },
    { divider: true },
    { label: 'Eliminar', icon: 'pi pi-trash', action: 'delete' }
  ]"
  align="right"
  @select="handleAction"
>
  <template #trigger>
    <BaseButton variant="outline" size="sm" icon="pi pi-ellipsis-v" />
  </template>
</BaseDropdown>
```

---

### 13. BaseCheckbox
Checkbox estilizado con estado indeterminado.

**Props:**
- `modelValue`: boolean (v-model)
- `label`: string
- `disabled`: boolean
- `indeterminate`: boolean
- `error`: string

**Uso:**
```vue
<BaseCheckbox v-model="accepted" label="Acepto los términos" />

<BaseCheckbox
  v-model="selectAll"
  label="Seleccionar todo"
  :indeterminate="someSelected"
/>
```

---

### 14. BaseRadio
Radio button con grupo.

**Props:**
- `modelValue`: string | number (v-model)
- `value`: string | number
- `label`: string
- `name`: string (agrupa los radios)
- `disabled`: boolean

**Uso:**
```vue
<BaseRadio v-model="role" value="TEACHER" name="role" label="Docente" />
<BaseRadio v-model="role" value="ADMIN" name="role" label="Administrador" />
```

---

### 15. BaseTextarea
Área de texto con auto-resize y contador de caracteres.

**Props:**
- `modelValue`: string (v-model)
- `label`: string
- `placeholder`: string
- `rows`: number (default: 3)
- `maxLength`: number
- `error`: string
- `help`: string
- `disabled`: boolean
- `required`: boolean
- `autoResize`: boolean

**Uso:**
```vue
<BaseTextarea
  v-model="observation"
  label="Observaciones"
  placeholder="Escribe tus observaciones..."
  :maxLength="500"
  autoResize
/>
```

---

### 16. BaseSwitch
Toggle switch animado.

**Props:**
- `modelValue`: boolean (v-model)
- `label`: string
- `disabled`: boolean
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `activeColor`: string (clase Tailwind, default: 'bg-blue-600')

**Uso:**
```vue
<BaseSwitch v-model="darkMode" label="Modo oscuro" />

<BaseSwitch
  v-model="notifications"
  label="Notificaciones"
  size="lg"
  activeColor="bg-green-600"
/>
```

---

### 17. BaseToast + useAppToast
Sistema de notificaciones toast con auto-dismiss.

**Componente BaseToast:** Se monta una vez en App.vue y se controla via composable.

**Composable useAppToast:**
- `success(title, message?)`: Toast de éxito
- `error(title, message?)`: Toast de error
- `warning(title, message?)`: Toast de advertencia
- `info(title, message?)`: Toast informativo

**Setup en App.vue:**
```vue
<template>
  <BaseToast ref="toastRef" />
  <!-- ...resto del app -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BaseToast } from '@/components'
import { setToastRef } from '@/composables/useAppToast'

const toastRef = ref(null)
onMounted(() => setToastRef(toastRef.value))
</script>
```

**Uso en cualquier componente:**
```vue
<script setup>
import { useAppToast } from '@/composables/useAppToast'

const toast = useAppToast()

function save() {
  // ...guardar datos
  toast.success('Guardado', 'Los datos fueron guardados correctamente')
}
</script>
```

---

## Cómo Importar

**Opción 1: Importación individual**
```typescript
import { BaseButton, BaseCard, BaseModal } from '@/components'
```

**Opción 2: En setup**
```typescript
import BaseButton from '@/components/common/BaseButton.vue'
```

---

## Colores Disponibles

Consulta el archivo `src/tailwind.config.js` para los colores definidos:

- **primary**: Azul (blue-600)
- **danger**: Rojo (red-600)
- **success**: Verde (green-600)
- **warning**: Ámbar (yellow-600)
- **info**: Azul claro (blue-600)

---

## Estado de Componentes

- [x] BaseButton
- [x] BaseCard
- [x] BaseAlert
- [x] StatCard
- [x] BaseInput
- [x] BaseSelect
- [x] BaseTable
- [x] BaseModal / Dialog
- [x] BaseLoader / Spinner
- [x] BasePagination
- [x] BaseBreadcrumb
- [x] BaseDropdown
- [x] BaseCheckbox
- [x] BaseRadio
- [x] BaseTextarea
- [x] BaseSwitch / Toggle
- [x] BaseToast / Toast Notifications
