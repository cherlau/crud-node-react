import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios"

  console.log("Função getUsers foi chamada!")

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro na consulta:", err)
      return res.status(500).json({ error: "Erro na consulta" })
    }

    return res.status(200).json(data)
  })
}
