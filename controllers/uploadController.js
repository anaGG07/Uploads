import fs from "fs";
import { promises as fsPromises } from "fs";
import multer from "multer";
import path from "path";
import { formatFileSize } from "../utils/formatFileSize.js";

// Asegurar que las carpetas "uploads" y "recycled" existan
const uploadPath = path.join(process.cwd(), "uploads");
const recyclePath = path.join(process.cwd(), "recycled");

[uploadPath, recyclePath].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Controlador para subir/restaurar un archivo
export const uploadFile = async (req, res) => {
  try {
    let filePath;
    let fileName;

    // Si el archivo viene de una recuperación, moverlo de "recycled" a "uploads"
    if (req.body.restore) {
      const fileName = req.body.restore;
      const recycledFilePath = path.join(recyclePath, fileName);
      const uploadFilePath = path.join(uploadPath, fileName);

      if (!fs.existsSync(recycledFilePath)) {
        return res
          .status(404)
          .json({ error: "Archivo no encontrado en papelera" });
      }

      await fsPromises.rename(recycledFilePath, uploadFilePath);
      return res
        .status(200)
        .json({ message: "Archivo restaurado correctamente" });
      
    } else {
      // Si es una subida normal, usar "multer"
      if (!req.file) {
        return res
          .status(400)
          .json({ error: "No se ha subido ningún archivo" });
      }
      filePath = path.join(uploadPath, req.file.filename);
      fileName = req.file.filename;
    }


    const stats = fs.statSync(filePath);
    console.log("Archivo procesado:", fileName);

    res.status(200).json({
      message: "Archivo subido con éxito",
      file: {
        name: fileName,
        size: formatFileSize(stats.size),
        mimetype: req.file ? req.file.mimetype : "Desconocido",
      },
    });

  } catch (error) {

    console.error("Error al procesar archivo:", error);
    res.status(500).json({ error: "Error al procesar archivo" });

  }
};

// Controlador para listar los archivos subidos
export const listFiles = (req, res) => {
  try {
    const files = fs.readdirSync(uploadPath);
    const fileDetails = files.map((file) => {
      const filePath = path.join(uploadPath, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: formatFileSize(stats.size),
        date: stats.mtime.toLocaleString(),
      };
    });

    console.log("Archivos enviados al frontend:", fileDetails);
    res.json(fileDetails);

  } catch (error) {

    console.error("Error al listar archivos:", error);
    res.status(500).json({ error: "Error al listar archivos" });

  }
};

// Controlador para listar los archivos reciclados
export const listRecycledFiles = (req, res) => {
  try {

    const files = fs.readdirSync(recyclePath);

    const fileDetails = files.map((file) => {
      const filePath = path.join(recyclePath, file);
      const stats = fs.statSync(filePath);

      return {
        name: file,
        size: formatFileSize(stats.size),
        date: stats.mtime.toLocaleString(),
      };
    });

    console.log("Archivos reciclados enviados al frontend:", fileDetails);
    res.json(fileDetails);

  } catch (error) {

    console.error("Error al listar archivos reciclados:", error);
    res.status(500).json({ error: "Error al listar archivos reciclados" });

  }
};

// Controlador para mover un archivo a la papelera
export const deleteFile = async (req, res) => {
  try {

    const fileName = req.params.fileName;
    const filePath = path.join(uploadPath, fileName);
    const recycledFilePath = path.join(recyclePath, fileName);

    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({ error: `El archivo ${fileName} no existe` });
    }

    await fsPromises.rename(filePath, recycledFilePath);
    res.json({ message: `Archivo ${fileName} movido a la papelera con éxito` });

  } catch (error) {

    console.error(`Error al mover archivo a reciclados:`, error);
    res.status(500).json({ error: "Error al mover archivo a la papelera" });

  }
};

// Controlador para vaciar la papelera
export const recycle = async (req, res) => {

  try {

    const files = fs.readdirSync(recyclePath);
    for (const file of files) {
      fs.unlinkSync(path.join(recyclePath, file));
    }
    res.json({ message: "Papelera vaciada con éxito" });

  } catch (error) {

    console.error("Error al vaciar la papelera:", error);
    res.status(500).json({ error: "Error al vaciar la papelera" });
    
  }
};

export { upload };
