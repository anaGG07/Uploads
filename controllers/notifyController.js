import sgMail from "@sendgrid/mail";
import path from "path";
import fs from "fs";
import { formatFileSize } from "../utils/formatFileSize.js";
import { getFolderSize } from "../utils/getSize.js";
import dotenv from "dotenv";
import cron from "node-cron";

dotenv.config(); 

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const VERIFIED_EMAIL = process.env.SENDGRID_VERIFIED_EMAIL;

// Verificar variables de entorno 
if (!SENDGRID_API_KEY || !VERIFIED_EMAIL) {
  console.error(
    "Error: Faltan configuraciones en .env (SENDGRID_API_KEY o VERIFIED_EMAIL)"
  );
  process.exit(1);
}

sgMail.setApiKey(SENDGRID_API_KEY); // <---- Configurar SendGrid con la API Key

// Definir rutas LOCALES para almacenamiento 
const DATA_DIR = path.join(process.cwd(), "data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");
const uploadPath = path.join(process.cwd(), "uploads");
const recyclePath = path.join(process.cwd(), "recycled");


// Crear la carpetas si no existen
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(SUBSCRIBERS_FILE)) {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([]), "utf8");
}

// Cargar la lista de correos suscritos desde el archivo
const loadSubscribers = () => {
  try {
    const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf8");
    return new Set(JSON.parse(data));
  } catch (error) {
    console.error("Error al cargar los suscriptores:", error);
    return new Set();
  }
};

// Guardar la lista de correos suscritos en el archivo
const saveSubscribers = (emails) => {
  try {
    fs.writeFileSync(
      SUBSCRIBERS_FILE,
      JSON.stringify([...emails], null, 2),
      "utf8"
    );
    console.log("Correos guardados en subscribers.json:", [...emails]);

  } catch (error) {
    console.error("Error al guardar los suscriptores:", error);
  }
};

let subscribedEmails = loadSubscribers(); // Cargar los correos suscritos


// Función para suscribir un email
export const subscribeEmail = (req, res) => {

  subscribedEmails = loadSubscribers();

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "El campo email es obligatorio" });
  }

  if (subscribedEmails.has(email)) {
    return res.status(400).json({ error: "Este email ya está suscrito" });
  }

  subscribedEmails.add(email);
  saveSubscribers(subscribedEmails);

  console.log(`Email suscrito: ${email}`);
  res.status(200).json({ message: "Email suscrito con éxito" });
};

// Función para enviar el correo
export const sendEmail = async () => {

  subscribedEmails = loadSubscribers();

  if (subscribedEmails.size === 0) {
    console.log("No hay emails suscritos.");
    return;
  }

  // Obtener tamaños totaes
  const totalUploads = await getFolderSize(uploadPath);
  const totalRecycled = await getFolderSize(recyclePath);

  const uploadFiles = fs.readdirSync(uploadPath).map((file) => {
    const stats = fs.statSync(path.join(uploadPath, file));

    return {
      name: file,
      size: formatFileSize(stats.size),
      date: stats.mtime.toLocaleString(),
    };
  });

 
  const recycledFiles = fs.readdirSync(recyclePath).map((file) => {
    const stats = fs.statSync(path.join(recyclePath, file));

    return {
      name: file,
      size: formatFileSize(stats.size),
      date: stats.mtime.toLocaleString(),
    };
  });

  // Contenido del correo (lo que se ve)
  const emailContent = `
    <h2>📂 Almacenamiento</h2>
    <h3>Archivos Subidos (Total: ${formatFileSize(totalUploads)})</h3>
    <ul>${uploadFiles
      .map(
        (file) => `<li>${file.name} - ${file.size} - Subido: ${file.date}</li>`
      )
      .join("")}</ul>
    <h3>🗑 Archivos en Papelera (Total: ${formatFileSize(totalRecycled)})</h3>
    <ul>${recycledFiles
      .map(
        (file) => `<li>${file.name} - ${file.size} - Movido: ${file.date}</li>`
      )
      .join("")}</ul>
    <hr>
    <a href="http://localhost:3000" target="_blank" style="color: #007bff; text-decoration: none;">Gestor de Archivos</a>
  `;

  // Configurar y enviar el correo
  const msg = {
    to: [...subscribedEmails],
    from: VERIFIED_EMAIL,
    subject: "📊 Historial de Almacenamiento",
    html: emailContent,
  };

  try {

    await sgMail.sendMultiple(msg);
    console.log("Correos enviados correctamente");

  } catch (error) {

    console.error(
      "Error al enviar correos:",
      error.response?.body || error.message
    );
  }
};

// Configurar la tarea automática con cron
cron.schedule("*/5 * * * *", () => { // <--- MODIFICAR AQUI EL TIEMPO PARA ENVIAR LOS EMAILS (5 minutos para pruebas)
  console.log("Ejecutando envío automático de correos...");
  sendEmail();
});
