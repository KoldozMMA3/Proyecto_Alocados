const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function procesarOutbox() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Seleccionamos los eventos pendientes bloqueando las filas para evitar colisiones (FOR UPDATE SKIP LOCKED)
        const res = await client.query(
            "SELECT id, payload FROM outbox WHERE estado = 'PENDIENTE' ORDER BY creado_en ASC LIMIT 5 FOR UPDATE SKIP LOCKED"
        );

        if (res.rows.length === 0) {
            await client.query('COMMIT');
            return;
        }

        for (const evento of res.rows) {
            console.log(`\n[Worker] >>> Procesando Evento ID: ${evento.id}`);
            console.log(`[Worker] [NOTIFICACIÓN] Enviando correo a: ${evento.payload.email}`);
            console.log(`[Worker] [Detalle]: Su orden #${evento.payload.pedidoId} por un total de S/ ${evento.payload.total} ha sido recibida.`);

            // Simulamos el retraso de red del envío
            await new Promise(resolve => setTimeout(resolve, 1000));

            await client.query("UPDATE outbox SET estado = 'PROCESADO' WHERE id = $1", [evento.id]);
            console.log(`[Worker] <<< Evento ID: ${evento.id} marcado como PROCESADO.`);
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error en el worker:', error);
    } finally {
        client.release();
    }
}

console.log('Worker de Notificaciones Outbox iniciado...');
setInterval(procesarOutbox, 5000); // Revisa la base de datos cada 5 segundos