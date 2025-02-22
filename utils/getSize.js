import fs from "fs";
import path from "path";

const fsPromises = fs.promises;

// Calcular el tamaño total de una carpeta
export const getFolderSize = async (folderPath) => {
  try {
    const files = await fsPromises.readdir(folderPath);
    let totalSize = 0;

    for (const file of files) {
      const filePath = path.join(folderPath, file);

      try {

        const stats = await fsPromises.stat(filePath);
        if (stats.isFile()) {
          totalSize += stats.size;
        }

      } catch (err) {

        console.error(`No se pudo leer el archivo ${file}:`, err);

      }
    }
    
    return totalSize;

  } catch (error) {

    console.error(
      `Error al calcular el tamaño de la carpeta ${folderPath}:`,
      error
    );
    return 0;
  }
};
