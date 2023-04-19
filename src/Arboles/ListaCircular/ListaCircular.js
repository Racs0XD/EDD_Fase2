class NodoCircular {
  constructor(accion, fecha, hora) {
    this.accion = accion;
    this.fecha = fecha;
    this.hora = hora;
    this.siguiente = null;
  }
}

class ListaCircular {
  constructor() {
    this.primero = null;
    this.contador = 0;
    if (this.primero) {
      let ultimoNodo = this.primero;
      do {
        this.contador = ultimoNodo.id;
        ultimoNodo = ultimoNodo.siguiente;
      } while (ultimoNodo !== this.primero);
    }
  }

  agregar(accion, fecha, hora) {
    const nuevoNodo = new NodoCircular(accion, fecha, hora);
    if (!this.primero) {
      this.primero = nuevoNodo;
      nuevoNodo.siguiente = nuevoNodo;
      nuevoNodo.id = ++this.contador;
    } else {
      let ultimoNodo = this.primero;
      while (ultimoNodo.siguiente !== this.primero) {
        ultimoNodo = ultimoNodo.siguiente;
      }
      ultimoNodo.siguiente = nuevoNodo;
      nuevoNodo.siguiente = this.primero;
      nuevoNodo.id = ++this.contador;
    }
  }

  
  Graficar() {
    // Inicializar la variable 'dot' con el encabezado de DOT
    let dot = "digraph G {\n";
    dot += "fontsize = 20;\n";

    dot +=
      'Estudiante[label="Bitacora del Estudiantes", shape=folder, style=filled, fillcolor=darkseagreen3];\n';
    
    // Recorrer la lista circular y agregar cada nodo a 'dot'
    let nodoActual = this.primero;
    if(nodoActual !== null){
      do {
        dot += `S_${nodoActual.id}[label="${nodoActual.accion} \\n ${nodoActual.fecha} \\n ${nodoActual.hora}", shape=box, style=filled, fillcolor=darkgoldenrod1];\n`;
        nodoActual = nodoActual.siguiente;
      } while (nodoActual !== this.primero);
      
      // Agregar las conexiones entre los nodos en 'dot'
      nodoActual = this.primero;
      do {
        dot += `S_${nodoActual.id} -> S_${nodoActual.siguiente.id};\n`;
        nodoActual = nodoActual.siguiente;
      } while (nodoActual !== this.primero);
      
      // Cerrar 'dot'
      dot += "}";
      
      // Agregar el gráfico al elemento HTML 'graph'
      let url = "https://quickchart.io/graphviz?graph=";
      $("#graph2").attr("src", url + dot);
    }    
  }
  
}
