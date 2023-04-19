
// CLASE NODO
class NodoMD {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;

    // APUNTADORES
    this.up = null;
    this.down = null;
    this.right = null;
    this.left = null;
  }
}

let nombre;
// CLASE  MATRIZ DISPERSA
class MDispersa {

  constructor(valorInicio) {
    // Si se proporciona un valor para "Inicio", se utiliza ese valor. De lo contrario, se asigna un valor por defecto.
    const valor = valorInicio !== undefined ? valorInicio : "Inicio";
    nombre = valor;
    this.head = new NodoMD(-1, -1, valor);
  }


  insertar(x, y, value) {
    // CREAR CABECERAS DE LAS FILAS O EJE X
    this.EncabezadosX(x);
    // CREAR CABECERAS DE LAS COLUMNAS O EJE Y
    this.EncabezadosY(y);
    // CREAR EL NUEVO NODO
    const node = new NodoMD(x, y, value);
    // AGREGAR AL EJE X
    this.AgregarX(node, x);
    // AGREGAR AL EJE Y
    this.AgregarY(node, y);
  }

  // REALIZAR LAS CABECERAS EN LAS FILAS O EJE X
  EncabezadosX(x) {
    const curr = new NodoMD(-1, -1, x);
    if (this.head.down == null) {
      this.head.down = curr;
      curr.up = this.head;
    } else {
      let temp = this.head;

      // ENCONTRAR EL ESPACIO PARA LA CABECERA
      while (temp.down != null && temp.down.value < x) {
        temp = temp.down;
      }
      //INSERTAR AL FINAL SI ES ULTIMO
      if (temp.down == null) {
        temp.down = curr;
        curr.up = temp;
      } else if (temp.down != null && temp.down.value != x) {
        // INSERCIÓN ENTRE NODOS
        let r = temp.down;
        temp.down = curr;
        curr.up = temp;
        curr.down = r;
        r.up = curr;
      }
    }
  }

  EncabezadosY(y) {
    const curr = new NodoMD(-1, -1, y);
    if (this.head.right == null) {
      this.head.right = curr;
      curr.left = this.head;
    } else {
      let temp = this.head;

      // ENCONTRAR EL ESPACIO PARA LA CABECERA
      while (temp.right != null && temp.right.value < y) {
        temp = temp.right;
      }
      //INSERTAR AL FINAL SI ES ULTIMO
      if (temp.right == null) {
        temp.right = curr;
        curr.left = temp;
      } else if (temp.right != null && temp.right.value != y) {
        // INSERCIÓN ENTRE NODOS
        let r = temp.right;
        temp.right = curr;
        curr.left = temp;
        curr.right = r;
        r.left = curr;
      }
    }
  }

  AgregarX(NodoN, x) {
    let temp = this.head;
    // BUSCAR LA CABECERA
    while (temp.value != x) {
      temp = temp.down;
    }
    // INSERCION SI LA FILA ESTA VACIA
    if (temp.right == null) {
      temp.right = NodoN;
      NodoN.left = temp;
    } else {
      let curr = temp.right;
      // INSERTAR ORDENADAMENTE
      if (curr.y >= NodoN.y) {
        // CAMBIAR DE LUGAR CON EL PRIMERO DE LA LISTA
        NodoN.right = curr;
        NodoN.right.left = NodoN;
        //ENLAZARLO A LA CABECERA
        NodoN.left = temp
        temp.right = NodoN
        //ASIGNARLO AL PRIMERO DE LA LISTA
        curr = NodoN;
      } else {
        while (curr.right != null && curr.right.y < NodoN.y) {
          curr = curr.right;
        }
        NodoN.right = curr.right;
        if (curr.right != null) {
          NodoN.right.left = NodoN;
        }
        curr.right = NodoN;
        NodoN.left = curr;
      }

    }

  }

  AgregarY(NodoN, y) {
    let temp = this.head;
    // BUSCAR LA CABECERA
    while (temp.value != y) {
      temp = temp.right;
    }
    // INSERCION SI LA FILA ESTA VACIA
    if (temp.down == null) {
      temp.down = NodoN;
      NodoN.up = temp;
    } else {
      let curr = temp.down;
      // INSERTAR ORDENADAMENTE
      if (curr.x >= NodoN.x) {
        // CAMBIAR DE LUGAR CON EL PRIMERO DE LA LISTA
        NodoN.down = curr;
        NodoN.down.up = NodoN;
        //ENLAZARLO A LA CABECERA
        NodoN.up = temp
        temp.down = NodoN
        //ASIGNARLO AL PRIMERO DE LA LISTA
        curr = NodoN;
      } else {
        while (curr.down != null && curr.down.y < NodoN.y) {
          curr = curr.down;
        }
        NodoN.down = curr.down;
        if (curr.down != null) {
          NodoN.down.up = NodoN;
        }
        curr.down = NodoN;
        NodoN.up = curr;
      }

    }
  }

  ImprimirX() {
    let tx = null;
    try { tx = this.head.down } catch (error) { tx = null; console.log("errorX1"); }
    let ty = null;
    while (tx != null) {
      try { ty = tx.right } catch (error) { ty = null; console.log("errorX2"); }
      let str = ""
      while (ty != null) {
        str += ty.value + ",";
        ty = ty.right;
      }
      console.log(tx.value, ": ", str)
      tx = tx.down;
    }
  }

  ImprimirY() {
    let ty = null;
    try { ty = this.head.right } catch (error) { ty = null; console.log("errorY1"); }
    let tx = null;
    while (ty != null) {
      try { tx = ty.down } catch (error) { tx = null; console.log("errorY2"); }
      let str = ""
      while (tx != null) {
        str += tx.value + ",";
        tx = tx.down;
      }
      console.log(ty.value, ": ", str)
      ty = ty.right;
    }
  }

  ModificarValor(x, y, nuevoValor) {
    let temp = this.head.down;
    while (temp != null && temp.value != x) {
      temp = temp.down;
    }
    if (temp == null) {
      console.log(`No se encontró el nodo con coordenadas (${x}, ${y})`);
      return;
    }

    let curr = temp.right;
    while (curr != null && curr.y != y) {
      curr = curr.right;
    }
    if (curr == null) {
      console.log(`No se encontró el nodo con coordenadas (${x}, ${y})`);
      return;
    }

    curr.value = nuevoValor;
  }
  

  Graficar() {
    let dot = 'Estudiante[label="Matriz Dispersa", shape=square, style=filled, fillcolor=darkseagreen3];\n';
    // Utilizar el valor del nodo "head" en la cadena de texto
    dot += `M0[ label = "${nombre}" width = 1.5 shape = "square" style = "filled" fillcolor ="slateblue" group="0"]; \n`;
    dot += this.GraficaEncabezados()
    dot += this.GraficaNodos()
    return (dot)
  }

  GraficaEncabezados() {
    let conn = "M0 ->";
    let nodes = "";
    let rank = "{rank = same; M0; "
    let temp = null;
    try { temp = this.head.right } catch (error) { temp = null; console.log("GRAPH"); }
    while (temp != null) {
      nodes += "Y" + temp.value + `[label="${temp.value}" width = 1.5 shape ="square" style="filled" fillcolor="skyblue3" group = ${temp.value} ];\n`
      rank += "Y" + temp.value + ";";
      if (temp.right != null) {
        conn += "Y" + temp.value + "->";
      } else {
        conn += "Y" + temp.value + `[dir="both"];\n`;
      }
      temp = temp.right;
    }

    conn += 'M0 ->';
    try { temp = this.head.down } catch (error) { temp = null; console.log("GRAPH"); }
    while (temp != null) {
      nodes += "X" + temp.value + `[label="${temp.value}" width = 1.5 shape ="square" style="filled" fillcolor="skyblue3" group="0"];\n`
      if (temp.down != null) {
        conn += "X" + temp.value + "->";
      } else {
        conn += "X" + temp.value + `[dir="both"];\n`;
      }
      temp = temp.down;
    }

    rank += "}";
    return nodes + "\n" + conn + "\n" + rank + "\n";
  }

  GraficaNodos() {
    let conn = "";
    let nodes = "";
    let rank = ""
    let tx = null;
    try { tx = this.head.down } catch (error) { tx = null; console.log("errorX1"); }
    let ty = null;
    while (tx != null) {
      try { ty = tx.right } catch (error) { ty = null; console.log("errorX2"); }
      conn += `X${ty.x} -> `
      while (ty != null) {
        nodes += `S${ty.x}_${ty.y}[label="${ty.value}" width=1.5 shape="square" style="filled" fillcolor="slategray1" group="${ty.y}"];\n`
        rank += `{rank=same; X${ty.x}; S${ty.x}_${ty.y};}\n`;
        if (ty.right != null) {
          conn += `S${ty.x}_${ty.y} ->`;
        } else {
          conn += `S${ty.x}_${ty.y} [dir="both"]; \n`;
        }
        ty = ty.right;
      }
      tx = tx.down;
    }

    try { ty = this.head.right } catch (error) { ty = null; console.log("errorY1"); }
    tx = null;
    while (ty != null) {
      try { tx = ty.down } catch (error) { tx = null; console.log("errorX2"); }
      conn += `Y${tx.y} -> `
      while (tx != null) {
        if (tx.down != null) {
          conn += `S${tx.x}_${tx.y} ->`;
        } else {
          conn += `S${tx.x}_${tx.y} [dir="both"]; \n`;
        }
        tx = tx.down;
      }
      ty = ty.right;
    }

    return  nodes + "\n" + rank + "\n" + conn;
  }
}
