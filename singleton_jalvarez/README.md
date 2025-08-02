# Implementación del Patrón Singleton

## ¿Qué es el patrón Singleton?

El patrón Singleton es un patrón de diseño creacional que garantiza que una clase tenga **una única instancia** durante toda la ejecución de la aplicación, y proporciona un punto global de acceso a esa instancia. Es útil para controlar el acceso a recursos compartidos como interfaces, configuración, conexión a base de datos, etc.

## ¿Cómo lo implementé?

Dentro de la carpeta `singleton_alvarez`, creé el archivo `singleton.js` donde definí una clase `VistaSingleton`. Esta clase:

- Verifica si ya existe una instancia previa.
- Si no existe, crea una nueva instancia de `RopaVista`.
- Retorna siempre la misma instancia, sin importar cuántas veces se llame.

## ¿Qué hace mi ejemplo?

Mi ejemplo garantiza que `RopaVista` se instancie **una sola vez**, evitando duplicación de la interfaz gráfica o eventos. Así, cualquier parte de la aplicación que necesite interactuar con la vista gráfica lo hará a través de la misma instancia.

Esto ayuda a mantener consistencia en la aplicación y facilita su mantenimiento.
