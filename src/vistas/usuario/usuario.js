//--------------------------------------------------------------------------
//                      DECLARACIÓN DE LAS ESTRUCTURAS A UTILIZAR
//--------------------------------------------------------------------------

let MD;


let NArio = new ArbolNArio();
let LCircular = new ListaCircular();
let bitacoras = JSON.parse(localStorage.getItem("bitacoras")) || {};
let matrices = {};
// Crear el objeto Dispersa si no existe en el localStorage
let Dispersa = JSON.retrocycle(JSON.parse(localStorage.getItem("Dispersa"))) || {};



document.addEventListener("DOMContentLoaded", function () {
  // Aquí puedes llamar a tu función para que se ejecute solo una vez al cargar la página HTML

  if (MD === undefined) {
    MD = new MDispersa("Raiz /");

  }
  obtenerCarpetasUsuario(carnet);
});

const carnet = window.location.search.split("=")[1];
const carnetElement = document.getElementById("carnet");
carnetElement.innerHTML = carnet;
const token = localStorage.getItem("tokenU");
if (carnet !== token) {
  window.location.href = "../../../src/vistas/login/login.html";
}

function cS() {
  if (localStorage.getItem("tokenA")) {
    localStorage.removeItem("tokenA");
    window.location.href = "../../../src/vistas/login/login.html";
  } else if (localStorage.getItem("tokenU")) {
    localStorage.removeItem("tokenU");
    window.location.href = "../../../src/vistas/login/login.html";
  }
}

function MostrarCrear() {
  var formulario = document.getElementById("formulario");
  if (formulario.style.display === "none") {
    formulario.style.display = "block";
  } else {
    formulario.style.display = "none";
  }
}

function MostrarCrear1() {
  var formulario = document.getElementById("formulario1");
  if (formulario.style.display === "none") {
    formulario.style.display = "block";
  } else {
    formulario.style.display = "none";
  }
}

const avlString = localStorage.getItem("Avl");
const avl = JSON.parse(avlString);

//--------------------------------------------------------------------------
//                      FUNCIÓN PARA MANEJAR FORMULARIOS
//--------------------------------------------------------------------------

function crearCarpeta(e) {
  e.preventDefault();
  let CarpetaNombrada = $("#CarpetaNombrada").val();
  let Ruta = $("#Ruta").val();
  if (CarpetaNombrada !== "") {
    crear(CarpetaNombrada, Ruta);
  } else {
    alert("No se a creado la carpeta, hace falta nombre.");
  }

  $("#CarpetaNombrada").val(""); // establece el valor del input en una cadena vacía
}

function crear(CarpetaNombrada, Ruta) {
  NArio.insertar(CarpetaNombrada, Ruta);
  $("#carpetas").html(NArio.ObtenerHTML(Ruta));
  const ArbolNario = JSON.stringify(NArio);
  actualizarCarpetaRaiz(carnet, ArbolNario);

  const fecha = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString();
  LCircular.agregar(
    `Carpeta '${CarpetaNombrada}' creada en la ruta '${Ruta}'`,
    fecha,
    hora
  );
  bitacoras[carnet] = LCircular;
  // Almacenar en el local storage
  localStorage.setItem("bitacoras", JSON.stringify(JSON.decycle(bitacoras)));
}

function actualizarCarpetaRaiz(carnet, carpetas) {
  let avl = JSON.parse(localStorage.getItem("Avl"));
  let estudiante = buscarEstudiante(avl.raiz, carnet);
  if (estudiante) {
    estudiante.carpeta_raiz = carpetas;
    localStorage.setItem("Avl", JSON.stringify(avl)); // Guardar cambios en localStorage
  }
}

function obtenerCarpetasUsuario(carnet) {
  let avl = JSON.parse(localStorage.getItem("Avl"));
  let estudiante = buscarEstudiante(avl.raiz, carnet);
  if (estudiante) {
    if (estudiante.carpeta_raiz !== "/") {
      let nario = JSON.parse(estudiante.carpeta_raiz);
      NArio.raiz = nario.raiz;

      if (Dispersa[carnet]) {
        //MD.head = Dispersa[carnet].head;
        //console.log(Dispersa[carnet].Ruta)
        //console.log(Dispersa[carnet].head)
      }

      if (bitacoras[carnet]) {
        let nodoActual = bitacoras[carnet].primero;
        if (nodoActual !== null) {
          do {
            // Verificar si el nodo actual tiene un id definido
            if (nodoActual.id !== undefined) {
              LCircular.agregar(
                nodoActual.accion,
                nodoActual.fecha,
                nodoActual.hora
              );
            }
            nodoActual = nodoActual.siguiente;
          } while (
            nodoActual !== bitacoras[carnet].primero &&
            nodoActual.id !== undefined
          );
        }
      }

      RInicio();
    }
  }
}

function buscarCarp() {
  let Ruta = $("#Ruta").val();
  if (NArio.ObtenerHTML(Ruta) !== false) {
    $("#Ruta").val(Ruta);
    $("#carpetas").html(NArio.ObtenerHTML(Ruta));
  } else {
    alert("La ruta especificada no exciste.");
    RInicio();
  }
}

function AccederCarpeta(CarpetaNombrada) {
  let Ruta = $("#Ruta").val();
  let RutaActual =
    Ruta == "/" ? Ruta + CarpetaNombrada : Ruta + "/" + CarpetaNombrada;
  $("#Ruta").val(RutaActual);
  $("#carpetas").html(NArio.ObtenerHTML(RutaActual));
  // Asignar el valor de la instancia de la clase MDispersa con la ruta actualizada

  MD = new MDispersa(RutaActual);

  if (Dispersa[carnet]) {
    if(Dispersa[carnet][RutaActual] !== undefined){
      MD.head = Dispersa[carnet][RutaActual].head;
    }
    
  }

}


function RInicio() {
  $("#Ruta").val("/");
  $("#carpetas").html(NArio.ObtenerHTML("/"));
}

function GraficarA() {
  NArio.Graficar();
}

function GraficarB() {
  LCircular.Graficar();
}

function GraficarM() {
  let url = 'https://quickchart.io/graphviz?graph=';
  let body = `digraph G { ${MD.Graficar()} }`
  $("#graph1").attr("src", url + body);
}

function buscarEstudiante(nodo, carnet) {
  if (nodo === null) {
    return null;
  } else if (carnet < nodo.item.carnet) {
    return buscarEstudiante(nodo.izq, carnet);
  } else if (carnet > nodo.item.carnet) {
    return buscarEstudiante(nodo.der, carnet);
  } else {
    return nodo.item;
  }
}

function EliminarCarpeta() {
  let Ruta = $("#Ruta").val();
  let carpetaEliminada = NArio.eliminarCarpeta(Ruta); // Guardar la variable que contiene el nombre de la carpeta eliminada
  const ArbolNario = JSON.stringify(NArio);
  actualizarCarpetaRaiz(carnet, ArbolNario);

  const fecha = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString();
  LCircular.agregar(
    `Carpeta '${carpetaEliminada.nombre}' eliminada en la ruta '${carpetaEliminada.ruta}'`,
    fecha,
    hora
  ); // Usar la variable para incluir el nombre de la carpeta eliminada en la bitácora
  bitacoras[carnet] = LCircular;
  // Almacenar en el local storage
  localStorage.setItem("bitacoras", JSON.stringify(JSON.decycle(bitacoras)));
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const subirArchivo = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const form = Object.fromEntries(formData);
  let Ruta = $("#Ruta").val();

  // Validar que el archivo es una imagen, un archivo de texto o un PDF
  if (/^image\/|^text\/plain$|^application\/pdf$/.test(form.file.type)) {
    // El archivo es válido
    let parseBase64 = await toBase64(form.file);

    // Obtener la lista de archivos en la carpeta actual
    const archivosEnCarpeta = NArio.ObtenerCarpeta(Ruta).archivos;

    // Verificar si existe un archivo con el mismo nombre y agregar sufijo si es necesario
    let nombreArchivo = form.fileName;
    let i = 1;

    while (
      archivosEnCarpeta.some((archivo) => archivo.name === nombreArchivo)
    ) {
      nombreArchivo = `${form.fileName} copia ${i}`;
      i++;
    }

    // Agregar el archivo al objeto NArio con el nombre actualizado
    NArio.ObtenerCarpeta(Ruta).archivos.push({
      name: nombreArchivo,
      content: parseBase64,
      type: form.file.type,
    });

    $("#carpetas").html(NArio.ObtenerHTML(Ruta));
    const ArbolNario = JSON.stringify(NArio);
    actualizarCarpetaRaiz(carnet, ArbolNario);

    // Inserta el archivo en la matriz dispersa
    let columna = prompt("Ingrese el carnet de quien tendrá permiso para acceder al archivo:");
    let permiso;
    while (true) {
      opcion = prompt("Ingrese el permiso que tendrá la persona (1 para lectura, 2 para lectura y escritura):");
      if (opcion === "1") {
        permiso = "lectura";
        break;
      } else if (opcion === "2") {
        permiso = "lectura y escritura";
        break;
      } else {
        alert("Opción inválida");
      }
    }

    MD.insertar(nombreArchivo, columna, permiso);

    // Verificar si la propiedad "carnet" existe en Dispersa
    if (!Dispersa[carnet]) {
      // Si no existe, crear una nueva propiedad con un objeto vacío como valor
      Dispersa[carnet] = {};
    }
    Dispersa[carnet][Ruta] = {
      head: MD.head
    };
    // Almacenar en el local storage
    localStorage.setItem("Dispersa", JSON.stringify(JSON.decycle(Dispersa)));

    //Se agrega la información a la bitacora
    const fecha = new Date().toLocaleDateString();
    const hora = new Date().toLocaleTimeString();
    LCircular.agregar(
      `Archivo '${nombreArchivo}' creada en la ruta '${Ruta}'`,
      fecha,
      hora
    );
    bitacoras[carnet] = LCircular;
    // Almacenar en el local storage
    localStorage.setItem("bitacoras", JSON.stringify(JSON.decycle(bitacoras)));

    e.target.reset(); // Resetear el formulario
  } else {
    // El archivo no es de un tipo válido
    alert("El archivo debe ser una imagen, un archivo de texto o un PDF.");
    e.target.reset(); // Resetear el formulario
  }
};


function selAccion(event, content, name) {
  event.preventDefault(); // Evita que se realice la acción por defecto (descargar el archivo)
  const options = ["1. Modificar permisos", "2. Agregar permisos", "3. Cancelar"]; // Define las opciones del menú desplegable
  let selectedOption = null;
  while (selectedOption === null) {
    const userInput = window.prompt(`¿Qué acción deseas realizar con el archivo "${name}"? Seleccione una opción:\n${options.join("\n")}`); // Muestra el menú desplegable y guarda la opción seleccionada por el usuario
    if (userInput === null) {
      // El usuario canceló la operación
      return;
    }
    const optionIndex = parseInt(userInput);
    if (isNaN(optionIndex) || optionIndex < 1 || optionIndex > 4) {
      // La opción seleccionada no es válida
      window.alert(`"${userInput}" no es una opción válida. Por favor seleccione una opción del 1 al 3.`);
    } else {
      // La opción seleccionada es válida
      selectedOption = optionIndex;
    }
  }
  if (selectedOption === 1) {
    modificarPermiso(name);
  } else if (selectedOption === 2) {
    nuevoNodoMD(name);
  } else if (selectedOption === 3) {
    // El usuario canceló la operación
  } 
}


function nuevoNodoMD(nombreArchivo){
  // Inserta el archivo en la matriz dispersa
  let columna = prompt("Ingrese el carnet de quien tendrá permiso para acceder al archivo:");
  let permiso;
  while (true) {
    opcion = prompt("Ingrese el permiso que tendrá la persona (1 para lectura, 2 para lectura y escritura):");
    if (opcion === "1") {
      permiso = "lectura";
      break;
    } else if (opcion === "2") {
      permiso = "lectura y escritura";
      break;
    } else {
      alert("Opción inválida");
    }
  }

  MD.insertar(nombreArchivo, columna, permiso);

  // Verificar si la propiedad "carnet" existe en Dispersa
  if (!Dispersa[carnet]) {
    // Si no existe, crear una nueva propiedad con un objeto vacío como valor
    Dispersa[carnet] = {};
  }
  Dispersa[carnet][Ruta] = {
    head: MD.head
  };
  // Almacenar en el local storage
  localStorage.setItem("Dispersa", JSON.stringify(JSON.decycle(Dispersa)));

}


function modificarPermiso(nombreArchivo){
// Modifica el archivo en la matriz dispersa
let columna = prompt("Ingrese el carnet de quien desea modificar el permiso para acceder al archivo:");
let permiso;
while (true) {
  opcion = prompt("Ingrese el permiso que tendrá la persona (1 para lectura, 2 para lectura y escritura):");
  if (opcion === "1") {
    permiso = "lectura";
    break;
  } else if (opcion === "2") {
    permiso = "lectura y escritura";
    break;
  } else {
    alert("Opción inválida");
  }
}

MD.ModificarValor(nombreArchivo, columna, permiso);

// Verificar si la propiedad "carnet" existe en Dispersa
if (!Dispersa[carnet]) {
  // Si no existe, crear una nueva propiedad con un objeto vacío como valor
  Dispersa[carnet] = {};
}
Dispersa[carnet][Ruta] = {
  head: MD.head
};
// Almacenar en el local storage
localStorage.setItem("Dispersa", JSON.stringify(JSON.decycle(Dispersa)));
}