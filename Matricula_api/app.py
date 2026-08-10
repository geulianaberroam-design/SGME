from flask import Flask

app = Flask(__name__)


@app.route("/")
def inicio():
    return {
        "mensaje": "API SGME funcionando correctamente"
    }


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )