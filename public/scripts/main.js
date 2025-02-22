// IMPORTACIONES Y SELECCIÓN DE ELEMENTOS DEL DOM
const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
const fileListTemp = document.getElementById("fileListTemp");
const fileDelete = document.getElementById("recycle");
const filesMessage = document.getElementById("filesMessage");
const recycledMessage = document.getElementById(
  "recycledMessage"
);
const notifyForm = document.getElementById("notifyForm");
const emailInput = document.getElementById("emailInput");
const notifyMessage = document.getElementById("notifyMessage");

// OBTENER Y LISTAR ARCHIVOS SUBIDOS
async function fetchFiles() {
  try {
    const response = await fetch("/uploads");
    if (!response.ok) throw new Error("Error al obtener los archivos");

    const files = await response.json();
    fileList.innerHTML = "";

    if (!Array.isArray(files) || files.length === 0) {

      filesMessage.style.display = "block";
      fileList.style.display = "none";

    } else {

      filesMessage.style.display = "none";
      fileList.style.display = "block";

      files.forEach((file) => {
        if (!file || !file.name || !file.size || !file.date) {
          console.warn("Datos incompletos para:", file);
          return;
        }

        const li = document.createElement("li");
        li.className =
          "flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-sm";
        li.innerHTML = `
          <div class="flex flex-col">
              <span class="font-medium">${file.name}</span>
              <span class="text-sm text-gray-600">📏 Tamaño: ${file.size}</span>
              <span class="text-sm text-gray-600">📅 Fecha: ${file.date}</span>
          </div>
          <button class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 delete-file" data-filename="${file.name}">
              Eliminar
          </button>
        `;

        fileList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Error en fetchFiles:", error);
  }
}

// SUBIR ARCHIVOS
document.getElementById("uploadForm").addEventListener("submit", async (e) => {

  e.preventDefault();
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {

    const response = await fetch("/uploads", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al subir archivo");

    await fetchFiles();
    await updateChartData();

  } catch (error) {

    console.error("Error en uploadFile:", error);

  }
});

// LISTAR ARCHIVOS "RECICLADOS"
async function fetchRecycledFiles() {
  try {

    const response = await fetch("/uploads/recycled");

    if (!response.ok)
      throw new Error("Error al obtener los archivos reciclados");

    const files = await response.json();
    fileListTemp.innerHTML = "";

    if (files.length === 0) {

      recycledMessage.style.display = "block";
      fileListTemp.style.display = "none";

    } else {

      recycledMessage.style.display = "none";
      fileListTemp.style.display = "block";

      files.forEach((file) => {
        if (!file || !file.name || !file.size || !file.date) {
          console.warn("Datos incompletos para archivo reciclado:", file);
          return;
        }

        const li = document.createElement("li");
        li.className =
          "flex justify-between items-center bg-gray-200 p-2 rounded-lg shadow-sm";
        li.innerHTML = `
          <div class="flex flex-col">
              <span class="font-medium">${file.name}</span>
              <span class="text-sm text-gray-600">📏 Tamaño: ${file.size}</span>
              <span class="text-sm text-gray-600">📅 Fecha: ${file.date}</span>
          </div>
          <button class="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 restore-file" data-restore="${file.name}">
              Recuperar
          </button>
        `;

        fileListTemp.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Error en fetchRecycledFiles:", error);
  }
}

// ELIMINAR ARCHIVOS
fileList.addEventListener("click", async (e) => {

  if (e.target.classList.contains("delete-file")) {
    const fileName = e.target.dataset.filename;

    try {

      const response = await fetch(`/uploads/${fileName}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar archivo");

      await fetchFiles();
      await fetchRecycledFiles();
      await updateChartData();

    } catch (error) {
      console.error("Error eliminando archivo:", error);
    }
  }
});

// RESTAURAR ARCHIVOS
fileListTemp.addEventListener("click", async (e) => {

  if (e.target.classList.contains("restore-file")) {
    const fileName = e.target.dataset.restore;

    try {

      const formData = new FormData();
      formData.append("restore", fileName);

      const response = await fetch("/uploads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al restaurar archivo");
      await fetchFiles();
      await fetchRecycledFiles();
      await updateChartData();

    } catch (error) {

      console.error("Error restaurando archivo:", error);
    }
  }
});

// VACIAR PAPELERA
fileDelete.addEventListener("click", async () => {

  try {

    const response = await fetch("/uploads/recycled/empty", {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al vaciar papelera");
    await fetchRecycledFiles();
    await updateChartData();

  } catch (error) {

    console.error("Error vaciando papelera:", error);
  }
});

// SUSCRIBIRSE A NOTIFICACIONES
notifyForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (!email) {
    notifyMessage.textContent = "Por favor, ingresa un email válido.";
    notifyMessage.style.display = "block";
    return;
  }

  try {

    const response = await fetch("/suscribir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (response.ok) {
      notifyMessage.textContent = result.message;
      notifyMessage.style.display = "block";
      notifyMessage.style.color = "green";

    } else {

      notifyMessage.textContent = result.error;
      notifyMessage.style.display = "block";
      notifyMessage.style.color = "red";

    }
    
  } catch (error) {

    console.error("Error en la suscripción:", error);
  }
});

// ACTUALIZAR GRÁFICO
document.addEventListener("DOMContentLoaded", () => {
  fetchFiles();
  fetchRecycledFiles();
  updateChartData();
});
