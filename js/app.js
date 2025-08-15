// Selección de elementos del DOM
const formulario = document.getElementById('formulario-prenda');        // Formulario principal
const inputNombre = document.getElementById('nombre');                  // Campo de nombre de la prenda
const inputCategoria = document.getElementById('categoria');           // Campo de categoría
const inputPrecio = document.getElementById('precio');                 // Campo de precio
const inputId = document.getElementById('prenda-id');                  // Campo oculto para almacenar el ID de la prenda (útil al editar)
const cuerpoTabla = document.getElementById('tabla-prendas-cuerpo');   // Cuerpo de la tabla donde se muestran las prendas

// Evento: Enviar el formulario (Agregar o Editar)
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Obtiene los valores ingresados y realiza limpieza de espacios
    const nombre = inputNombre.value.trim();
    const categoria = inputCategoria.value.trim();
    const precio = parseFloat(inputPrecio.value).toFixed(2); // Convierte a número y limita a 2 decimales

    // Verifica que todos los campos sean válidos
    if (!nombre || !categoria || isNaN(precio)) return;

    // Crea un objeto prenda. Si no hay ID, genera uno nuevo (modo agregar). Si hay ID, es modo editar.
    const prenda = {
        id: inputId.value || Date.now().toString(), // ID único basado en timestamp si es nueva
        nombre,
        categoria,
        precio
    };

    guardarPrenda(prenda); // Función del archivo `storage.js` para guardar en localStorage

    renderizarTabla(); // Refresca la tabla con las prendas actualizadas

    formulario.reset(); // Limpia el formulario
    inputId.value = ''; // Limpia el campo oculto de ID para futuras inserciones
});

// Cargar los datos de una prenda en el formulario para editar
function editarPrenda(id) {
    const prenda = buscarPrendaPorId(id); // Busca la prenda por su ID (función en storage.js)
    if (!prenda) return;

    // Llena los campos del formulario con los datos existentes
    inputNombre.value = prenda.nombre;
    inputCategoria.value = prenda.categoria;
    inputPrecio.value = prenda.precio;
    inputId.value = prenda.id; // Guarda el ID para que el submit lo actualice
}

// Renderiza la tabla HTML con todas las prendas almacenadas
function renderizarTabla() {
    const prendas = obtenerPrendas(); // Obtiene todas las prendas desde storage.js
    cuerpoTabla.innerHTML = ''; // Limpia la tabla antes de volver a llenar

    // Recorre todas las prendas y crea una fila por cada una
    prendas.forEach(prenda => {
        const fila = document.createElement('tr');

        // Crea el contenido HTML de la fila
        fila.innerHTML = `
            <td>${prenda.nombre}</td>
            <td>${prenda.categoria}</td>
            <td>$${prenda.precio}</td>
            <td class="acciones">
                <button class="editar-btn" onclick="editarPrenda('${prenda.id}')">Editar</button>
                <button class="eliminar-btn" onclick="confirmarEliminacion('${prenda.id}')">Eliminar</button>
            </td>
        `;

        cuerpoTabla.appendChild(fila); // Agrega la fila a la tabla
    });
}

// Confirmar antes de eliminar una prenda
function confirmarEliminacion(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta prenda?')) {
        eliminarPrenda(id); // Función del archivo storage.js para eliminar del localStorage
        renderizarTabla(); // Actualiza la tabla luego de eliminar
    }
}

// Al cargar la página, renderiza todas las prendas ya almacenadas
renderizarTabla();
