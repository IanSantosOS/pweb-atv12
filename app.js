const express = require("express")
const bodyParser = require("body-parser")
const multer = require("multer")

const app = express()
const upload = multer()

app.use(express.static('public'));
app.set('view engine', 'ejs');
// app.set('views', 'views');

app.get("/" , (req, res) => {
    res.render("lista")
})

app.get("/cadastro" , (req, res) => {
    res.render("cadastro")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT)
})