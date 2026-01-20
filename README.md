# Newsletter Manager (Django + React)

Aplicacion full stack para crear y enviar newsletters con adjuntos PDF/imagenes, gestionar suscriptores y programar envios automatizados. Combina API REST en Django y frontend React listo para correr en Docker.

## Requisitos rapidos
- Docker (recomendado) o Python 3.10+ para backend (Django 5.1) y Node 18+ para frontend.

## Lo que puedes hacer
- Crear newsletters con titulo, PDF y/o imagen adjunta.
- Enviar al instante o programar fecha/hora de envio (`scheduled_for`).
- Gestionar suscriptores (alta/baja) y respetar el opt-out via URL de desuscripcion.
- Guardar adjuntos en disco y enviar contenido HTML con fallback de texto.
- Ejecutar tareas programadas para despachar newsletters pendientes.

## Arquitectura rapida
- Backend: Django + Django REST Framework, SQLite por defecto, CORS habilitado para el frontend.
- Frontend: React (Create React App) con axios para consumir la API.
- Docker Compose: levanta backend en `:8000` y frontend servido por Nginx en `:3000`.

## Como levantar rapido
1) Arranca todo con Docker:
   ```bash
   docker compose up --build
   ```
   - Frontend: http://localhost:3000
   - API: http://127.0.0.1:8000/api

2) Sin Docker (modo desarrollo):
   - Backend
     ```bash
     cd newsletter_app
     python -m venv .venv && . .venv/bin/activate
     pip install -r ../requirements.txt
     python manage.py migrate
     python manage.py runserver 0.0.0.0:8000
     ```
   - Frontend
     ```bash
     cd newsletter-front
     npm install
     npm start
     ```
   Ajusta `REACT_APP_API_URL` si el backend no corre en el host por defecto.

## API esencial (base `/api`)
- `GET /newsletters/` listar
- `POST /newsletters/` crear (multipart con `title`, `content_pdf`, `content_image`)
- `POST /newsletters/{id}/send/` enviar ahora
- `POST /newsletters/{id}/schedule/` programar (`scheduled_for` en ISO 8601)
- `DELETE /newsletters/{id}/` borrar
- `GET /subscribers/` listar
- `POST /subscribers/` alta (`email`)
- `GET /unsubscribe/{email}/` baja simple por email

## Flujo de uso sugerido
- Crea suscriptores desde el panel React.
- Sube PDF/imagen y crea la newsletter.
- Envia al instante o programa con fecha/hora ISO (`2024-10-22T18:00:00Z`).
- Corre la tarea programada `send_scheduled_newsletters` (cron/Celery o comando manual) para despachar pendientes, por ejemplo:
  ```bash
  python manage.py shell -c "from newsletters.tasks import send_scheduled_newsletters; send_scheduled_newsletters()"
  ```

## Configuracion util
- Email: por defecto usa `EmailBackend` de consola. Define `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USE_TLS`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD` para correo real.
- CORS: edita `CORS_ALLOWED_ORIGINS` en `newsletter_app/settings.py` o usa env `DJANGO_ALLOWED_HOSTS` en Docker.
- Archivos: los adjuntos se guardan bajo `media/newsletters/` en el contenedor o en disco local.
- Frontend: define `REACT_APP_API_URL` para apuntar al backend que uses (localhost, container, etc.).

## Stack y skills tecnicos
- Django 5, Django REST Framework, SQLite/ORM de Django, CORS.
- Envio de email con adjuntos (EmailMessage) y plantillas HTML.
- React (CRA), axios, FontAwesome, consumo de API REST y manejo de `FormData`.
- Docker/Docker Compose para levantar frontend+backend en segundos.
