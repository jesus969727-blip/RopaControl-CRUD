// Clase que representa la Vista dentro del patrón MVC
export class RopaVista {
    constructor() {
        // Elementos del DOM usados por la vista
        this.lista = document.getElementById("lista-ropa");          // Tabla donde se muestran las prendas
        this.formulario = document.getElementById("formulario-ropa"); // Formulario para agregar/editar ropa
        this.tipo = document.getElementById("tipo");                 // Campo de tipo de ropa
        this.talla = document.getElementById("talla");               // Campo de talla
        this.precio = document.getElementById("precio");             // Campo de precio
        this.id = document.getElementById("id");                     // Campo oculto de ID (para modo edición)
    }

    // Método para obtener los datos ingresados en el formulario
    obtenerDatosFormulario() {
        return {
            id: this.id.value || Date.now().toString(), // Genera un ID si no existe (modo agregar)
            tipo: this.tipo.value,
            talla: this.talla.value,
            precio: this.precio.value
        };
    }

    // Método para limpiar el formulario después de agregar o editar una prenda
    limpiarFormulario() {
        this.id.value = "";
        this.tipo.value = "";
        this.talla.value = "";
        this.precio.value = "";
    }

    // Método para mostrar la lista de prendas en la tabla
    mostrarRopa(listaRopa) {
        this.lista.innerHTML = ""; // Limpia el contenido actual de la tabla

        listaRopa.forEach(prenda => {
            // Crea una fila para cada prenda
            const fila = document.createElement("tr");

            // Rellena la fila con los datos de la prenda
            fila.innerHTML = `
                <td>${prenda.id}</td>
                <td>${prenda.nombre}</td> <!-- Asegúrate de que tu objeto prenda tenga la propiedad "nombre" -->
                <td>${prenda.talla}</td>
                <td>$${parseFloat(prenda.precio).toLocaleString('es-CO', { minimumFractionDigits: 0 })}</td>
                <td>
                    <button class="editar" data-id="${prenda.id}">Editar</button>
                    <button class="eliminar" data-id="${prenda.id}">Eliminar</button>
                </td>
            `;

            // Agrega la fila a la tabla
            this.lista.appendChild(fila);
        });
    }
}
