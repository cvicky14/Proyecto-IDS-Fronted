
const modalOpcion = document.querySelector("#modalOpcion");
const cancelarMopcion = document.querySelector("#cancelarMopcion");
const idCorreo = document.querySelector("#idCorreo");


function OpcionesAnimales() {
    let VerOpciones = document.querySelectorAll("#VerOpciones");
    for (boton of VerOpciones) {
        boton.addEventListener("click", function (e) {
            // IDPUBLICACION
            let op = this.value;
            modalOpcion.showModal();
            ProcesarOpcion(op);
        });
    }
}

cancelarMopcion.addEventListener("click", (e) => {
    modalOpcion.close();
})

const textOpcion = document.querySelector("#textOpcion");

DinamicSelect(textOpcion, "http://127.0.0.1:8000/verOpcionesAnimal",
    "id", "opcion");

function DinamicSelect(entrada, url, id, valor) {
    axios.get(url, {}).then(function (response) {
        Object.entries(response.data).forEach(([key, value]) => {
            entrada.innerHTML += "<option value= '" + value[id] + "'>" + value[valor] + "</option>"
        })

    });
}
let correoc = "carlos12@gmail.com"
let infoTraer = {
    correo: "carlos12@gmail.com"
}

// let dos = document.querySelector("#id1")
// async function TraerIdUsuario() {
//     try {
//         const respuesta = await axios.get(`http://127.0.0.1:8000/Obteneneriduser/<correo>?correo=${correoc}`);
//         const numeroAleatorio = respuesta.data.id;
//         console.log(numeroAleatorio);
//         dos.value = numeroAleatorio;
//         TraerIdUsuario()
//         return numeroAleatorio;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }


function ProcesarOpcion(idpublicacion) {
    TraerIdUsuario();
    let traerid = dos.value;
    alert(idpublicacion);
    alert(traerid);
}