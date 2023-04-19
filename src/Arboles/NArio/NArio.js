

// CLASE NODO
class NodoNArio {
  constructor(CarpetaNombrada) {
    this.CarpetaNombrada = CarpetaNombrada;
    this.archivos = [];
    this.NodoHijo = [];
    this.Id = null;
    this.MDispersa = new MDispersa();
  }
}

class ArbolNArio {
  constructor() {
    this.raiz = new NodoNArio("/");
    this.raiz.Id = 0;
    this.tamanio = 1;
  }


  insertar(CarpetaNombrada, RutaPadre) {
    let NodoNuevo = new NodoNArio(CarpetaNombrada);
    let nodoPadre = this.ObtenerCarpeta(RutaPadre);
    if (nodoPadre) {
      let hijosConMismoNombre = nodoPadre.NodoHijo.filter((hijo) =>
        hijo.CarpetaNombrada.startsWith(`copia ${CarpetaNombrada}`)
      );
      if (hijosConMismoNombre.length > 0) {
        // Si ya existe una carpeta con el prefijo "copia {nombre}", enumeramos las copias
        let nuevoNombre = `copia ${CarpetaNombrada} (${hijosConMismoNombre.length + 1
          })`;
        NodoNuevo = new NodoNArio(nuevoNombre);
      } else {
        let hijosConNombre = nodoPadre.NodoHijo.filter(
          (hijo) => hijo.CarpetaNombrada === CarpetaNombrada
        );
        if (hijosConNombre.length > 0) {
          // Si ya existe una carpeta con el mismo nombre, agregamos el prefijo "copia"
          let nuevoNombre = `copia ${CarpetaNombrada}`;
          NodoNuevo = new NodoNArio(nuevoNombre);
        }
      }
      // Validamos si no existe un nodo con el mismo Id que el que queremos asignar
      while (this.BuscarId(NodoNuevo.Id)) {
        NodoNuevo.Id += 1;
      }
      this.tamanio += 1;
      nodoPadre.NodoHijo.push(NodoNuevo);

    } else {
      alert("Ruta no existe");
    }
  }

  BuscarId(id) {
    let cola = [this.raiz];
    while (cola.length > 0) {
      let nodo = cola.shift();
      if (nodo.Id === id) {
        return true;
      }
      nodo.NodoHijo.forEach((hijo) => cola.push(hijo));
    }
    return false;
  }

  ObtenerCarpeta(path) {
    if (path == this.raiz.CarpetaNombrada) {
      return this.raiz;
    } else {
      let temp = this.raiz;
      let carpetas = path.split("/");
      carpetas = carpetas.filter((str) => str !== "");
      let carpeta = null;
      while (carpetas.length > 0) {
        let CarpetaActual = carpetas.shift();
        carpeta = temp.NodoHijo.find(
          (hijo) => hijo.CarpetaNombrada == CarpetaActual
        );
        if (typeof carpeta == "undefined" || carpeta == null) {
          return null;
        }
        temp = carpeta;
      }
      return temp;
    }
  }

  Graficar() {
    let url = "https://quickchart.io/graphviz?graph=";
    let dot = "digraph G {\n";
    dot += "fontsize = 20 \n";

    // Agrega el nodo principal que contiene todas las carpetas del estudiante
    dot +=
      'Estudiante[label="Carpetas del Estudiantes", shape=folder, style=filled, fillcolor=darkseagreen3];\n';

    let nodos = "";
    let conexiones = "";
    let nodo = NArio.raiz;
    let cola = [];
    cola.push(nodo);
    while (cola.length !== 0) {
      let len = cola.length;
      for (let i = 0; i < len; i++) {
        let nodo = cola.shift();
        // Conecta cada carpeta del estudiante al nodo principal
        nodos += `S_${nodo.Id}[label="${nodo.CarpetaNombrada}", shape=folder, style=filled, fillcolor=darkgoldenrod1];\n`;
        nodo.NodoHijo.forEach((item) => {
          conexiones += `S_${nodo.Id} -> S_${item.Id};\n`;
          cola.push(item);
        });
      }
    }

    dot += nodos + "\n" + conexiones + "}";
    let timestamp = new Date().getTime(); // Genera un timestamp actual
    $("#graph").attr("src", url + dot + "&t=" + timestamp); // Agrega el timestamp a la URL
  }

  ObtenerHTML(path) {
    let nodo = this.ObtenerCarpeta(path);
    let codigo = "";
    if (nodo !== null) {
      nodo.NodoHijo.map((hijo) => {
        codigo += ` <div class="col-2 carpeta" onclick="AccederCarpeta('${hijo.CarpetaNombrada}')">
                            <img src="../../../src/assets/carpeta.png" width="100%"/>
                            <p class="h6 text-center">${hijo.CarpetaNombrada}</p>
                        </div>`;
      });

      nodo.archivos.map((file) => {
        if (file.type === "text/plain") {
          // Archivo de texto
          codigo += `
            <div class="col-2 carpeta">
              <p class="h6 text-center">            
                
                <img src="../../../src/assets/archivo.png" width="100%" onclick="selAccion(event, '${file.content}', '${file.name}')"/>
                <a href="${file.content}" download="${file.name}" style="color: black;">
                ${file.name}
                </a>
              </p>
            </div>
          `;
        } else {
          codigo += ` 
            <div class="col-2 carpeta">                            
              <p class="h6 text-center">                
                <img src="${/^image\//.test(file.type) ? "../../../src/assets/imagen.png" : "../../../src/assets/logopdf.png"}" width="100%" onclick="selAccion(event, '${file.content}', '${file.name}')"/>
                <a href="${file.content}" download="${file.name}" style="color: black;">
                    ${file.name}
                </a>
              </p>                      
            </div>
          `;
        }
      });

      return codigo;
    } else {
      return false;
    }
  }

  eliminarCarpeta(path) {
    let nodoEliminar = this.ObtenerCarpeta(path);
    if (nodoEliminar) {
      let nodoPadre = this.ObtenerCarpeta(this.ObtenerRutaPadre(path));
      if (nodoPadre) {
        let carpetaNombre = nodoEliminar.CarpetaNombrada; // Guardar el nombre de la carpeta antes de eliminarla
        let ruta = this.ObtenerRuta(path);
        if (confirm(`¿Está seguro de eliminar la carpeta ${carpetaNombre} en la ruta ${ruta}?`)) {
          nodoPadre.NodoHijo = nodoPadre.NodoHijo.filter(nodo => nodo.CarpetaNombrada !== nodoEliminar.CarpetaNombrada);
          let carpetaEliminada = {
            nombre: carpetaNombre, // Usar la variable para incluir el nombre de la carpeta eliminada en la variable
            ruta: path
          };
          alert(`Carpeta ${path} eliminada correctamente`);
          $("#Ruta").val("/");
          $("#carpetas").html(NArio.ObtenerHTML("/"));
          return carpetaEliminada;
        } else {
          // No hacer nada
        }
      } else {
        alert(`Carpeta ${path} no puede ser eliminada, la ruta padre no existe`);
      }
    } else {
      alert(`Carpeta ${path} no existe`);
    }
  }

  ObtenerRuta(nodo) {
    if (!nodo.Padre) {
      // si es la raíz, retorna solo el nombre
      return nodo.CarpetaNombrada;
    } else {
      // si no, sigue subiendo en el árbol y concatenando
      let rutaPadre = this.ObtenerRuta(nodo.Padre);
      return `${rutaPadre}/${nodo.CarpetaNombrada}`;
    }
  }

  ObtenerRutaPadre(path) {
    let carpetas = path.split("/");
    carpetas.pop();
    return carpetas.join("/");
  }
}