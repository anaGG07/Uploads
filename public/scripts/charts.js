
document.addEventListener("DOMContentLoaded", async function () {
  try {
    await updateChartData(); //  Cargar datos iniciales al cargar la página
  } catch (error) {
    console.error("Error inicializando el gráfico:", error);
  }
});

// FUNCIÓN PARA ACTUALIZAR EL GRÁFICO
async function updateChartData() {
  try {
    
    const response = await fetch("http://localhost:3000/uploads/sizes"); //  Obtener datos del servidor
    const data = await response.json();
    console.log("Actualizando gráfico con datos:", data);

    //  Obtener el contenedor del gráfico
    const chartContainer = document.getElementById("chartContainer");
    const canvas = document.getElementById("myChart");
    const noDataMessage = document.getElementById("noDataMessage");

    //  Verificar si hay datos para mostrar
    if (data.uploads === 0 && data.recycled === 0) {
      
      canvas.style.display = "none";
      noDataMessage.style.display = "block";
      return;

    } else {
      canvas.style.display = "block";
      noDataMessage.style.display = "none";
    }

    //  Actualizarlo
    if (window.myChart && window.myChart.data) {

      window.myChart.data.datasets[0].data = [data.uploads, data.recycled];
      window.myChart.update();

    } else {

      //  Crearlo si no existe
      var ctx = document.getElementById("myChart").getContext("2d");
      window.myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Archivos Subidos (bytes)", "Archivos en Papelera (bytes)"],
          datasets: [
            {
              data: [data.uploads, data.recycled],
              backgroundColor: ["rgb(223, 171, 0)", "rgba(255, 44, 44, 0.7)"],
              borderColor: ["rgb(223, 171, 0)", "rgba(255, 44, 44, 0.7)"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            tooltip: { enabled: true },
          },
        },
      });
    }
  } catch (error) {

    console.error("Error actualizando el gráfico:", error);
  }
}
