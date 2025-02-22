import { Router } from "express";
import {
  upload,
  uploadFile,
  listFiles,
  listRecycledFiles,
  deleteFile,
  recycle,
} from "../controllers/uploadController.js";

const router = Router();

// subir archivos
router.post("/", upload.single("file"), uploadFile);

// listar los archivos subidos
router.get("/", listFiles);

// listar los archivos reciclados
router.get("/recycled", listRecycledFiles);

// mover un archivo a la papelera
router.delete("/:fileName", deleteFile);

// vaciar la carpeta recycled
router.delete("/recycled/empty", recycle);


export default router;
