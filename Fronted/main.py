from flask import Flask, render_template, redirect, request, session, url_for
import requests
import json
from datetime import datetime
import os

app = Flask(__name__, template_folder="templates")
app.secret_key = "casae12312"


@app.route("/")
def login():
    return render_template("login.html")


@app.route("/loguearse", methods=["POST"])
def loguear():
    usuario = request.form["username"]
    contrasenia = request.form["password"]
    url = "http://127.0.0.1:8000/autenticarse/<correol><pasw>"
    parametros = {"correol": usuario, "pasw": contrasenia}
    peticion = requests.get(url, parametros)
    if peticion.status_code == 200:
        # print(peticion.json())

        pintar_menu = peticion.json()
        session["menus"] = pintar_menu

        return render_template("inicio.html", menu=pintar_menu)

    return render_template("login.html", estado="Usuario o contrasenia invalidos!!")


@app.route("/Inicio")
def Inicio():
    doce = session.get("menus")

    return render_template("inicio.html", menu=doce)

@app.route("/Cuidados")
def Cuidados():
    doce = session.get("Cuidados")

    return render_template("cuidados.html", menu=doce)

@app.route("/donaciones")
def donaciones():
    doce = session.get("donaciones")

    return render_template("donaciones.html", menu=doce)

@app.route("/programasCastracion")
def programasCastracion():
    doce = session.get("programasCastracion")

    return render_template("programasCastracion.html", menu=doce)

@app.route("/denuncias")
def denuncias():
    doce = session.get("denuncias")

    return render_template("denuncias.html", menu=doce)

@app.route("/albergueTemp")
def albergueTemp():
    doce = session.get("albergueTemp")

    return render_template("albergueTemp.html", menu=doce)

@app.route("/contacto")
def contacto():
    doce = session.get("contacto")

    return render_template("contacto.html", menu=doce)

@app.route("/formularioAdopcion")
def formularioAdopcion():
    doce = session.get("formularioAdopcion")

    return render_template("formularioAdopcion.html", menu=doce)

@app.route("/reglamentoAdopcion")
def reglamentoAdopcion():
    doce = session.get("reglamentoAdopcion")

    return render_template("reglamentoAdopcion.html", menu=doce)

@app.route("/Salir")
def logout():
    session.pop("menus", None)
    return redirect(url_for("login"))


@app.route("/CrearUsuario", methods=["POST"])
def CrearUsuario():
    email = request.form["email"]
    new_username = request.form["new_username"]
    new_password = request.form["new_password"]
    usertype = str(request.form["usertype"])
    institution_name = request.form["institution_name"]
    address = request.form["address"]
    phone = request.form["phone"]

    urlUsuario = "http://127.0.0.1:8000/insertarUsuario"
    urlCentro = "http://127.0.0.1:8000/CrearCentro"
    urlObtenerId = "http://127.0.0.1:8000/obteneridI/<nombre>"
    Id = 1

    if usertype == "association":

        parametrosAs = {
            "id": 0,
            "nombre": institution_name,
            "direccion": address,
            "notelefono": str(phone),
            "estado": 0,
        }
        x = requests.post(urlCentro, data=json.dumps(parametrosAs))
        parametrosid = {"nombre": institution_name}
        if x.status_code == 201:
            y = requests.get(urlObtenerId, parametrosid)
            data = y.json()
            Id = data["id"]

    parametro = {
        "id": 0,
        "username": new_username,
        "correo": str(email),
        "password": str(new_password),
        "imagenUsuario": "default.png",
        "fechaCreacion": "",
        "idPerdil": 1,
        "idCentroAyuda": Id,
    }

    z = requests.post(urlUsuario, data=json.dumps(parametro))

    return render_template("login.html")


#  INICIO DE LA PUBLICACION RENDERIZACION
@app.route("/PublicacionAgregar", methods=["POST"])
def PublicacionCrear():
    titulo = request.form["title"]
    descripcion = request.form["descripcion"]
    lugar = request.form["lugar"]
    imagen = request.files["imagen"]
    urlCrear = "http://127.0.0.1:8000/insertarPublicacion"
    urlobtnerIdU = "http://127.0.0.1:8000/Obteneneriduser/<correo>"
    correoUs = request.form["correoUs"]
    id = 0
    pCorreous = {"correo": correoUs}
    x = requests.get(urlobtnerIdU, pCorreous)

    if x.status_code == 200:
        data = x.json()
        id = data["id"]
    print(x)

    tiempo = datetime.now()
    horaActual = tiempo.strftime("%Y%H%M%S")
    nm = ""
    if imagen.filename != "":
        nm = horaActual + "_" + imagen.filename
        imagen.save("/static/imagenesServer/" + nm)

    parametros = {
        "id": 0,
        "titulo": str(titulo),
        "descripcion": str(descripcion),
        "lugar": str(lugar),
        "foto": str(nm),
        "fechaHora": "",
        "idUser": id,
        "estado": 0,
        "idCentro": 0,
        "user": "",
        "correo": "",
        "imagenUsuario": "",
    }

    # INSERTANDO NUEVA PUBLICACION
    y = requests.post(urlCrear, data=json.dumps(parametros))
    if y.status_code == 200:
        doce = session.get("menus")
        return redirect(url_for("Inicio"))
    return redirect(url_for("Inicio"))


@app.route("/actualizarimg/<string:accion>", methods=["POST"])
def CambiarImgUsuario(accion):
    imagen = request.files["txtimagen"]
    idCorreo = request.form["idCorreo"]
    imgAnterior = request.form["imgAnterior"]
    url = "http://127.0.0.1:8000/actualizarImagenUsuario"
    tiempo = datetime.now()
    horaActual = tiempo.strftime("%Y%H%M%S")
    nm = ""
    if imagen.filename != "":
        nm = horaActual + "_" + imagen.filename
        imagen.save("static/imagenesServer/" + nm)

        if accion == "ModificarImg":
            parametros = {
                "id": 0,
                "username": "",
                "correo": idCorreo,
                "password": "",
                "imagenUsuario": nm,
                "fechaCreacion": "",
                "idPerdil": 0,
                "idCentroAyuda": 0,
            }
            x = requests.put(url, data=json.dumps(parametros))
            if imgAnterior != "default.jpg":
                os.remove("static/imagenesServer/" + imgAnterior)
            if x.status_code == 201:
                response = {"estado": 1, "mensaje": "Foto Modificada Correctamente!!"}
                return json.dumps(response)
            else:
                response = {"estado": 0, "mensaje": "Porfavor verificar los datos"}
                return json.dumps(response)

    if accion == "EliminarImg":
        parametros = {
            "id": 0,
            "username": "",
            "correo": idCorreo,
            "password": "",
            "imagenUsuario": "default.jpg",
            "fechaCreacion": "",
            "idPerdil": 0,
            "idCentroAyuda": 0,
        }
        y = requests.put(url, data=json.dumps(parametros))
        if imgAnterior != "default.jpg":
            os.remove("static/imagenesServer/" + imgAnterior)

        if y.status_code == 201:
            response = {"estado": 1, "mensaje": "Foto Restablecida Correctamente!!"}
            return json.dumps(response)
        else:
            response = {"estado": 0, "mensaje": "Porfavor verificar los datos"}
            return json.dumps(response)
    response = {"estado": 0, "mensaje": "Porfavor verificar los datos"}
    return json.dumps(response)


@app.route("/Publicaciones", methods=["GET"])
def publicaciones():
    correo_usuario = session.get("menus").get("correo")
    if correo_usuario:
        url = "http://127.0.0.1:8000/ListarPporUsuario/<correo>"
        parametros = {"correo": correo_usuario}
        response = requests.get(url, params=parametros)
        if response.status_code == 200:
            publicaciones = response.json()
            return render_template(
                "publicaciones.html",
                publicaciones=publicaciones,
                correo_usuario=correo_usuario,
            )
    return render_template(
        "publicaciones.html", publicaciones=[], correo_usuario=correo_usuario
    )


@app.route("/verAyudas")
def VerAyudasAdmon():
    doce = session.get("menus")
    url = "http://127.0.0.1:8000/SeleccionarEstadosA"

    peticion = requests.get(url)
    if peticion.status_code == 200:
        datos = peticion.json()

    print(datos)
    return render_template("verAyudas.html", menu=doce, tabla=datos)


@app.route("/admonusuarios")
def AdmonUsuarios():
    doce = session.get("menus")
    url = "http://127.0.0.1:8000/viewAdmonUser"

    peticion = requests.get(url)
    if peticion.status_code == 200:
        datos = peticion.json()

    print(datos)
    return render_template("administrarUsuario.html", menu=doce, tabla=datos)

@app.route("/ActualizarPublicacion", methods=["POST"])
def actualizar_publicacion():
    idP = request.form["idPublicacion"]
    titulo = request.form["titulo"]
    descripcion = request.form["descripcion"]
    lugarDireccion = request.form["lugarDireccion"]
    imagen = request.files["imagen"]
    idU = request.form["correoU"]

    urlP = "http://127.0.0.1:8000/ActualizarPublicacion"
    tiempo = datetime.now()
    horaA = tiempo.strftime("%Y%H%M%S")
    nm = ""
    if imagen.filename != "":
        nm = horaA + "_" + imagen.filename
        imagen.save("/static/imagenesServer/" + nm)

    parametros = {
        "id": int(idP),
        "titulo": str(titulo),
        "descripcion": str(descripcion),
        "lugar": str(lugarDireccion),
        "foto": str(nm),
        "fechaHora": "",
        "idUser": int(idU),
        "estado": 0,
        "idCentro": 0,
        "user": "",
        "correo": "",
        "imagenUsuario": "",
    }
    x = requests.put(urlP, data=json.dumps(parametros))
    if x.status_code == 200:
        response = {"estado": 1, "mensaje": "Publicacion Correctamente!!"}
        return redirect(url_for("publicaciones"))
    else:
        response = {"estado": 0, "mensaje": "Porfavor verificar los datos"}
        return json.dumps(response)

@app.route('/Adopcion')
def page1():
    return render_template('reglamentoAdopcion.html')

@app.route('/Atencion')
def page2():
    return render_template('atencionvet.html')

@app.route('/Albergue')
def page3():
    return render_template('albergueTemp.html')

@app.route('/Educacion')
def page4():
    return render_template('educacion.html')

@app.route('/Programas')
def page5():
    return render_template('programasCastracion.html')

@app.route('/Denuncias')
def page6():
    return render_template('denuncias.html')

@app.route('/Donaciones')
def page7():
    return render_template('donaciones.html')

@app.route('/Contacto')
def page8():
    return render_template('contacto.html')

if __name__ == "__main__":
    app.run(debug=True)
