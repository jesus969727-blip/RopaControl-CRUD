// Obtener todas las prendas almacenadas desde localStorage
export function obtenerPrendas() {
    // Parsea el contenido de la clave "ropa", o retorna un array vacío si no existe
    return JSON.parse(localStorage.getItem("ropa")) || [];
}

// Guardar o actualizar una prenda en localStorage
export function guardarPrenda(prenda) {
    let prendas = obtenerPrendas(); // Obtiene la lista actual

    // Busca si ya existe una prenda con el mismo ID
    const indice = prendas.findIndex(p => p.id === prenda.id);

    if (indice !== -1) {
        // Si ya existe, actualiza la prenda
        prendas[indice] = prenda;
    } else {
        // Si no existe, la agrega al arreglo
        prendas.push(prenda);
    }

    // Guarda el arreglo actualizado en localStorage
    localStorage.setItem("ropa", JSON.stringify(prendas));
}

// Eliminar una prenda por ID
export function eliminarPrenda(id) {
    let prendas = obtenerPrendas(); // Carga las prendas actuales

    // Filtra todas las que NO tengan el ID especificado (elimina la seleccionada)
    prendas = prendas.filter(p => p.id !== id);

    // Guarda el nuevo arreglo sin la prenda eliminada
    localStorage.setItem("ropa", JSON.stringify(prendas));
}
