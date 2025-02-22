import express from "express";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoutes from "./routes/uploadRoutes.js";
import { sendEmail, subscribeEmail } from "./controllers/notifyController.js";
import "./config/config.js"; // Importar configuración del entorno
import { getFolderSize } from "./utils/getSize.js";

const app = express();

// Middleware para procesar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Obtener la ruta absoluta de la carpeta actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorios de archivos
const uploadsDir = path.join(__dirname, "uploads");
const recycledDir = path.join(__dirname, "recycled");

// Función para crear directorios si no existen
const createDirectory = async (dir) => {
  try {
    if (!fs.existsSync(dir)) {
      await fsPromises.mkdir(dir, { recursive: true });
      console.log(`Carpeta creada: ${dir}`);
    }
  } catch (error) {
    console.error(`Error al crear la carpeta ${dir}:`, error);
  }
};

// Crear las carpetas necesarias antes de iniciar el servidor
(async () => {
  await Promise.all([
    createDirectory(uploadsDir),
    createDirectory(recycledDir),
  ]);
  console.log("Directorios creados correctamente");
})();

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", uploadRoutes);



// Endpoint para obtener el tamaño de `uploads` y `recycled`
app.get("/uploads/sizes", async (req, res) => {
  try {
    const uploadsSize = await getFolderSize(uploadsDir);
    const recycledSize = await getFolderSize(recycledDir);
    res.json({ uploads: uploadsSize, recycled: recycledSize });
  } catch (error) {
    console.error("Error al obtener tamaños de carpetas:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los tamaños de carpetas." });
  }
});

// Endpoint para enviar notificaciones manualmente
app.post("/notificaciones", async (req, res) => {
  try {
    await sendEmail();
    res.status(200).json({ message: "Notificación enviada correctamente" });
  } catch (error) {
    console.error("Error al enviar notificación:", error);
    res.status(500).json({ error: "Error al enviar la notificación" });
  }
});

// Endpoint para suscribirse a las notificaciones automáticas
app.post("/suscribir", async (req, res) => {
  try {
    await subscribeEmail(req, res);
  } catch (error) {
    console.error("Error en la suscripción:", error);
    res.status(500).json({ error: "Error al suscribirse" });
  }
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor con manejo de errores
app
  .listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error al iniciar el servidor:", err);
  });
