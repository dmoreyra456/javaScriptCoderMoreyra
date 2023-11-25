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
    }

    if (!existeElGuerrero("Vegeta")) {
        guerreros.push({
            nombre: "Vegeta",
            poder: 9000
        })
    }

    if (!existeElGuerrero("Piccoro")) {
        guerreros.push({
            nombre: "Piccoro",
            poder: 6000
        })
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
    
    const peleador = document.getElementById("peleador");
    var peleadorElegido = {
        nombre: "Piccoro",
        poder: ""
    };
    var existe = false;
    for (let index = 0; index < guerreros.length; index++) {
        
        if (guerreros[index].nombre == peleador.value) {
            existe = true;
            peleadorElegido = guerreros[index];
            break;
        }
    }

    mostrarPeleadorEnPantalla(peleadorElegido,existe);
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
        Swal.fire({
            title: "Bienvenido Gran Peleador!",
            text: "Tu peleador ha sido agregado.",
            icon: "success"
          });
    } else {
        Swal.fire({
            title: "Oh no...!",
            text: "El guerrero ya existe.",
            icon: "error"
          });
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

async function buscarGuerreroEnApi(){
    const peleador = document.getElementById("peleador").value;
    await buscarGuerreroEnApiByName(peleador);
}

async function buscarGuerreroEnApiByName(nombre) {

    try {
        var myHeaders = new Headers();
        var myInit = {
            method: "GET",
            headers: myHeaders,
            mode: "cors",
            cache: "default",
        };

        var url = `https://dragonball-api.com/api/characters?name=${nombre}`;
        var request = new Request(url, myInit);

        const response = await fetch(request);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        if(data.length > 0){
         peleadorEncontrado = data[0];
         mostrarPeleadorEnPantalla({
            nombre: peleadorEncontrado.name,
            poder: peleadorEncontrado.ki
         },true)

        }else{
            mostrarPeleadorEnPantalla(null,false);
        }

    } catch (error) {
        console.error("Error al buscar el guerrero:", error);
    }
}

function mostrarPeleadorEnPantalla(peleadorElegido,encontrado){
    var card = document.getElementById("tarjetaGuerrero");
    var newHtml  = "";
    if(encontrado){
        newHtml = `
            <div class = "tarjeta">
            <h2>Guerrero</h2>
            <div>Nombre: ${peleadorElegido.nombre} </div>
            <div>Poder: ${peleadorElegido.poder} </div>
            </div>
            `;
    }else{
        newHtml = "No se encontró el guerrero."
    }

    card.innerHTML = newHtml;
}