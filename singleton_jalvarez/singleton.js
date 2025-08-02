import { RopaVista } from "../views/ropaView.js";

// Clase Singleton que asegura una única instancia de RopaVista
class VistaSingleton {
  constructor() {
    // Si no existe una instancia previa, se crea una
    if (!VistaSingleton.instance) {
      VistaSingleton.instance = new RopaVista();
    }
    // Siempre retorna la misma instancia
    return VistaSingleton.instance;
  }
}

// Exporta la única instancia disponible
export default new VistaSingleton();
