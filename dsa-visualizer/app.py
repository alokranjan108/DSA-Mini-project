"""Flask server: serves the frontend and stores run history in SQLite."""
import sqlite3
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder="static", static_url_path="")
DB = "runs.db"

def db():
    c = sqlite3.connect(DB)
    c.execute("CREATE TABLE IF NOT EXISTS runs(id INTEGER PRIMARY KEY, algo TEXT, size INT, steps INT, ts DATETIME DEFAULT CURRENT_TIMESTAMP)")
    return c

@app.route("/")
def index():
    return send_from_directory("static", "index.html")

@app.post("/api/runs")
def add_run():
    d = request.get_json(force=True)
    c = db()
    c.execute("INSERT INTO runs(algo,size,steps) VALUES(?,?,?)", (str(d.get("algo"))[:40], int(d.get("size", 0)), int(d.get("steps", 0))))
    c.commit()
    return jsonify(ok=True)

@app.get("/api/runs")
def list_runs():
    rows = db().execute("SELECT algo,size,steps,ts FROM runs ORDER BY id DESC LIMIT 8").fetchall()
    return jsonify([dict(algo=a, size=s, steps=t, ts=ts) for a, s, t, ts in rows])

if __name__ == "__main__":
    app.run(debug=True)
