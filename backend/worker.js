const { Pool } = require('pg');
const nodemailer = require('nodemailer');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function procesarOutboxEnvioRecibos() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const res = await client.query(
            "SELECT id, payload FROM outbox WHERE estado = 'PENDIENTE' ORDER BY creado_en ASC LIMIT 1 FOR UPDATE SKIP LOCKED"
        );

        if (res.rows.length === 0) {
            await client.query('COMMIT');
            return;
        }

        const evento = res.rows[0];
        const p = evento.payload;

        console.log(`\n[Worker Outbox] Generando recibo electrónico para el Pedido #${p.pedidoId}...`);

        // Mapear dinámicamente los productos para construir las filas de la tabla HTML
        const filasProductosHTML = p.items.map(item => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${item.nombre}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center; color: #555;">${item.cantidad}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; color: #b91c1c; font-weight: bold;">S/. ${(item.precioUnitario * item.cantidad).toFixed(2)}</td>
            </tr>
        `).join('');

        // Plantilla HTML del Recibo de Compra Profesional
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: p.email,
            subject: `🧾 Tu Recibo de Compra - Pedido #${p.pedidoId} - Alocados Restobar`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e4e4e7; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    <div style="background-color: #b91c1c; padding: 30px; text-align: center; color: white;">
                        <h1 style="margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Alocados Restobar</h1>
                        <p style="margin: 5px 0 0 0; opacity: 0.8; font-size: 14px;">¡Comprobante de Pago Electrónico!</p>
                    </div>
                    <div style="padding: 30px; background-color: #ffffff;">
                        <p style="color: #4b5563; font-size: 15px;">Hola <strong>${p.email.split('@')[0]}</strong>, hemos verificado tu transferencia exitosamente. Aquí tienes el detalle de tu compra:</p>
                        
                        <table style="width: 100%; margin-top: 20px; border-collapse: collapse; font-size: 14px;">
                            <thead>
                                <tr style="background-color: #f3f4f6;">
                                    <th style="padding: 10px; text-align: left; color: #374151;">Producto</th>
                                    <th style="padding: 10px; text-align: center; color: #374151;">Cant.</th>
                                    <th style="padding: 10px; text-align: right; color: #374151;">Total</th>
                                </tr>
                                // Dentro de la plantilla HTML en worker.js, añade este bloque:
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Dirección de entrega:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${p.direccion}</td>
                                </tr>
                            </thead>
                            <tbody>
                                ${filasProductosHTML}
                            </tbody>
                        </table>

                        <div style="margin-top: 25px; padding: 15px; background-color: #fef2f2; border-radius: 8px; border-left: 5px solid #b91c1c;">
                            <table style="width: 100%; font-size: 14px; color: #4b5563;">
                                <tr>
                                    <td><strong>Método de Validación:</strong></td>
                                    <td style="text-align: right;">Yape Express</td>
                                </tr>
                                <tr>
                                    <td><strong>Código Operación Yape:</strong></td>
                                    <td style="text-align: right; color: #0d9488; font-weight: bold;"># ${p.numeroOperacion}</td>
                                </tr>
                                <tr style="font-size: 18px; color: #111827;">
                                    <td style="padding-top: 10px;"><strong>Monto Total Pagado:</strong></td>
                                    <td style="text-align: right; padding-top: 10px; color: #b91c1c; font-weight: 900;">S/. ${p.total.toFixed(2)}</td>
                                </tr>
                            </table>
                        </div>

                        <div style="text-align: center; margin-top: 30px;">
                            <p style="font-size: 13px; color: #9ca3af; margin: 0;">Tu orden ya está siendo preparada por nuestros chefs en cocina.</p>
                            <p style="font-size: 14px; color: #b91c1c; font-weight: bold; margin-top: 5px;">¡Gracias por tu preferencia!</p>
                        </div>
                    </div>
                </div>
            `
        };

        // Despachamos el correo asíncronamente
        await transporter.sendMail(mailOptions);
        console.log(`[Worker Outbox] Mail enviado con éxito a ${p.email}`);

        // Si se envió bien, actualizamos el estado en la base de datos a PROCESADO
        await client.query("UPDATE outbox SET estado = 'PROCESADO' WHERE id = $1", [evento.id]);
        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('[Worker Error]:', error);
    } finally {
        client.release();
    }
}

console.log('Worker activo. Escaneando cola de salida (Transactional Outbox) cada 6 segundos...');
setInterval(procesarOutboxEnvioRecibos, 6000);