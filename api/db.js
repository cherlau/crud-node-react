import mysql from "mysql"

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootmysql123",
  database: "usuarios"
})

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err)
    return
  }
  console.log("Conectado ao MySQL")
})
