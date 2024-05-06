from flask import Flask, render_template, redirect, request, session, url_for
import requests
import json

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

        print(pintar_menu)
        return render_template("inicio.html", menu=pintar_menu)

    return render_template("login.html", estado="Usuario o contrasenia invalidos!!")


@app.route("/Inicio")
def Inicio():
    doce = session.get("menus")
    print(doce)
    return render_template("inicio.html", menu=doce)


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
        print(usertype)
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


if __name__ == "__main__":
    app.run(debug=True)
