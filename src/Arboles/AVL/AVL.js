class NodoAvl {
    constructor(item) {
        this.item = item;
        this.izq = null;
        this.der = null;
        this.altura = 0;
    }
}

let nodo = "";
let conexiones = "";

class ArbolAvl {
    constructor() {
        this.raiz = null;
    }

    // Método para agregar un nuevo nodo al árbol AVL
    insertar(item) {
        const nuevoNodo = new NodoAvl(item);

        if (this.raiz === null) {
            this.raiz = nuevoNodo;
        } else {
            this.raiz = this.insertarRecursiva(nuevoNodo, this.raiz);
        }
    }

    // Método recursivo para insertarRecursiva un nuevo nodo en el árbol AVL
    insertarRecursiva(nuevoNodo, subarbol) {
        if (subarbol === null) {
            subarbol = nuevoNodo;
        } else if (nuevoNodo.item.carnet < subarbol.item.carnet) {
            subarbol.izq = this.insertarRecursiva(nuevoNodo, subarbol.izq);

            if (this.obtenerAltura(subarbol.izq) - this.obtenerAltura(subarbol.der) === 2) {
                if (nuevoNodo.item.carnet < subarbol.izq.item.carnet) {
                    subarbol = this.rotacionSimpleIzquierda(subarbol);
                } else {
                    subarbol = this.rotacionDobleIzquierda(subarbol);
                }
            }
        } else if (nuevoNodo.item.carnet > subarbol.item.carnet) {
            subarbol.der = this.insertarRecursiva(nuevoNodo, subarbol.der);

            if (this.obtenerAltura(subarbol.der) - this.obtenerAltura(subarbol.izq) === 2) {
                if (nuevoNodo.item.carnet > subarbol.der.item.carnet) {
                    subarbol = this.rotacionSimpleDerecha(subarbol);
                } else {
                    subarbol = this.rotacionDobleDerecha(subarbol);
                }
            }
        } else {
            alert("Elemento ya existe en el árbol");
        }

        subarbol.altura = Math.max(this.obtenerAltura(subarbol.izq), this.obtenerAltura(subarbol.der)) + 1;
        return subarbol;
    }


    // Métodos para realizar rotaciones simples y dobles en el árbol AVL
    rotacionSimpleIzquierda(nodo) {
        const nuevoSubarbol = nodo.izq;
        nodo.izq = nuevoSubarbol.der;
        nuevoSubarbol.der = nodo;

        nodo.altura = Math.max(this.obtenerAltura(nodo.izq), this.obtenerAltura(nodo.der)) + 1;
        nuevoSubarbol.altura = Math.max(this.obtenerAltura(nuevoSubarbol.izq), nodo.altura) + 1;

        return nuevoSubarbol;
    }

    rotacionSimpleDerecha(nodo) {
        const nuevoSubarbol = nodo.der;
        nodo.der = nuevoSubarbol.izq;
        nuevoSubarbol.izq = nodo;

        nodo.altura = Math.max(this.obtenerAltura(nodo.izq), this.obtenerAltura(nodo.der)) + 1;
        nuevoSubarbol.altura = Math.max(this.obtenerAltura(nuevoSubarbol.der), nodo.altura) + 1;

        return nuevoSubarbol;
    }

    rotacionDobleIzquierda(nodo) {
        nodo.izq = this.rotacionSimpleDerecha(nodo.izq);
        return this.rotacionSimpleIzquierda(nodo);
    }

    rotacionDobleDerecha(nodo) {
        nodo.der = this.rotacionSimpleIzquierda(nodo.der);
        return this.rotacionSimpleDerecha(nodo);
    }

    // Método para obtener la altura de un nodo
    obtenerAltura(nodo) {
        if (nodo === null) {
            return -1;
        } else {
            return nodo.altura;
        }
    }

    //--------------------------------------------------------------------------
    //                  RECORRIDO IN ORDER
    //--------------------------------------------------------------------------
    Ordenado() {
        let html = this.OrdenadoRecursivo(this.raiz);
        return html;
    }
    OrdenadoRecursivo(current) {
        let fila = "";
        if (current.izq != null) {
            fila += this.OrdenadoRecursivo(current.izq);
        }
        fila += `
            <tr>
                <th>${current.item.carnet}</th>
                <td>${current.item.nombre}</td>
                <td>${current.item.password}</td>
            </tr>
        `;
        if (current.der != null) {
            fila += this.OrdenadoRecursivo(current.der);
        }
        return fila;
    }

    //--------------------------------------------------------------------------
    //                  RECORRIDO PRE ORDER
    //--------------------------------------------------------------------------
    PreOrdenado() {
        let html = this.PreOrdenadoRecursivo(this.raiz);
        return html;
    }

    PreOrdenadoRecursivo(current) {
        let fila = "";
        fila += `
            <tr>
                <th>${current.item.carnet}</th>
                <td>${current.item.nombre}</td>
                <td>${current.item.password}</td>
            </tr>
        `;
        if (current.izq != null) {
            fila += this.PreOrdenadoRecursivo(current.izq);
        }
        if (current.der != null) {
            fila += this.PreOrdenadoRecursivo(current.der);
        }
        return fila;
    }


    //--------------------------------------------------------------------------
    //                  RECORRIDO POST ORDER
    //--------------------------------------------------------------------------
    PostOrdenado() {
        let html = this.PostOrdenadoRecursivo(this.raiz);
        return html;
    }

    PostOrdenadoRecursivo(current) {
        let fila = "";
        if (current.izq != null) {
            fila += this.PostOrdenadoRecursivo(current.izq);
        }
        if (current.der != null) {
            fila += this.PostOrdenadoRecursivo(current.der);
        }
        fila += `
        <tr>
            <th>${current.item.carnet}</th>
            <td>${current.item.nombre}</td>
            <td>${current.item.password}</td>
        </tr>
        `;
        return fila;
    }


    //--------------------------------------------------------------------------
    //                  REPORTE DEL ARBOL
    //--------------------------------------------------------------------------

    graficarArbolRecursivo(current, nodos, conexiones) {
        if (current === null) {
            return;
        }

        if (current.izq !== null) {
            this.graficarArbolRecursivo(current.izq, nodos, conexiones);
            conexiones.push(`S_${current.item.carnet} -> S_${current.izq.item.carnet};\n`);
        }

        nodos.push(`S_${current.item.carnet}[label="${current.item.carnet}\\n ${current.item.nombre}\\n Altura: ${current.altura}"];\n`);

        if (current.der !== null) {
            conexiones.push(`S_${current.item.carnet} -> S_${current.der.item.carnet};\n`);
            this.graficarArbolRecursivo(current.der, nodos, conexiones);
        }
    }

    graficarArbolRecursivoPre(current, nodos, conexiones) {
        if (current === null) {
            return;
        }

        nodos.push(`S_${current.item.carnet}[label="${current.item.carnet}\\n ${current.item.nombre}\\n Altura: ${current.altura}"];\n`);

        if (current.izq !== null) {
            conexiones.push(`S_${current.item.carnet} -> S_${current.izq.item.carnet};\n`);
            this.graficarArbolRecursivoPre(current.izq, nodos, conexiones);
        }

        if (current.der !== null) {
            conexiones.push(`S_${current.item.carnet} -> S_${current.der.item.carnet};\n`);
            this.graficarArbolRecursivoPre(current.der, nodos, conexiones);
        }
    }

    graficarArbolRecursivoPost(current, nodos, conexiones) {
        if (current === null) {
            return;
        }

        if (current.izq !== null) {
            this.graficarArbolRecursivoPost(current.izq, nodos, conexiones);
            conexiones.push(`S_${current.item.carnet} -> S_${current.izq.item.carnet};\n`);
        }

        if (current.der !== null) {
            this.graficarArbolRecursivoPost(current.der, nodos, conexiones);
            conexiones.push(`S_${current.item.carnet} -> S_${current.der.item.carnet};\n`);
        }

        nodos.push(`S_${current.item.carnet}[label="${current.item.carnet}\\n ${current.item.nombre}\\n Altura: ${current.altura}"];\n`);
    }



}