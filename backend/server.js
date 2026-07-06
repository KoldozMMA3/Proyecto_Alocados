const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const JWT_SECRET = process.env.JWT_SECRET;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Configuración del transportador de correos (Nodemailer)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

pool.connect((err, client, release) => {
    if (err) return console.error('Error de conexión a la DB:', err.stack);
    console.log('Conexión exitosa a la base de datos PostgreSQL');
    release();
});

// 1. REGISTRO MEJORADO CON ENVÍO DE CÓDIGO VERIFICADOR OTP
app.post('/api/registro', async (req, res) => {
    const { email, password } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Generamos un código aleatorio de 6 dígitos
        const codigoOTP = Math.floor(100000 + Math.random() * 900000).toString();

        // Guardamos al usuario como NO VERIFICADO junto a su código
        await pool.query(
            'INSERT INTO usuarios (email, password_hash, codigo_verificacion, verificado) VALUES ($1, $2, $3, false)',
            [email, passwordHash, codigoOTP]
        );

        // Enviar el correo electrónico real con el código
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Código de Verificación - Alocados Restobar',
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; border: 1px solid #eee; padding: 20px; border-radius: 10px; max-width: 500px; margin: auto;">
                    <h2 style="color: #b91c1c;">¡Bienvenido a Alocados Restobar!</h2>
                    <p>Para completar tu registro y asegurar tus compras, ingresa el siguiente código de verificación en nuestra plataforma:</p>
                    <div style="background-color: #f3f4f6; display: inline-block; padding: 15px 30px; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #1f2937; border-radius: 5px; margin: 20px 0;">
                        ${codigoOTP}
                    </div>
                    <p style="color: #6b7280; font-size: 12px;">Este código expirará pronto. Si no solicitaste esta cuenta, ignora este mensaje.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ mensaje: "Código enviado al correo electrónico." });

    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: "El correo ya existe." });
        console.error(error);
        res.status(500).json({ error: "Error en el registro o al enviar el correo." });
    }
});

// 2. NUEVO ENDPOINT PARA VALIDAR EL CÓDIGO OTP ENVIADO
app.post('/api/verificar', async (req, res) => {
    const { email, codigo } = req.body;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const usuario = result.rows[0];

        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado." });

        if (usuario.codigo_verificacion === codigo) {
            // El código coincide, activamos la cuenta y limpiamos el campo del código
            await pool.query(
                'UPDATE usuarios SET verificado = true, codigo_verificacion = null WHERE email = $1',
                [email]
            );
            res.json({ mensaje: "Cuenta verificada con éxito. Ya puedes iniciar sesión." });
        } else {
            res.status(400).json({ error: "El código introducido es incorrecto." });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al verificar el código." });
    }
});

// 3. LOGIN ACTUALIZADO QUE EXIGE CUENTA VERIFICADA
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const usuario = result.rows[0];

        if (!usuario || !(await bcrypt.compare(password, usuario.password_hash))) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        // REQUISITO: Si el usuario no está verificado, no se le emite el JWT
        if (!usuario.verificado) {
            return res.status(403).json({ error: "Tu cuenta aún no ha sido verificada. Revisa tu correo electrónico." });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '2h' });
        res.json({ mensaje: "Autenticación exitosa", token, usuario: { email: usuario.email } });
    } catch (error) {
        res.status(500).json({ error: "Error en el inicio de sesión." });
    }
});

// 4. INICIO DE SESIÓN CON GOOGLE (Las cuentas de Google ya vienen verificadas por defecto)
app.post('/api/google-login', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload.email;

        let result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        let usuario = result.rows[0];

        if (!usuario) {
            const randomPassword = Math.random().toString(36).slice(-10);
            const passwordHash = await bcrypt.hash(randomPassword, 10);
            // Al venir de Google, se guarda directamente como verificado = true
            const insertResult = await pool.query(
                'INSERT INTO usuarios (email, password_hash, verificado) VALUES ($1, $2, true) RETURNING id, email',
                [email, passwordHash]
            );
            usuario = insertResult.rows[0];
        }

        const jwtToken = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({ mensaje: 'Autenticación con Google exitosa', token: jwtToken, usuario: { email: usuario.email } });
    } catch (error) {
        res.status(401).json({ error: 'Token de Google inválido.' });
    }
});

// Middleware de Bearer Token para compras (No cambia)
const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: "Falta el token de autorización." });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Token inválido o expirado." });
        req.usuario = decoded;
        next();
    });
};

// Registro de Compra Transactional Outbox (No cambia)
app.post('/api/comprar', verificarToken, async (req, res) => {
    const { total, items, numeroOperacion } = req.body;
    const usuarioId = req.usuario.id;

    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Transacción Atómica

        // Guardamos el pedido enlazando el código de operación de Yape
        const resPedido = await client.query(
            'INSERT INTO pedidos (usuario_id, total, numero_operacion) VALUES ($1, $2, $3) RETURNING id, creado_en',
            [usuarioId, total, numeroOperacion]
        );
        const pedidoId = resPedido.rows[0].id;
        const fechaPedido = resPedido.rows[0].creado_en;

        const payload = {
            pedidoId,
            usuarioId,
            email: req.usuario.email,
            total,
            items,
            numeroOperacion,
            fecha: fechaPedido
        };

        // El evento se inserta en estado PENDIENTE dentro del mismo bloque relacional
        await client.query(
            "INSERT INTO outbox (tipo_evento, payload, estado) VALUES ($1, $2, 'PENDIENTE')",
            ['COMPRA_REALIZADA', JSON.stringify(payload)]
        );

        await client.query('COMMIT'); 
        res.status(201).json({ mensaje: "Compra registrada con éxito", pedidoId });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ error: "Fallo crítico en el procesamiento de la compra." });
    } finally {
        client.release();
    }
});

app.listen(process.env.PORT, () => console.log(`API activa en el puerto ${process.env.PORT}`));