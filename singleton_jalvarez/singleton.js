import { RopaVista } from "../views/ropaView.js";

class VistaSingleton extends RopaVista {
  constructor() {
    if (!VistaSingleton.instance) {
      super();
      this.logOperaciones = [];
      this.panelAuditoria = document.getElementById("panel-auditoria");
      this.listaAuditoria = document.getElementById("lista-auditoria");
      VistaSingleton.instance = this;
    }
    return VistaSingleton.instance;
  }

  // registrar; opcional: no registrar (ej. al iniciar)
  registrarOperacion(accion, detalle = "") {
    const fecha = new Date().toLocaleString();
    const registro = { fecha, accion, detalle };
    this.logOperaciones.push(registro);

    // Mostrar en la interfaz como lista <li>
    if (this.listaAuditoria) {
      const li = document.createElement("li");
      li.className = "audit-item";
      li.textContent = `[${fecha}] ${accion} ${detalle}`;
      this.listaAuditoria.appendChild(li);
      // auto-scroll del panel
      if (this.panelAuditoria) {
        this.panelAuditoria.scrollTop = this.panelAuditoria.scrollHeight;
      }
    }

    console.log(`[AUDITORÍA] ${fecha} - ${accion} ${detalle}`);
  }

  exportarLog() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.logOperaciones, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", "log_auditoria.json");
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  limpiarLog() {
    this.logOperaciones = [];
    if (this.listaAuditoria) this.listaAuditoria.innerHTML = "";
    console.log("[AUDITORÍA] Log borrado.");
  }

  /**
   * mostrarRopa(listaRopa, registrar = true)
   * - registrar: si es true, registra la acción en el log. En la carga inicial pasaremos false.
   */
  mostrarRopa(listaRopa, registrar = true) {
    super.mostrarRopa(listaRopa);
    // registrar sólo si se pide y si la llamada es significativa
    if (registrar) {
      // usamos listaRopa.length (puede ser 0 en caso de eliminación completa)
      this.registrarOperacion("Mostrar ropa", `Cantidad: ${listaRopa.length}`);
    }
  }

  limpiarFormulario() {
    super.limpiarFormulario();
    this.registrarOperacion("Formulario limpiado");
  }

  mostrarMensaje(mensaje, tipo = "info") {
    // mejor que alert si quieres algo visual; por ahora dejamos alert y registramos
    alert(`${tipo.toUpperCase()}: ${mensaje}`);
    this.registrarOperacion("Mostrar mensaje", mensaje);
  }
}

export default new VistaSingleton();
