// Importación del modelo, Singleton de la vista y funciones de almacenamiento
import { Ropa } from "../models/ropaModel.js";
import vista from "../singleton_jalvarez/singleton.js"; // Usamos la instancia única de RopaVista desde el Singleton
import { obtenerPrendas, guardarPrenda, eliminarPrenda } from "../js/storage.js";

// 🔧 Función principal del controlador
function iniciarControlador() {

    // Manejador del evento de envío del formulario (Agregar o Editar prenda)
    vista.formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita el recargo de página por defecto

        // Obtiene los datos ingresados en el formulario
        const datos = vista.obtenerDatosFormulario();

        // Crea una nueva instancia del modelo Ropa con los datos del formulario
        const prenda = new Ropa(datos.id, datos.tipo, datos.talla, datos.precio);

        // Guarda la prenda en el almacenamiento (localStorage)
        guardarPrenda(prenda);

        // Actualiza la lista mostrada con las prendas guardadas
        vista.mostrarRopa(obtenerPrendas());

        // Limpia el formulario para nuevos datos
        vista.limpiarFormulario();

        // Restaura el título del formulario
        document.getElementById("titulo-formulario").textContent = "Agregar Producto";
    });

    // Manejador para clics en la lista de productos (eliminar o editar)
    vista.lista.addEventListener("click", (e) => {
        const id = e.target.dataset.id;

        // Eliminar prenda
        if (e.target.classList.contains("eliminar")) {
            eliminarPrenda(id); // Elimina del localStorage
            vista.mostrarRopa(obtenerPrendas()); // Refresca la lista

        // Editar prenda
        } else if (e.target.classList.contains("editar")) {
            // Busca la prenda seleccionada por ID
            const prenda = obtenerPrendas().find(p => p.id === id);

            if (prenda) {
                // Carga los datos de la prenda al formulario
                vista.id.value = prenda.id;
                vista.tipo.value = prenda.nombre;
                vista.talla.value = prenda.talla;
                vista.precio.value = prenda.precio;

                // Dispara un evento de cambio para actualizar dinámicamente
                const evento = new Event('change');
                vista.tipo.dispatchEvent(evento);

                // Cambia el título del formulario a "Editar"
                document.getElementById("titulo-formulario").textContent = "Editar Producto";
            }
        }
    });

    // Inicializa la vista mostrando todas las prendas guardadas
    vista.mostrarRopa(obtenerPrendas());
}

// Llama a la función para iniciar el controlador
iniciarControlador();
