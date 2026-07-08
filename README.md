# Alocados Restobar - Sistema de Gestión de Pedidos

Proyecto Full-Stack de gestión de pedidos para restaurante, desarrollado como parte de la formación académica en la carrera de Ingeniería de Software en la Universidad La Salle. El sistema integra buenas prácticas de desarrollo, estándares de calidad de software y una arquitectura escalable para la automatización de procesos de venta.

## 🛠 Arquitectura Tecnológica
*   **Frontend**: React + Vite[cite: 1, 4].
*   **Backend**: Node.js con Express (API RESTful).
*   **Base de Datos**: PostgreSQL.
*   **Estándares de Calidad**: Basado en marcos de trabajo como ISO/IEC 25010, ISO 12207 y niveles CMMI.
*   **Autenticación**: Integración con Google OAuth[cite: 1, 4].

## 🚀 Guía de Instalación

### 1. Requisitos Previos
Asegúrate de tener instalados:
- Node.js (v18+)
- PostgreSQL (v14+)
- Git

### 2. Instalación

# Clonar el repositorio
git clone https://github.com/KoldozMMA3/Proyecto_Alocados.git
cd Proyecto_Alocados

# Instalar dependencias del proyecto
npm install

# Implementación de Base de Datos

-- Creación de tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    direccion VARCHAR(255)
);

CREATE TABLE pedido_items (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_nombre VARCHAR(255) NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario NUMERIC(10, 2) NOT NULL
);

-- Creación de tabla de pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    total NUMERIC(10, 2),
    numero_operacion VARCHAR(50),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Ejecución de Servicios 

# En la carpeta del backend
node server.js

# Servidor Frontend:
En la raíz del proyecto 
npm run dev

# Servicio de Notificaciones (Worker):
node worker.js
