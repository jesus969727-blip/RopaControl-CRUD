export class RopaVista {
  constructor() {
    this.lista = document.getElementById("lista-ropa");
    this.formulario = document.getElementById("formulario-ropa");
    this.tipo = document.getElementById("tipo");
    this.talla = document.getElementById("talla");
    this.precio = document.getElementById("precio");
    this.id = document.getElementById("id");
  }

  obtenerDatosFormulario() {
    return {
      id: this.id.value || Date.now().toString(),
      tipo: this.tipo.value,
      talla: this.talla.value,
      precio: parseFloat(this.precio.value).toFixed(2)
    };
  }

  limpiarFormulario() {
    this.id.value = "";
    this.tipo.value = "";
    this.talla.value = "";
    this.precio.value = "";
  }

  mostrarRopa(listaRopa) {
    this.lista.innerHTML = "";

    listaRopa.forEach(prenda => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${prenda.id}</td>
        <td>${prenda.tipo}</td>
        <td>${prenda.talla}</td>
        <td>$${parseFloat(prenda.precio).toLocaleString('es-CO', { minimumFractionDigits: 2 })}</td>
        <td>
          <button class="editar" data-id="${prenda.id}">Editar</button>
          <button class="eliminar" data-id="${prenda.id}">Eliminar</button>
        </td>
      `;
      this.lista.appendChild(fila);
    });
  }
}
