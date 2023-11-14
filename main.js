guerrerosDefault();

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

function guerrerosDefault() {
    var guerreros = getLocalGuerreros();

    if (!existeElGuerrero("Goku")) {
        guerreros.push({
            nombre: "Goku",
            poder: 8000
        })
        console.log("Agregado Goku.");
    }

    if (!existeElGuerrero("Vegeta")) {
        guerreros.push({
            nombre: "Vegeta",
            poder: 9000
        })
        console.log("Agregado Vegeta.");
    }

    if (!existeElGuerrero("Piccoro")) {
        guerreros.push({
            nombre: "Piccoro",
            poder: 6000
        })
        console.log("Agregado Piccoro.");
    }

    localStorage.setItem("guerreros", JSON.stringify(guerreros));
}

function existeElGuerrero(nombre) {
    var guerreros = getLocalGuerreros();

    var guerreroEncontrado = guerreros.find(guerrero => guerrero.nombre == nombre);
    return guerreroEncontrado != null;
}

function buscarGuerrero() {
    var guerreros = getLocalGuerreros();
    console.log("Búsqueda de guerreros: " + guerreros)
    const peleador = document.getElementById("peleador");
    var peleadorElegido = {
        nombre: "Piccoro",
        poder: ""
    };
    var existe = false;
    for (let index = 0; index < guerreros.length; index++) {
        console.log(guerreros[index].nombre);
        if (guerreros[index].nombre == peleador.value) {
            existe = true;
            peleadorElegido = guerreros[index];
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
    var guerreros = getLocalGuerreros();
    var nombrePeleador = document.getElementById("nuevoNombre").value;
    var poderPeleador = document.getElementById("nuevoPoder").value;

    var nuevoGuerrero = {
        nombre: nombrePeleador,
        poder: parseFloat(poderPeleador)
    }
    if (!existeElGuerrero(nombrePeleador)) {
        guerreros.push(nuevoGuerrero);
    } else {
        alert("El guerrero ya existe.");
    }
    localStorage.setItem("guerreros", JSON.stringify(guerreros));
}


function getLocalGuerreros() {
    var guerreros = JSON.parse(localStorage.getItem("guerreros"));

    if (guerreros == null) {
        return [];
    } else {
        return guerreros;
    }
}