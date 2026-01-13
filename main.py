casos = int(input())

resultados = []

for i in range(casos):
    entrada = input()
    pares = entrada.split(";")

    diccionario = {}

    for par in pares:
        clave = par.split(":")[0]
        diccionario[clave] = 1

    for par in pares:
        izquierda, derecha = par.split(":")
        for letra in derecha:
            if letra in diccionario:
                diccionario[letra] += 1

    linea = []
    for clave in sorted(diccionario):
        linea.append(f"{clave}: {diccionario[clave]}")

    resultados.append(" ".join(linea))

print("\nResultados:")
for resultado in resultados:
    print(resultado)
