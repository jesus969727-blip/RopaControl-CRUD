Implementación del Patrón Singleton con Auditoría
¿Qué es el patrón Singleton?

El patrón Singleton es un patrón de diseño creacional que garantiza que una clase tenga una única instancia durante toda la ejecución de la aplicación y proporciona un punto global de acceso a esa instancia.
Es útil para controlar el acceso a recursos compartidos como interfaces, configuración, conexiones a base de datos, etc.

¿Cómo lo implementé?

Dentro de la carpeta singleton_alvarez, creé el archivo singleton.js donde definí la clase VistaSingleton, que hereda de RopaVista y añade capacidades de auditoría.
Esta clase:

Comprueba si ya existe una instancia previa.

Si no existe, crea una nueva instancia de RopaVista extendida con funciones de registro.

Retorna siempre la misma instancia sin importar cuántas veces se solicite.

Funcionalidades extra de la nueva versión

Además de garantizar una única instancia de la vista, esta versión incorpora un sistema de auditoría de operaciones:

Registro de acciones: guarda en memoria cada operación realizada, como mostrar ropa, limpiar formulario o mostrar mensajes.

Interfaz de auditoría: las acciones registradas se muestran en tiempo real dentro de un panel de auditoría en la página.

Exportación del log: permite descargar el historial completo en formato JSON.

Limpieza del historial: opción para borrar el log directamente desde la aplicación.

Control de registro automático: algunos métodos permiten evitar registrar acciones repetitivas o no relevantes (por ejemplo, la carga inicial de datos).

¿Qué hace mi ejemplo?

Este ejemplo asegura que RopaVista se instancie una sola vez y, al mismo tiempo, añade trazabilidad a todas las acciones importantes en la interfaz.
De esta forma:

Se mantiene la consistencia de la interfaz gráfica.

Se tiene un historial en tiempo real de las operaciones realizadas.

Se facilita el mantenimiento y depuración de la aplicación.
