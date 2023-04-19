let Avl = new ArbolAvl();

// Obtener el objeto Avl almacenado en localStorage
const avlString = localStorage.getItem("Avl");
const avl = JSON.parse(avlString);

function buscarEstudiante(avl, carnet, password) {
  if (avl === null) {
    return null;
  } else if (carnet < avl.item.carnet) {
    return buscarEstudiante(avl.izq, carnet, password);
  } else if (carnet > avl.item.carnet) {
    return buscarEstudiante(avl.der, carnet, password);
  } else if (password !== avl.item.password) {
    return null;
  } else {
    return avl.item;
  }
}

function onLogin(event) {
  event.preventDefault(); // Previene la recarga de la página
  var alertMsg = document.getElementById("alert-msg");
  var loginForm = document.getElementById("login-form");
  var username = loginForm.elements["login"].value;
  var password = loginForm.elements["password"].value;

  if (username === "Admin" && password === "Admin") {
    // Almacena la clave "AdminLoggedIn" con valor "true"
    localStorage.setItem("tokenA", true);
    window.location.href = "../../../src/vistas/admin/admin.html";
  } else {

    if (avl !== null) {
      // Buscar al estudiante con el carnet y la contraseña especificados
      const estudianteEncontrado = buscarEstudiante(avl.raiz, username, password);
      // Si no se encontró al estudiante, se imprime un mensaje en consola
      if (estudianteEncontrado === null) {
        alertMsg.innerHTML = "Usuario o contraseña incorrectos";
      }
      // Si se encontró al estudiante, se imprime un mensaje en consola con el nombre del estudiante encontrado
      else {

        localStorage.setItem("tokenU", estudianteEncontrado.carnet);
        window.location.href = "../../../src/vistas/usuario/usuario.html?carnet=" + estudianteEncontrado.carnet;

      }
    }
  }
}




