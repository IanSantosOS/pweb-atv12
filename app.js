// Criação das Variáveis
const express = require("express")
const app = express()

const estadosBrasil = [
    'acre', 'alagoas', 'amapá', 'amazonas', 'bahia', 'ceará',
    'espírito santo', 'goiás', 'maranhão', 'mato grosso do sul',
    'minas gerais', 'pará', 'paraíba', 'paraná', 'pernambuco', 'piauí',
    'rio de janeiro', 'rio grande do norte', 'rio grande do sul', 'rondônia',
    'roraima', 'santa catarina', 'são paulo', 'sergipe', 'tocantins'
]

const opcoesEstadoCivil = [
    'solteiro(a)', 'casado(a)', 'separado(a)',
    'divorciado(a)', 'viúvo(a)'
]

const usuarios = []


// Configuração
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Rotas GET (Páginas)
app.get("/" , (req, res) => {
    res.render("lista")
})

app.get("/cadastro" , (req, res) => {
    res.render("cadastro")
})


/* nome
 * cpf
 * dataNasc
 * sexo
 * estadoCivil
 * rendaMensal
 * logradouro
 * numero
 * complemento
 * estado
 * cidade
 */
app.post('/json/cadastro', (req, res) => {
    let {
        nome, cpf, dataNasc, estadoCivil,
        rendaMensal, logradouro, numero,
        complemento, estado, cidade
    } = req.body

    let errorMsg = {}

    if (!nome) {
        errorMsg.nome = 'Nome é obrigatório'
    }
    else if (nome.length < 3) {
        errorMsg.nome = 'Nome deve ter no mínimo 3 caracteres'
    }

    if (!cpf) {
        errorMsg.cpf = 'CPF é obrigatório'
    }
    else if (isNaN(cpf)) {
        errorMsg.cpf = 'CPF tem que ser um valor númerico'
    }
    else if (cpf < 0) {
        errorMsg.cpf = 'CPF deve ser um número positivo de 11 dígitos'
    }
    else if (cpf.toString().length !== 11) {
        errorMsg.cpf = 'CPF deve ter no mínimo 11 dígitos'
    }

    if (!dataNasc) {
        errorMsg.dataNasc = 'Data de Nascimento é obrigatório'
    }
    if ( (new Date(dataNasc)) >= (new Date()) ) {
        errorMsg.dataNasc = 'Data de Nascimento inválida'
    }

    if (!sexo) {
        errorMsg.sexo = 'Informe o sexo'
    }
    else if (sexo !== 'M' && sexo !== 'F') {
        errorMsg.sexo = 'Informe um sexo válido'
    }

    if (!estadoCivil) {
        errorMsg.estadoCivil = 'Estado Civil é obrigatório'
    }
    else if (!opcoesEstadoCivil.includes(estadoCivil)) {
        errorMsg.estadoCivil = 'Estado Civil inválido'
    }

    if (!rendaMensal) {
        errorMsg.rendaMensal = 'Renda Mensal é obrigatório'
    }
    else if (isNaN(rendaMensal)) {
        errorMsg.rendaMensal = 'Renda Mensal deve ser um valor numérico'
    }

    if (!logradouro) {
        errorMsg.logradouro = 'Logradouro é obrigatório'
    }
    else if (logradouro.length < 3) {
        errorMsg.logradouro = 'Logradouro deve ter no mínimo 3 caracteres'
    }

    if (!numero) {
        errorMsg.numero = 'Numero é obrigatório'
    }
    if (isNaN(numero)) {
        errorMsg.numero = 'Numero não é um número'
    }
    if (parseInt(numero) !== numero) {
        errorMsg.numero = 'Número deve ser do tipo inteiro'
    }

    if (!estado) {
        errorMsg.estado = 'Estado é obrigatório'
    }
    if (!estadosBrasil.includes(estado)) {
        errorMsg.estado = 'Estado inexistente'
    }

    if (!cidade) {
        errorMsg.cidade = 'Cidade é obrigatório'
    }
    else if (cidade.length < 3) {
        errorMsg.cidade = 'Cidade deve ter no mínimo 3 caracteres'
    }

    if (Object.keys(errorMsg).length === 0) {
        usuarios.push(req.body)
        return res.status(204)
    }
    else {
        return res.status(400).json({ errorMsg })
    }
})


// Servidor no Ar
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT)
})