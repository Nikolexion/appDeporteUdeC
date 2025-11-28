# Court Manager App 🏀

Aplicación web para gestionar canchas, equipos y torneos deportivos.

## 🚀 Desarrollo Local

Para ejecutar la aplicación en tu computador:

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Despliegue en Netlify

### Opción 1: Despliegue Automático desde GitHub (Recomendado)

1. **Sube tu código a GitHub** (si aún no lo has hecho)
   
2. **Ve a [Netlify](https://netlify.com)** y crea una cuenta (puedes usar tu cuenta de GitHub)

3. **Haz clic en "Add new site" → "Import an existing project"**

4. **Conecta con GitHub** y selecciona tu repositorio

5. **Configuración automática**: Netlify detectará automáticamente la configuración gracias al archivo `netlify.toml`
   - Build command: `npm run build`
   - Publish directory: `dist`

6. **Haz clic en "Deploy"** y espera unos minutos

7. **¡Listo!** Obtendrás una URL como `https://tu-proyecto.netlify.app` que puedes compartir con cualquier persona

### Opción 2: Despliegue Manual (Drag & Drop)

1. **Construye la aplicación localmente**:
   ```bash
   npm run build
   ```

2. **Ve a [Netlify](https://app.netlify.com/drop)** (sección "Deploy manually")

3. **Arrastra la carpeta `dist`** que se creó en tu proyecto

4. **¡Listo!** Netlify te dará una URL pública

## 🔄 Actualizar el Sitio

- **Con GitHub**: Solo haz `git push` y Netlify actualizará automáticamente
- **Manual**: Vuelve a hacer `npm run build` y arrastra la nueva carpeta `dist`

## 📝 Características

- ✅ Progressive Web App (PWA) - Se puede instalar en el móvil
- ✅ Responsive Design - Funciona en cualquier dispositivo
- ✅ React Router - Navegación entre páginas
- ✅ Gestión de canchas, equipos y torneos

## 🛠️ Tecnologías

- React 19
- Vite
- React Router
- Lucide Icons
- PWA Support
