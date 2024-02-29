// Criação das Variáveis
const express = require("express")
const app = express()

const usuarios = []

// Configuração
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rotas das Páginas
app.get("/" , (req, res) => {
    res.render("lista")
})

app.get("/cadastro" , (req, res) => {
    res.render("cadastro")
})

// Servidor no Ar
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT)
})