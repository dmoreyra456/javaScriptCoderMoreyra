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

const listaDeGuerreros = [Goku, Vegetta, Piccoro];

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

function buscarGuerrero() {
    const peleador = document.getElementById("peleador");
    var peleadorElegido = {
        nombre: "Piccoro",
        poder: ""
    };
    var existe = false;
    for (let index = 0; index < listaDeGuerreros.length; index++) {
        if (listaDeGuerreros[index].nombre == peleador.value) {
            existe = true;
            peleadorElegido = listaDeGuerreros[index];
            break;
        }
    }

    var card = document.getElementById("tarjetaGuerrero");
    if (existe) {
        var newHtml = `
        <div class = "tarjeta">
            <h2>Guerrero</h2>
            <div>Nombre: ${peleadorElegido.nombre} </div>
            <div>Poder: ${peleadorElegido.poder} </div>
        </div>
        `;
        card.innerHTML = newHtml;
        console.log(card);

    } else {
        card.innerHTML = "No se encontró el guerrero querido Sayayin.";
    }
}

function agregarPeleador() {
    var nombrePeleador = document.getElementById("nuevoNombre").value;
    var poderPeleador = document.getElementById("nuevoPoder").value;

    var nuevoGuerrero = {
        nombre: nombrePeleador,
        poder: parseFloat(poderPeleador)
    }

    listaDeGuerreros.push(nuevoGuerrero);
}