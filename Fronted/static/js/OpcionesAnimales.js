
const modalOpcion = document.querySelector("#modalOpcion");
const cancelarMopcion = document.querySelector("#cancelarMopcion");
const idCorreo = document.querySelector("#idPCorreo");
const id1 = document.querySelector("#id1");




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

function cargar() {
    Obtenerid();
}

function Obtenerid() {

    axios
        .get("http://127.0.0.1:8000/Obteneneriduser/<correo>", {
            params: {
                correo: idCorreo.value,
            },
        })
        .then((response) => {
            id1.value = response.data.id;
        })
        .catch((e) => {
            console.log(e);
        });
}

function OpcionesAnimales() {
    let VerOpciones = document.querySelectorAll("#VerOpciones");
    cargar();
    for (boton of VerOpciones) {
        boton.addEventListener("click", function (e) {
            // IDPUBLICACION
            let idpublica = this.value;
            AgregarOpcionUsuario(idpublica);
            modalOpcion.showModal();
        });
    }
}

function AgregarOpcionUsuario(idPublicacion) {
    document.querySelector("#btnAceptarOpcion").addEventListener("click", () => {
        alertaAceptarOpcion(idPublicacion);
    });
}



function alertaAceptarOpcion(idPublicacion) {
    // var textoSeleccionado = textOpcion.options[textOpcion.selectedIndex].text;
    Swal.fire({
        target: document.querySelector("#modalOpcion"),
        title: "¿Desea " + textOpcion.options[textOpcion.selectedIndex].text + " este animal?",
        text: "Los animales son seres maravillosos que nos enseñan sobre la belleza de la naturaleza.",
        icon: "info",
        background: "#ffffff",
        showCancelButton: true,
        confirmButtonColor: "#0072ff",
        cancelButtonColor: "#D2122E",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí",
    }).then((result) => {
        if (result.value) {
            const idp = idPublicacion;
            const idUser = id1.value;
            const opcion = textOpcion.value;
            crearEstadoAnimal(idp, idUser, opcion);
        }
    });
}

function crearEstadoAnimal(idpublicacion, iduser, idopcion) {
    console.log(idpublicacion);
    console.log(iduser);
    console.log(idopcion);

    axios
        .post("http://127.0.0.1:8000/InsertarEstadoAnimal", {
            id: 0,
            idCargo: iduser,
            idOpcion: idopcion,
            idpublicacion: idpublicacion
        })
        .then(function (response) {
            if (response.status === 200) {
                modalOpcion.close();
                Swal.fire({
                    title: "Excelente!!",
                    text: "Opcion ejecutada correctamente",
                    icon: "success",
                    confirmButtonColor: "#008d49",
                }).then(function () {
                    window.location.replace("/Inicio");
                });

            } else {
                modalOpcion.close();
                Swal.fire({
                    title: "Error",
                    text: "Parece que algo salio mal :(",
                    icon: "error",
                    confirmButtonColor: "#ff004c",
                }).then(function () {
                    window.location.replace("/Inicio");
                });
            }
        })
}

// HACER UN Document.querySelector PARA CADA CLASE INICIO>> dv

function txtEstado44() {

    axios
        .get("http://127.0.0.1:8000/SeleccionarEstadosA")
        .then(function (response) {

            Object.entries(response.data).forEach(([key, value]) => {
                let cadena = "";
                if (value.opcionAnimal == "Adoptar") {
                    cadena = "Animal Adoptado. ❤️";

                }
                if (value.opcionAnimal == "Rescatar") {
                    cadena = "Animal Rescatado. ❤️";

                }
                console.log(cadena);
            });
            // console.log(response);


            // response.data.id;

        })
        .catch((e) => {
            console.log(e);
        });
}

