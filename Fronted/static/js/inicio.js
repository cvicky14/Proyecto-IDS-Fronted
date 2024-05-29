var modal = document.getElementById("myModal");
var btn = document.getElementById("Publicar");
var span = document.getElementsByClassName("close")[0];
var form = document.querySelector('form');



btn.onclick = function () {
  modal.style.display = "block";
}
if (span) {
  span.onclick = function () {
    modal.style.display = "none";
    resetForm();
  }
}


window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resetForm();
  }
}

// form.onsubmit = function() {
//     modal.style.display = "none";
//     resetForm();
//     return true;
// }

function resetForm() {
  document.querySelector('.textarea-wrapper textarea').value = '';
  var preview = document.querySelector('.textarea-image');
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
  document.getElementById('image-upload').value = '';
}

function previewImage(event) {
  var input = event.target;
  var preview = document.querySelector('.textarea-image');
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
const bar = document.querySelector("#bar");

bar.addEventListener("click", (e) => {
  document.querySelector(".publicaciones-container").classList.toggle("hide");
  document.querySelector(".bar").classList.toggle("hide");
})

//MODO DAR AND LIGHT THEME IN THE WEB
const body = document.querySelector("body");
let modeToggle = body.querySelector("#switch-mode");
const sidebar = body.querySelector("#menu_opcion");

function mode() {
  const swictherTheme = document.querySelector("#switch-mode");
  const root = document.documentElement;

  if (root.getAttribute("data-theme") === "dark") {
    swictherTheme.checked = true;
  }

  function toggleTheme() {
    const setTheme = this.checked ? "dark" : "light";
    root.setAttribute("data-theme", setTheme);
    localStorage.setItem("theme", setTheme);
  }
  if (swictherTheme) {
    swictherTheme.addEventListener("click", toggleTheme);
  }

}
// RENDERIZANDO LAS PUBLICACIONES
window.onload = function () {
  // Código que se ejecutará cuando la página termine de cargar
  mode();
}




document.getElementById('bar').addEventListener('click', function () {
  var menu = document.getElementById('menu');
  var bar = document.getElementById('bar');
  if (menu.style.left === "0px") {
    menu.style.left = "-300px";
    bar.classList.remove('open');
  } else {
    menu.style.left = "0";
    bar.classList.add('open');
  }
});
const togle = document.getElementById('theme-toggle');
if (togle) {
  togle.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
  });
}

