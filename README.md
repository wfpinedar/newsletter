# Proyecto Completo de Gestión de Newsletters con Backend y Frontend

Este proyecto consiste en un sistema de gestión de newsletters desarrollado con **Django** para el backend y **React** para el frontend. La aplicación permite a los administradores crear newsletters, programar envíos, enviar archivos PDF o imágenes adjuntas, y gestionar una lista de suscriptores.

## Tabla de Contenidos
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración del Proyecto Backend](#configuración-del-proyecto-backend)
- [Configuración del Proyecto Frontend](#configuración-del-proyecto-frontend)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Iniciar la Aplicación](#iniciar-la-aplicación)
- [Explicación de la Funcionalidad](#explicación-de-la-funcionalidad)
- [Estilo y Diseño](#estilo-y-diseño)

## Requisitos

- Node.js (v16 o superior)
- npm (v6 o superior)
- Python (v3.9 o superior)
- Django (v4.0 o superior)

## Instalación

1. **Clonar el Repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd newsletter-front
   ```

## Configuración del Proyecto Backend

### Paso 1: Crear un Entorno Virtual
Para mantener las dependencias del proyecto organizadas, se recomienda usar un entorno virtual.

```bash
python -m venv env
source env/bin/activate  # En Windows usar `env\Scripts\activate.bat`
```

### Paso 2: Instalar Dependencias del Backend
Dentro del entorno virtual, instala Django y otras dependencias necesarias.

```bash
pip install -r requirements.txt
```

### Paso 3: Configurar el Proyecto Django

1. **Migrar la Base de Datos**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Iniciar el Servidor**:
   ```bash
   python manage.py runserver
   ```

El backend estará disponible en [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api).

## Configuración del Proyecto Frontend

### Paso 1: Levantar el Proyecto React
El proyecto se creó utilizando **Create React App** para una configuración rápida y sencilla.

Acceder a la carpeta del proyecto:
```bash
cd newsletter-front
```

### Paso 2: Instalar dependencias
Se requiere **axios** para manejar las solicitudes HTTP hacia el backend y **react-router-dom** para la navegación en la aplicación.
```bash
npm install
```

## Estructura del Proyecto

El proyecto tiene la siguiente estructura básica:

```
newsletter-frontend/
├── src/
│   ├── components/
│   │   ├── NewsletterList.js
│   │   ├── SubscriberList.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   └── index.js
```

- **components/**: Contiene los componentes reutilizables como `NewsletterList` y `SubscriberList`.
- **services/**: Incluye el archivo `api.js` que define las funciones para interactuar con la API del backend.
- **App.js**: Punto de entrada principal para la aplicación, donde se integran los componentes.

## Iniciar la Aplicación

### Iniciar el Backend
Para iniciar el servidor de desarrollo de Django, usa el siguiente comando dentro de la carpeta del backend:
```bash
python manage.py runserver
```

### Iniciar el Frontend
Para iniciar el servidor de desarrollo de React, usa el siguiente comando dentro de la carpeta del frontend:
```bash
npm start
```

### Iniciar la con docker

```bash
docker-compose up --build
```

Este comando iniciará la aplicación en [http://localhost:3000](http://localhost:3000).

## Explicación de la Funcionalidad

### Servicios API (Backend)
En el backend, la API se desarrolló usando **Django Rest Framework**. Algunos de los endpoints expuestos incluyen:

- **GET /newsletters/**: Recupera todas las newsletters.
- **POST /newsletters/**: Crea una nueva newsletter (se permiten archivos PDF e imágenes).
- **POST /newsletters/{id}/send/**: Envía una newsletter específica.
- **POST /newsletters/{id}/schedule/**: Programa una newsletter para enviarla en una fecha futura.
- **GET /subscribers/**: Recupera todos los suscriptores.
- **POST /subscribers/**: Añade un nuevo suscriptor.
- **GET /unsubscribe/{email}**: Desuscribe a un usuario con un email específico.

### Servicios API (Frontend)
En el archivo `src/services/api.js` se definen las funciones para interactuar con la API del backend. Algunos ejemplos de estas funciones son:

- **getNewsletters**: Recupera todas las newsletters.
- **createNewsletter**: Crea una nueva newsletter con datos en `FormData`, permitiendo incluir archivos PDF e imágenes.
- **sendNewsletter**: Envía una newsletter específica a los suscriptores.
- **scheduleNewsletter**: Programa el envío de una newsletter en una fecha futura.
- **getSubscribers**: Recupera todos los suscriptores.
- **createSubscriber**: Agrega un nuevo suscriptor.
- **unsubscribeUser**: Desuscribe a un suscriptor específico a través de su email.

### Componentes

- **NewsletterList** (`src/components/NewsletterList.js`):
  - Permite crear, enviar y programar newsletters.
  - El formulario permite agregar un título, adjuntar un archivo PDF y/o una imagen.
  - Muestra la lista de newsletters creadas.

- **SubscriberList** (`src/components/SubscriberList.js`):
  - Permite agregar nuevos suscriptores por correo electrónico.
  - Muestra la lista de todos los suscriptores registrados.

### Integración de Componentes
En el archivo `src/App.js`, los componentes `NewsletterList` y `SubscriberList` se integran dentro del componente principal, proporcionando un punto central para la administración de newsletters y suscriptores.

### Crear una Newsletter
El formulario de creación de newsletters permite adjuntar un archivo PDF y una imagen para que los destinatarios reciban la newsletter con esos adjuntos. La función `handleCreateNewsletter` gestiona el envío de la información al backend usando `FormData`.

```js
const handleCreateNewsletter = () => {
  const formData = new FormData();
  formData.append('title', newTitle);
  if (pdfFile) {
    formData.append('pdf_file', pdfFile);
  }
  if (imageFile) {
    formData.append('image_file', imageFile);
  }

  createNewsletter(formData)
    .then(() => {
      setNewTitle('');
      setPdfFile(null);
      setImageFile(null);
      document.getElementById('pdf-input').value = "";
      document.getElementById('image-input').value = "";
      fetchNewsletters();
    })
    .catch(error => console.error('Error creating newsletter:', error));
};
```

Hecho con ❤️ por [Wilmar Fernando Pineda Rojas](https://github.com/wfpinedar).

