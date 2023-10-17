function buscarElSuperGuerrero(listaDePersonas) {
    var masPoderoso = listaDePersonas[0];

    for (let index = 0; index < listaDePersonas.length; index++) {
        const persona = listaDePersonas[index];
        if (persona.poder > masPoderoso.poder) {
            masPoderoso = persona;
        }
}

return masPoderoso;
}

const Goku = {
nombre: "Goku",
poder: 8000
}

const Vegetta = {
nombre: "Vegetta",
poder: 18000
}

const Piccoro = {
nombre: "Piccoro",
poder: 1220
}

const guerrerosSaiyan = [Goku, Vegetta, Piccoro];

var guerrero = buscarElSuperGuerrero(guerrerosSaiyan);

console.log("El guerrero más poderoso es " + guerrero.nombre);