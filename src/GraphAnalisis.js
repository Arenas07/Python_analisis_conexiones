import { Node, Flow } from "pocketflow";

class GraphNode extends Node {

    prep(shared) {
        for (const entrada of shared.entradas) {
            if (typeof entrada !== "string") {
                throw new Error("Cada entrada debe ser un string");
            }
        }
        
        if (typeof shared.casos !== "number" || shared.casos <= 0) {
            throw new Error("shared.casos debe ser un número mayor a 0");
        }

        if (shared.entradas.length !== shared.casos) {
            throw new Error("El número de entradas no coincide con 'casos'");
        }
        

        return {
            casos: shared.casos,
            entradas: shared.entradas
        };
    }

    exec({ casos, entradas }) {
        const resultados = [];

        for (let i = 0; i < casos; i++) {
            const pares = entradas[i].split(";");
            const diccionario = {};

            // 1. Inicializar nodos
            for (const par of pares) {
                const [nodo] = par.split(":");
                diccionario[nodo] = 0;
            }

            // 2. Contar conexiones
            for (const par of pares) {
                const [izquierda, derecha = ""] = par.split(":");

                // conexiones salientes
                diccionario[izquierda] += derecha.length;

                // conexiones entrantes
                for (const letra of derecha) {
                    if (diccionario.hasOwnProperty(letra)) {
                        diccionario[letra] += 1;
                    }
                }
            }

            // 3. Formatear salida ordenada
            const salida = Object.keys(diccionario)
                .sort()
                .map(nodo => `${nodo}: ${diccionario[nodo]}`)
                .join(" ");

            resultados.push(salida);
        }

        return resultados;
    }

    post(shared, prepRes, execRes) {
        shared.resultados = execRes;
        return null;
    }
}

export function buildGraphFlow() {
    return new Flow(new GraphNode());
}
