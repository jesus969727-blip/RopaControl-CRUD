// Referencias a elementos del DOM
const tipo = document.getElementById('tipo'); // Select de tipo de prenda
const talla = document.getElementById('talla'); // Select de talla, que se actualizará según el tipo
const formulario = document.getElementById('formulario-ropa'); // Formulario completo
const tituloFormulario = document.getElementById('titulo-formulario'); // Título del formulario (Agregar o Editar)

// Diccionario que relaciona tipos de ropa con sus respectivas tallas
const tallasPorTipo = {
    sueter: ['S', 'M', 'L', 'XL'],
    pantalon: ['28', '30', '32', '34', '36'],
    camisa: ['XS', 'S', 'M', 'L', 'XL'],
    otra: ['Única']
};

// Evento que actualiza dinámicamente el select de tallas cuando se cambia el tipo
tipo.addEventListener('change', () => {
    const opciones = tallasPorTipo[tipo.value] || []; // Obtiene las tallas según el tipo seleccionado

    // Reinicia el select de tallas
    talla.innerHTML = '<option value="" disabled selected>Talla</option>';

    // Agrega las nuevas opciones de talla según el tipo
    opciones.forEach(t => {
        const option = document.createElement('option');
        option.value = t;
        option.textContent = t;
        talla.appendChild(option);
    });
});

// Evento al enviar el formulario: actualiza el título dependiendo de si se está editando o agregando
formulario.addEventListener('submit', () => {
    const id = document.getElementById('id').value;
    tituloFormulario.textContent = id ? "Editar producto" : "Agregar producto";
});

// Función para formatear el precio en pesos colombianos
function formatearPrecio(valor) {
    return `$ ${parseFloat(valor).toLocaleString('es-CO')}`;
}

// Hace disponible la función para usarla desde el HTML o en otros scripts
window.formatearPrecio = formatearPrecio;
