const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
  let serviceAccount;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.error("Error parsing FIREBASE_SERVICE_ACCOUNT env var:", e);
    }
  } else {
    const keyPath = path.join(process.cwd(), 'firebase-key.json');
    if (fs.existsSync(keyPath)) {
      try {
        serviceAccount = require(keyPath);
      } catch (e) {
        console.error("Error loading local firebase-key.json:", e);
      }
    }
  }

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    console.error("Firebase Service Account key not found. Firebase will fail to initialize.");
  }
}

const db = admin.firestore();

// Helper to parse raw body from request stream
async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

// Config to disable Vercel default body parsing (required for signature verification)
const config = {
  api: {
    bodyParser: false,
  },
};

// Send email helper
async function sendOnboardingEmail(email, name, tempPassword) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || (smtpUser ? `"TkOff Pro" <${smtpUser}>` : '"TkOff Pro" <noreply@tkoffpro.com>');

  const subject = "¡Bienvenido a TkOff Pro! Tu cuenta y licencia están listas";
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #0d6efd; margin: 0; font-size: 28px;">TkOff Pro</h1>
        <p style="color: #6c757d; font-size: 14px; margin-top: 5px;">Tu software de cubicación y presupuestos</p>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #0d6efd;">
        <h3 style="margin-top: 0; color: #333;">¡Hola ${name || 'Cliente'}!</h3>
        <p style="color: #555; line-height: 1.5; font-size: 15px;">
          Gracias por tu compra. Hemos creado tu cuenta de acceso para <strong>TkOff Pro</strong>. Ya puedes iniciar sesión en la aplicación.
        </p>
      </div>

      <h4 style="color: #333; margin-bottom: 10px;">Tus credenciales de acceso:</h4>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 15px;">
        <tr>
          <td style="padding: 8px 0; color: #6c757d; width: 120px;"><strong>Email:</strong></td>
          <td style="padding: 8px 0; color: #333;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6c757d;"><strong>Contraseña temporal:</strong></td>
          <td style="padding: 8px 0; color: #333;"><strong>${tempPassword}</strong></td>
        </tr>
      </table>

      <p style="color: #dc3545; font-size: 13px; font-weight: bold; margin-bottom: 25px;">
        * Por seguridad, te recomendamos cambiar tu contraseña temporal haciendo clic en "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión de la aplicación.
      </p>

      <div style="text-align: center; margin-bottom: 25px;">
        <a href="https://tkoffpro.com/download" style="background-color: #0d6efd; color: #ffffff; text-decoration: none; padding: 12px 30px; font-weight: bold; border-radius: 5px; display: inline-block; font-size: 16px;">
          Descargar Aplicación
        </a>
      </div>

      <hr style="border: 0; border-top: 1px solid #e0e0e0; margin-bottom: 20px;" />
      
      <p style="color: #888; font-size: 12px; line-height: 1.4; text-align: center; margin: 0;">
        Si tienes problemas con tu acceso, ponte en contacto con soporte respondiendo a este correo.<br>
        © 2026 TkOff Pro. Todos los derechos reservados.
      </p>
    </div>
  `;

  const textContent = `
¡Hola ${name || 'Cliente'}!

Gracias por tu compra. Hemos creado tu cuenta de acceso para TkOff Pro. Ya puedes iniciar sesión en la aplicación con las siguientes credenciales:

Email: ${email}
Contraseña temporal: ${tempPassword}

* Te recomendamos cambiar tu contraseña temporal haciendo clic en "¿Olvidaste tu contraseña?" en la pantalla de inicio de la app.

Puedes descargar la aplicación en: https://tkoffpro.com/download

Si tienes dudas o problemas con tu acceso, ponte en contacto con soporte respondiendo a este correo.

© 2026 TkOff Pro.
  `;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort, 10),
        secure: parseInt(smtpPort, 10) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: email,
        subject: subject,
        text: textContent,
        html: htmlContent,
      });

      console.log(`Email de bienvenida enviado con éxito a: ${email}`);
      return true;
    } catch (err) {
      console.error(`Error al enviar correo por SMTP a ${email}:`, err);
      return false;
    }
  } else {
    console.log("-----------------------------------------");
    console.log(`[SMTP NO CONFIGURADO] Simulación de correo para: ${email}`);
    console.log(`Asunto: ${subject}`);
    console.log(`Contraseña temporal: ${tempPassword}`);
    console.log("-----------------------------------------");
    return false;
  }
}

// Webhook Handler
async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const rawBody = await getRawBody(req);
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

    // Verify LemonSqueezy Signature
    if (secret) {
      const hmac = crypto.createHmac('sha256', secret);
      const digest = hmac.update(rawBody).digest('hex');
      const signature = req.headers['x-signature'];

      const digestBuffer = Buffer.from(digest, 'hex');
      const signatureBuffer = Buffer.from(signature || '', 'hex');

      if (digestBuffer.length !== signatureBuffer.length || !crypto.timingSafeEqual(digestBuffer, signatureBuffer)) {
        console.warn('Firma de LemonSqueezy inválida.');
        return res.status(401).json({ error: 'Invalid webhook signature.' });
      }
    } else {
      console.warn('Advertencia: LEMON_SQUEEZY_WEBHOOK_SECRET no está configurada. Saltando verificación de firma en desarrollo.');
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;
    const subscriptionData = payload.data;

    if (!subscriptionData || subscriptionData.type !== 'subscriptions') {
      console.log(`Evento ignorado o no es de suscripción: ${eventName}`);
      return res.status(200).json({ received: true, message: 'Not a subscription event. Ignored.' });
    }

    const attrs = subscriptionData.attributes;
    const email = attrs.user_email.toLowerCase().trim();
    const name = attrs.user_name || '';
    const subId = String(subscriptionData.id);
    const status = attrs.status; // active, trialing, cancelled, expired, unpaid, past_due
    const portalUrl = attrs.urls ? attrs.urls.update_payment_method : '';
    
    // Determine expiration date
    const renewsAtStr = attrs.renews_at;
    const endsAtStr = attrs.ends_at;
    const trialEndsAtStr = attrs.trial_ends_at;

    let expireDate = new Date();
    if (renewsAtStr) {
      expireDate = new Date(renewsAtStr);
    } else if (trialEndsAtStr) {
      expireDate = new Date(trialEndsAtStr);
    } else if (endsAtStr) {
      expireDate = new Date(endsAtStr);
    } else {
      expireDate.setDate(expireDate.getDate() + 30);
    }

    const fechaVenceTimestamp = admin.firestore.Timestamp.fromDate(expireDate);

    console.log(`Procesando evento '${eventName}' para '${email}' con status '${status}'. Expira en: ${expireDate.toISOString()}`);

    if (eventName === 'subscription_created') {
      let uid;
      let tempPassword = crypto.randomBytes(6).toString('hex'); // 12 characters password
      let isNewUser = false;

      // 1. Create or Find Auth User in Firebase
      try {
        const userRecord = await admin.auth().createUser({
          email: email,
          emailVerified: true,
          password: tempPassword,
          displayName: name,
        });
        uid = userRecord.uid;
        isNewUser = true;
        console.log(`Usuario de Firebase Auth creado con éxito. UID: ${uid}`);
      } catch (authErr) {
        if (authErr.code === 'auth/email-already-exists') {
          const userRecord = await admin.auth().getUserByEmail(email);
          uid = userRecord.uid;
          console.log(`El usuario ya existía en Firebase Auth. UID: ${uid}`);
        } else {
          throw authErr;
        }
      }

      let subscriptionStatus = 'activa';
      if (status === 'trialing') {
        subscriptionStatus = 'trial';
      }

      // 2. Save user license in Firestore
      const userRef = db.collection('usuarios').doc(uid);
      await userRef.set({
        email: email,
        suscripcion: subscriptionStatus,
        fechaVence: fechaVenceTimestamp,
        plan: attrs.variant_name || 'mensual',
        creadoEn: admin.firestore.FieldValue.serverTimestamp(),
        lemonSqueezySubId: subId,
        customerPortalUrl: portalUrl
      }, { merge: true });

      console.log(`Documento Firestore actualizado para UID: ${uid}`);

      // 3. Send Onboarding Email only if it's a new user
      if (isNewUser) {
        await sendOnboardingEmail(email, name, tempPassword);
      } else {
        console.log(`Usuario existente '${email}' adquirió suscripción. No se envió contraseña temporal.`);
      }

    } else if (eventName === 'subscription_updated') {
      const snapshot = await db.collection('usuarios').where('email', '==', email).limit(1).get();
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const uid = doc.id;
        
        let subscriptionStatus = 'activa';
        if (status === 'trialing') {
          subscriptionStatus = 'trial';
        } else if (status === 'cancelled') {
          subscriptionStatus = 'cancelada';
        } else if (status === 'expired' || status === 'unpaid' || status === 'past_due') {
          subscriptionStatus = 'expired';
        }

        await db.collection('usuarios').doc(uid).update({
          suscripcion: subscriptionStatus,
          fechaVence: fechaVenceTimestamp,
          customerPortalUrl: portalUrl,
          lemonSqueezySubId: subId
        });

        console.log(`Actualizado estado de suscripción de usuario '${uid}' a: ${subscriptionStatus}`);
      } else {
        console.warn(`No se encontró ningún usuario de Firestore con el email '${email}' para actualizar.`);
      }

    } else if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired') {
      const snapshot = await db.collection('usuarios').where('email', '==', email).limit(1).get();
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const uid = doc.id;
        
        const subscriptionStatus = (eventName === 'subscription_expired') ? 'expired' : 'cancelada';

        await db.collection('usuarios').doc(uid).update({
          suscripcion: subscriptionStatus,
          fechaVence: fechaVenceTimestamp
        });

        console.log(`Suscripción de usuario '${uid}' marcada como: ${subscriptionStatus}`);
      } else {
        console.warn(`No se encontró ningún usuario de Firestore con el email '${email}' para cancelar.`);
      }
    }

    return res.status(200).json({ success: true, event: eventName });

  } catch (error) {
    console.error('Error procesando webhook de LemonSqueezy:', error);
    return res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
}

module.exports = handler;
module.exports.config = config;
