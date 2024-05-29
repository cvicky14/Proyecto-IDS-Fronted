window.onload = function () {
  RenderPublicaciones();

}

let correoUs = document.querySelector("#correoUs");


function RenderPublicaciones() {
  let correo = correoUs.value;
  axios
    .get("http://127.0.0.1:8000/VerPublicaciones")
    .then(function (response) {
      let tag = "";
      Object.entries(response.data).forEach(([key, value]) => {
        // console.log(value.titulo)
        let estado = value.estado;
        let texto = "Ayudame 🥹";
        let clase = "ocultar";
        if (correo != value.correo && estado === 0) {
          clase = "ver";
        }
        let espublicacion = "estado0";
        let dive = "ver";

        if (estado != 0) {
          espublicacion = "estado1"
          dive = "ver";
          texto = "En ayuda 😊";
        }

        tag += `<div id="publicacion" class="${espublicacion}">
                  <div class="usuario">
                  
                    <div class="usuario-info">
                    <img
                    src="static/imagenesServer/${value.imagenUsuario}"
                    
                  />
                 <div class="infor">  
                      <span id="usuario">${value.user}</span>
                      <span class="fecha"
                        >Publicado el ${value.fechaHora}</span
                      >
                      </div>
  
                    </div>
                    <div name="estadot" class="txtaiuda"  id="${dive}">
                    <span>${texto}</span>
                    </div>
                    
                  </div>
                  <div class="contenido">
                    <h3>${value.titulo}</h3>
                    <p>
                      ${value.descripcion}
                    </p>
                   <div class= "imgp">  
                    <img
                      src="static/imagenesServer/${value.foto}"
                      alt="Imagen de la Publicación"
                    />
                    </div>
                    <div class="interacciones">
                      <button value= "${value.id}"><i class="far fa-thumbs-up"></i> Me gusta</button>
                      <button value= "${value.id}" ><i class="far fa-comment"></i> Comentar</button>
                      <button value= "${value.id}" ><i class="fas fa-share"></i> Compartir</button>
  
                     
                      <div class="btnOpciones" id="${clase}" >
                    <button value= "${value.id}" id="VerOpciones" ><i class="fas fa-paw"></i> Ayudar</button>
                     </div>
                    </div>
                  </div>
                </div>`



      })
      document.querySelector("#PublicacionesP").innerHTML = tag;
      OpcionesAnimales();
      // txtEstado44();
    })
    .catch((e) => {
      console.log(e);
    });


}


function eliminarPublicacion(idPublicacion) {
  const url = `http://127.0.0.1:8000/EliminarPublicacion/%3CidPublicacion%3E?idPublicacion=${idPublicacion}`
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        console.log('Publicación eliminada correctamente');
        location.reload();
      } else {
        console.error('Error al eliminar la publicación');
      }
    })
    .catch(error => {
      console.error('Error en la solicitud DELETE:', error);
    });
}