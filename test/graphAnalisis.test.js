import { buildGraphFlow } from "../src/GraphAnalisis.js";

describe("GraphNode (PocketFlow)", () => {
    test("Caso básico A:BC;B:A;C:", async () => {
        const flow = buildGraphFlow();

        const shared = {
            casos: 1,
            entradas: ["A:BC;B:A;C:"]
        }

        await flow.run(shared)

        expect(shared.resultados).toEqual([
            "A: 3 B: 2 C: 1"
        ])
    });

    test("Caso con multiple lineas", async () => {
        const flow = buildGraphFlow();

        const shared = {
            casos: 2,
            entradas: [
                "A:BC;B:A;C:",
                "A:BG;B:G;C:DG;D:E;E:F;F:A;G:DEF"
            ]
        }

        await flow.run(shared)

        expect(shared.resultados).toEqual([
            "A: 3 B: 2 C: 1",
            "A: 3 B: 2 C: 2 D: 3 E: 3 F: 3 G: 6"
        ])
    });

    test("El número de entradas no coincide con 'casos'", async () => {
        const flow = buildGraphFlow();

        const shared = {
            casos: 2,
            entradas: ["A:BC;B:A;C:"]
        }

        await expect(flow.run(shared)).rejects.toThrow(
            "El número de entradas no coincide con 'casos'"
        );
        
    });

    test("Cada entrada debe ser un string", async () => {
        const flow = buildGraphFlow();

        const shared = {
            casos: 1,
            entradas: [123]
        }

        await expect(flow.run(shared)).rejects.toThrow(
            "Cada entrada debe ser un string"
        );
    });

    test("La entrada no es un array", async () => {
        const flow = buildGraphFlow();

        const shared = {
            casos: 1,
            entradas: 123
        }

        await expect(flow.run(shared)).rejects.toThrow(
            "La entrada no es un array"
        );
    });
    
})


