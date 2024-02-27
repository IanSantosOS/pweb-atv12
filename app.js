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

app.get("/sucesso" , (req, res) => {
    res.render("sucesso")
})


app.listen(3000, () => console.log('servidor rodando'))