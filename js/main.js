import vista from "../singleton_jalvarez/singleton.js";

// obtener desde localStorage
let prendas = JSON.parse(localStorage.getItem("prendas")) || [];

// guarda una prenda; devuelve {action:'create'|'update', prenda}
function guardarPrenda(prenda) {
  const index = prendas.findIndex(p => p.id === prenda.id);
  if (index >= 0) {
    prendas[index] = prenda;
    localStorage.setItem("prendas", JSON.stringify(prendas));
    return { action: "update", prenda };
  } else {
    prendas.push(prenda);
    localStorage.setItem("prendas", JSON.stringify(prendas));
    return { action: "create", prenda };
  }
}

function eliminarPrenda(id) {
  prendas = prendas.filter(p => p.id !== id);
  localStorage.setItem("prendas", JSON.stringify(prendas));
}

function buscarPrendaPorId(id) {
  return prendas.find(p => p.id === id);
}

// Al cargar la página: mostramos sin registrar (evita "Cantidad: 0" si no hay datos)
vista.mostrarRopa(prendas, false);

// Evento formulario: crea o actualiza
vista.formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = vista.obtenerDatosFormulario();

  // validación simple: tipo, talla, precio
  if (!datos.tipo || !datos.talla || !datos.precio) {
    vista.mostrarMensaje("Completa todos los campos", "error");
    return;
  }

  const resultado = guardarPrenda(datos);
  // registrar la acción correspondiente
  if (resultado.action === "create") {
    vista.registrarOperacion("Crear prenda", `ID: ${datos.id} - ${datos.tipo} ${datos.talla} $${datos.precio}`);
    vista.mostrarMensaje("Prenda creada", "success");
  } else {
    vista.registrarOperacion("Actualizar prenda", `ID: ${datos.id}`);
    vista.mostrarMensaje("Prenda actualizada", "success");
  }

  // actualizar vista y limpiar
  vista.mostrarRopa(prendas); // default registrar = true
  vista.limpiarFormulario();
});

// Click en tabla: editar / eliminar
vista.lista.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("editar")) {
    const prenda = buscarPrendaPorId(id);
    if (!prenda) return;

    // llenar formulario (esto no guarda aún)
    vista.tipo.value = prenda.tipo;
    vista.talla.value = prenda.talla;
    vista.precio.value = prenda.precio;
    vista.id.value = prenda.id;

    vista.registrarOperacion("Cargar para editar", `ID: ${id}`);
  } else if (e.target.classList.contains("eliminar")) {
    if (confirm("¿Deseas eliminar esta prenda?")) {
      eliminarPrenda(id);
      vista.registrarOperacion("Eliminar prenda", `ID: ${id}`);
      vista.mostrarRopa(prendas);
    }
  }
});

// Botones exportar / limpiar log desde interfaz
const btnExportar = document.getElementById("btn-exportar-log");
const btnLimpiar = document.getElementById("btn-limpiar-log");

if (btnExportar) {
  btnExportar.addEventListener("click", () => vista.exportarLog());
}
if (btnLimpiar) {
  btnLimpiar.addEventListener("click", () => {
    if (confirm("¿Limpiar todo el log de auditoría?")) {
      vista.limpiarLog();
    }
  });
}
