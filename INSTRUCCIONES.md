# Portfolio Interactivo Pixel Art

¡Hola Antonella! Tu portfolio interactivo 2D está listo y funcionando. 

Para que la experiencia esté completa, necesitas agregar tus archivos personales (CV y videos) en las carpetas correspondientes. Aquí tienes la guía de dónde poner cada cosa:

## 1. Tu Currículum (CV)
*   **Archivo:** `cv-antonella.pdf`
*   **Dónde guardarlo:** En la carpeta `public/` (la ruta completa es `public/cv-antonella.pdf`).
*   **¿Dónde aparece?:** En el celular (PhoneApp), dentro de la app "Descargar CV". Cuando el usuario haga clic, se descargará este archivo.

## 2. Videos de Creación de Contenido
*   **Archivos:** Tus videos en formato `.mp4` (ej. `video1.mp4`, `video2.mp4`).
*   **Dónde guardarlos:** En la carpeta `public/videos/`.
*   **¿Dónde aparecen?:** En la computadora (DesktopOS), en la carpeta "Creación de Contenido".
*   *(Nota: Actualmente hay un reproductor de placeholder. Cuando tengas los videos listos, podemos conectarlos rápidamente para que se reproduzcan al hacer clic en las miniaturas).*

## 3. Enlaces y Textos (Si cambian)
*   Si querés modificar tus textos, experiencia, habilidades o redes sociales, estos se encuentran en:
    *   `src/components/ui/PhoneApp.tsx` (para la info del celular).
    *   `src/components/ui/DesktopOS.tsx` (para los proyectos y videos en la compu).

## 4. Cómo ejecutar el proyecto
Si el servidor se detiene, podés volver a iniciarlo abriendo la terminal en esta carpeta y ejecutando:
```bash
npm run dev
```
## 5. Imágenes de Fondo (Habitación, PC y Celular)
Las 4 variaciones del fondo de la habitación están guardadas como archivos JPG completos en la carpeta `public/`:
* `public/room_off_off.jpg`: Todo apagado (fondo inicial).
* `public/room_pc_off.jpg`: Solo la computadora prendida.
* `public/room_off_phone.jpg`: Solo el celular prendido.
* `public/room_pc_phone.jpg`: Ambos dispositivos prendidos.

Si querés reemplazar o editar a mano cualquiera de estas imágenes (en Photoshop, Canva o tu editor de preferencia), simplemente guardá tus nuevos archivos `.jpg` en la carpeta `public/` con esos mismos nombres exactos. El sistema los cargará y conmutará automáticamente sin necesidad de editar código. 🎨

## 6. Carpeta "Mis Trabajos" (NUEVO) 💼
* **Dónde guardarlos:** En la carpeta `public/mis_trabajos/` (`c:\Users\Anto\Desktop\APPCHEQUEATE\portfolio\public\mis_trabajos`).
* **¿Qué podés poner ahí?:** Cualquier archivo PDF, imágenes de tus prototipos UX/UI, capturas de pantalla, archivos de diseño o videos de tus proyectos.
* **¿Dónde aparecen?:** En el escritorio de la computadora (DesktopOS) dentro de la nueva carpeta **"Mis Trabajos"** (que se puede arrastrar y mover libremente como en un escritorio real).

---

¡Avisame si querés realizar alguna otra modificación! 🚀
