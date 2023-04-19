// Obtener el objeto Avl almacenado en localStorage
const avlString = localStorage.getItem("Avl");
const avl = JSON.parse(avlString);

if (!localStorage.getItem("tokenA")) {
    window.location.href = "../../../src/vistas/login/login.html";
}

function cS() {
    if (localStorage.getItem('tokenA')) {
        localStorage.removeItem('tokenA');
        window.location.href = "../../../src/vistas/login/login.html";
    } else if (localStorage.getItem('tokenU')) {
        localStorage.removeItem('tokenU');
        window.location.href = "../../../src/vistas/login/login.html";
    }
}


//--------------------------------------------------------------------------
//                      DECLARACIÓN DE LAS ESTRUCTURAS A UTILIZAR
//--------------------------------------------------------------------------
let Avl = new ArbolAvl();
//--------------------------------------------------------------------------
//                      FUNCIÓN PARA MANEJAR FORMULARIOS
//--------------------------------------------------------------------------
function CargaEstudiantes(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let ArrayEstudiantes = [];
    try {
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => {

            ArrayEstudiantes = JSON.parse(fr.result).alumnos;            
            //AGREGAR A LA TABLA LOS ALUMNOS CARGADOS 
            $('#studentsTable tbody').html(
                ArrayEstudiantes.map((item, index) => {
                    return (`
                        <tr>
                            <th>${item.carnet}</th>
                            <td>${item.nombre}</td>
                            <td>${item.password}</td>
                        </tr>
                    `);
                }).join('')
            )
            for (let i = 0; i < ArrayEstudiantes.length; i++) {                
                Avl.insertar(ArrayEstudiantes[i]);
            }
            // GUARDAR EN LOCAL STORAGE
            localStorage.setItem("Avl", JSON.stringify(Avl))
            alert('Alumnos cargados con éxito!')
        }
    } catch (error) {
        console.log(error);
        alert("Error en la inserción");
    }

}

function MostrarRegistrados() {
    let temp = localStorage.getItem("Avl")    
    if(temp !== null){
        Avl.raiz = JSON.parse(temp).raiz;
        $('#studentsTable tbody').html(
            Avl.Ordenado()
        )
    }
    
}

//--------------------------------------------------------------------------
//                   FUNCIÓN PARA AGREGAR RECORRIDOS
//--------------------------------------------------------------------------
function MostrarEstudiantes(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if (Avl.root !== null) {
        switch (form.traversal) {
            case 'Ordenado':
                $('#studentsTable tbody').html(
                    Avl.Ordenado()
                )
                break;
            case 'PreOrdenado':
                $('#studentsTable tbody').html(
                    Avl.PreOrdenado()
                )
                break;
            case 'PostOrdenado':
                $('#studentsTable tbody').html(
                    Avl.PostOrdenado()
                )
                break;
            default:
                $('#studentsTable tbody').html("")
                break;
        }
    }
}

//--------------------------------------------------------------------------
//                   FUNCIÓN PARA MOSTRAR LA GRÁFICA
//--------------------------------------------------------------------------
function MostrarAvlGrafo(recorrido) {
    let url = 'https://quickchart.io/graphviz?graph=';
    let dot = 'digraph G {\n';
    dot += "node[shape= folder, fillcolor=darkgoldenrod1, style= filled];\n"
    dot += "label=\" Arbol de Estudiantes \" ;\n"
    dot += "fontsize = 20 \n"
    let nodos = [];
    let conexiones = [];
  
    switch (recorrido) {
      case 'Ordenado':
        Avl.graficarArbolRecursivo(Avl.raiz, nodos, conexiones);
        
        break;
      case 'PreOrdenado':
        Avl.graficarArbolRecursivoPre(Avl.raiz, nodos, conexiones);
        break;
      case 'PostOrdenado':
        Avl.graficarArbolRecursivoPost(Avl.raiz, nodos, conexiones);
        break;
      default:
        Avl.graficarArbolRecursivo(Avl.raiz, nodos, conexiones);
    }
  
    dot += nodos.join('');
    dot += conexiones.join('');
    dot += '}';
  
    let timestamp = new Date().getTime(); // Genera un timestamp actual
    $("#graph").attr("src", url + dot + '&t=' + timestamp); // Agrega el timestamp a la URL
}
  




function MostrarCarga() {
    var formulario = document.getElementById("formulario");
    if (formulario.style.display === "none") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}



$(document).ready(MostrarRegistrados);

