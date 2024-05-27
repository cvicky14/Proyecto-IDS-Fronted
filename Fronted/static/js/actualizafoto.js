
// PARA CAMBIAR LA IMAGEN DEL USUARIO

const imgUsu = document.querySelector("#imgUsu");
const imgmodal = document.querySelector("#imgmodal");
const cancelarimg = document.querySelector("#cancelarimg");
const imageInput = document.querySelector("#txtimagen");
const previewimg = document.querySelector("#previewimg");
const inputImg = document.querySelector("#imgu");

if (imgUsu) {
    imgUsu.addEventListener("click", (e) => {
        e.preventDefault();
        previewimg.src = "/static/imagenesServer/" + inputImg.value;
        imgmodal.showModal();
    });
}


if (cancelarimg) {
    cancelarimg.addEventListener("click", (e) => {
        e.preventDefault();
        Swal.fire({
            target: document.querySelector("#imgmodal"),
            title: "Desea Salir",
            text: "Se perderán los datos, si es que ya llenó algunos.",
            icon: "info",
            background: "#ffffff",
            showCancelButton: true,
            confirmButtonColor: "#0072ff",
            cancelButtonColor: "#D2122E",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sí, deseo salir",
        }).then((result) => {
            if (result.value) {
                imgmodal.close();

            }
        });
    })

}
if (imageInput) {

    imageInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewimg.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
}

let frmc = $("#formulario1");
let boton = document.getElementsByName("accion1");

for (btn of boton) {
    btn.addEventListener("click", function (e) {
        // e.preventDefault();
        let valor = this.value;
        uno = valor;
        console.log(valor);
        Enviarform(valor)

    })
}

function Enviarform(valor) {
    frmc.submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: frmc.attr("method"),
            url: frmc.attr("action") + "/" + valor,
            data: new FormData(this),
            processData: false,
            contentType: false,
            success: function (response) {
                const respuesta = JSON.parse(response);
                console.log(respuesta.estado);

                if (respuesta.estado == 0) {
                    imgmodal.close();
                    Swal.fire({
                        title: "Error",
                        text: respuesta.mensaje,
                        icon: "error",
                        confirmButtonColor: "#ff004c",
                    }).then(function () {
                        window.location.replace("/Inicio");
                    });
                } else {
                    imgmodal.close();
                    Swal.fire({
                        title: "Excelente!!",
                        text: respuesta.mensaje,
                        icon: "success",
                        confirmButtonColor: "#008d49",
                    }).then(function () {
                        window.location.replace("/");
                    });
                }
            },
            error: function (error) {
                alert(error);
            },
        });
    });
}

