
const modalOpcion = document.querySelector("#modalOpcion");
const cancelarMopcion = document.querySelector("#cancelarMopcion");


function OpcionesAnimales() {
    let VerOpciones = document.querySelectorAll("#VerOpciones");

    for (boton of VerOpciones) {
        boton.addEventListener("click", function (e) {
            let op = this.value;
            console.log(op);
            modalOpcion.showModal();
        });
    }
}

cancelarMopcion.addEventListener("click", (e) => {
    modalOpcion.close();
})


