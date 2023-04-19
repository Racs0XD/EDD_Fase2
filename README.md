# Manual Técnico

## Sistema de Gestión de Usuarios EDD GoDrive
Este manual técnico describe la estructura y el funcionamiento del sistema de gestión de usuarios. Este sistema fue desarrollado en js y utiliza el patrón de diseño de arbol AVL, arbol N-Ario, Matriz Dispersa y Lista Enlazada Circular.

## Estructura de archivos

El sistema se divide en varios archivos y carpetas, que se organizan de la siguiente manera:

1. La carpeta `lib` contendrá una una librería llamada cycle utilizada para convertir en json listas enlazadas circulares y matrices dispersas conservando los nodos:

   <p align="center">
     <img src="/EDD_Proyecto1_Fase2/Capturas/2.png" alt="Captura lib">
   </p>

2. La carpeta `src` contendrá sub-carpetas con el funcionamiento de la pagina web:
   * La sub-carpeta `Arboles` contendrá las estructuras utilizadas almacenadas en sub-carpetas nombradas con la estructura correspondiente:

     <p align="center">
       <img src="/EDD_Proyecto1_Fase2/Capturas/4.png" alt="Captura arboles">
     </p>

   * La sub-carpeta `assets` almacenará las imagenes que utiliza el sitio web para su correcto funcionamiento grafico:

     <p align="center">
       <img src="/EDD_Proyecto1_Fase2/Capturas/5.png" alt="Captura assets">
     </p>

   * La sub-carpeta `vistas` almacenará sub-carpetas que contiene las distintas paginas web con sus respectivos scripts en archivos js y estilo css:

     <p align="center">
       <img src="/EDD_Proyecto1_Fase2/Capturas/6.png" alt="Captura vistas">
     </p>

## Dependencias
El sistema utiliza la biblioteca cycle, para su uso puede descargarla dentro de este mismo repositorio en el directorio lib.

## Iniciar el Sistema
Para iniciar el sistema acceda al enlace proporcionado a continuacón: https://racs0xd.github.io/EDD_1S2023_PY_201603028/EDD_Proyecto1_Fase2/src/vistas/login/login.html

## Estructuras del funcionamiento interno:
1. class NodoAvl: Clase que define la estructura de un nodo en el árbol AVL, que contiene un item, un nodo hijo izquierdo (izq), un nodo hijo derecho (der) y una altura.
  
2. class ArbolAvl: Clase que define la estructura del árbol AVL, que contiene un nodo raíz (raiz) y varias funciones para trabajar con el árbol:
    * insertar(item): Método para agregar un nuevo nodo al árbol AVL.
    * insertarRecursiva(nuevoNodo, subarbol): Método recursivo que se encarga de insertar un nuevo nodo en el árbol AVL.
    * rotacionSimpleIzquierda(nodo): Método para realizar una rotación simple a la izquierda en el árbol AVL.
    * rotacionSimpleDerecha(nodo): Método para realizar una rotación simple a la derecha en el árbol AVL.
    * rotacionDobleIzquierda(nodo): Método para realizar una rotación doble a la izquierda en el árbol AVL.
    * rotacionDobleDerecha(nodo): Método para realizar una rotación doble a la derecha en el árbol AVL.
    * obtenerAltura(nodo): Método para obtener la altura de un nodo en el árbol AVL.
    * Ordenado(): Método para realizar un recorrido en orden del árbol AVL.
    * OrdenadoRecursivo(current): Método recursivo para realizar un recorrido en orden del árbol AVL.
    * PreOrdenado(): Método para realizar un recorrido en preorden del árbol AVL.
    * PreOrdenadoRecursivo(current): Método recursivo para realizar un recorrido en preorden del árbol AVL.

3. La clase NodoCircular representa un nodo en una lista enlazada circular y tiene como propiedades accion, fecha, hora y siguiente.

4. La clase ListaCircular representa una lista enlazada circular y tiene como propiedades primero y contador. Tiene como métodos agregar, que agrega un nuevo nodo a la lista, y Graficar, que crea un gráfico en DOT de la lista y lo muestra en un elemento HTML:
    * La función constructor de la clase NodoCircular inicializa las propiedades del nodo.
    * La función constructor de la clase ListaCircular inicializa las propiedades de la lista y también cuenta el número de nodos en la lista.
    * La función agregar de la clase ListaCircular agrega un nuevo nodo a la lista.
    * La función Graficar de la clase ListaCircular crea un gráfico en DOT de la lista y lo muestra en un elemento HTML.

5. class NodoMD: Clase que define un nodo de la matriz dispersa. Tiene propiedades como x, y, value que representan las coordenadas y el valor del nodo. También tiene apuntadores up, down, right y left que apuntan a los nodos adyacentes en la matriz dispersa.

6. class MDispersa: Clase que define la matriz dispersa. Tiene una propiedad head que es la cabeza o nodo raíz de la matriz. Las funciones principales de esta clase son:
    * constructor: Función que crea una nueva instancia de la matriz dispersa con un valor de inicio dado.
    * insertar: Función que inserta un nuevo nodo en la matriz dispersa con las coordenadas y el valor dados.
    * EncabezadosX: Función que crea las cabeceras en el eje X o filas de la matriz dispersa.
    * EncabezadosY: Función que crea las cabeceras en el eje Y o columnas de la matriz dispersa.
    * AgregarX: Función que agrega un nuevo nodo en una fila específica de la matriz dispersa.
    * AgregarY: Función que agrega un nuevo nodo en una columna específica de la matriz dispersa.

7. La clase NodoNArio: representa un nodo de un árbol n-ario y contiene información sobre la carpeta nombrada, los archivos que contiene, los nodos hijo, un identificador único y una matriz dispersa.

8. La clase ArbolNArio: representa el árbol n-ario y contiene una raíz, un tamaño y una serie de métodos que permiten insertar una carpeta en el árbol, buscar un nodo por su identificador o por su ruta, graficar el árbol utilizando Graphviz y obtener una representación HTML de una carpeta.

    * El método insertar: inserta una nueva carpeta en el árbol, creando una instancia de NodoNArio y asignando un identificador único.
    * El método BuscarId: busca un nodo en el árbol por su identificador.
    * El método ObtenerCarpeta: busca un nodo en el árbol por su ruta.
    * El método Graficar: utiliza Graphviz para generar una representación gráfica del árbol.
    * El método ObtenerHTML: devuelve una representación HTML de una carpeta del árbol, utilizando un código HTML predefinido y los datos de la carpeta proporcionados por el nodo correspondiente.

## Vistas
Funcionalidad js de las distintas vistas:
1. Admin:
    * cS(): función que cierra la sesión de usuario, eliminando el token almacenado en localStorage y redirigiendo a la página de inicio de sesión.
    * CargaEstudiantes(e): función que maneja el formulario para cargar estudiantes y los agrega a un árbol AVL. Además, guarda el árbol AVL actualizado en * localStorage.
    * MostrarRegistrados(): función que muestra en la tabla de la página los estudiantes registrados previamente en el árbol AVL almacenado en localStorage.
    * MostrarEstudiantes(e): función que muestra los estudiantes del árbol AVL en la tabla de la página, dependiendo del recorrido seleccionado en el formulario.
    * MostrarAvlGrafo(recorrido): función que grafica el árbol AVL en la página, dependiendo del recorrido seleccionado en el formulario.
    * MostrarCarga(): función que muestra u oculta el formulario para cargar estudiantes.

2. Login:
    * buscarEstudiante(): Función que recibe un árbol AVL, un carnet y una contraseña, y busca un estudiante con esas credenciales en el árbol. Retorna el objeto del estudiante encontrado o null si no se encuentra.
    * onLogin(): Función que se ejecuta al enviar el formulario de inicio de sesión. Obtiene los valores de los campos "login" y "password" y los utiliza para buscar al estudiante correspondiente en el árbol AVL almacenado en localStorage. Si se encuentra al estudiante, se almacena un token en localStorage y se redirige a la página correspondiente.

3. Usuario:
    * cS(): elimina el token de usuario del almacenamiento local y redirecciona al usuario a la página de inicio de sesión.
    * MostrarCrear(): muestra u oculta un formulario para crear carpetas.
    * MostrarCrear1(): muestra u oculta otro formulario para crear carpetas.
    * crearCarpeta(e): maneja la creación de carpetas. Toma los valores ingresados en el formulario y llama a la función crear() para insertar la carpeta en un árbol n-ario y actualizar la carpeta raíz del usuario en el almacenamiento local.
    * crear(CarpetaNombrada, Ruta): inserta la carpeta en un árbol n-ario, actualiza la lista de carpetas en la interfaz de usuario, registra la acción en una lista circular que se utiliza como una bitácora, y actualiza la carpeta raíz del usuario en el almacenamiento local.
    * actualizarCarpetaRaiz(carnet, carpetas): actualiza la carpeta raíz del usuario en el árbol AVL que se utiliza para almacenar la información de los estudiantes en el sistema.
    * obtenerCarpetasUsuario(carnet): obtiene la lista de carpetas del usuario del árbol AVL y la inserta en un árbol n-ario. También inicializa una lista circular con las acciones anteriores registradas en la bitácora del usuario y muestra la carpeta raíz del usuario en la interfaz de usuario.
    * buscarCarp(): busca una carpeta en el árbol n-ario y la muestra en la interfaz de usuario.

## Conclusiones 
En resumen, el sistema de gestión de usuarios EDD GoDrive es una aplicación desarrollada en JavaScript que utiliza el patrón de diseño de arbol AVL, arbol N-Ario, Matriz Dispersa y Lista Enlazada Circular para el manejo de los datos de los usuarios, el sistema cuenta con estructuras de datos que permiten una mayor flexibilidad en el manejo de la información. Asimismo, se incluyen reportes gráficos generados con Graphviz, que permiten visualizar de manera más clara y concisa la información contenida en el sistema. En caso de requerir mayor información acerca de las estructuras de datos y los reportes generados, se recomienda consultar los archivos correspondientes en las carpetas almacenadas en src. Agradecemos el interés en nuestro sistema de gestión de usuarios y esperamos que esta documentación haya sido de utilidad para su comprensión y uso.
