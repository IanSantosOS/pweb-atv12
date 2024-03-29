// Criação das Variáveis
const { isEmail } = require('validator')
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


// Contas de exemplo apenas, como só servem para serem mostradas na tabela não foi colocado as informações adicionais
const usuarios = [];


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

app.get("/sucesso" , (req, res) => {
    res.render("sucesso")
})

// Deletar Usuários
app.delete('/delete/user/:id', (req, res) => {
    let { id } = req.params // pega o id fornecido na url

    let userIndex = usuarios.findIndex(user => user.id == id)
    usuarios.splice(userIndex, 1)

    return res.status(204).json({});
})

// Lista de Usuários
app.get('/json/users', (req, res) => {
    let listaUsers = usuarios.map(user => {
        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            sexo: user.sexo,
            dataNasc: user.dataNasc
        }
    })

    return res.status(200).json(listaUsers);
})

// Validações de Cadastro
app.post('/cadastro', (req, res) => {
    let {
        nome, email, cpf, dataNasc, sexo, estadoCivil,
        rendaMensal, logradouro, numero,
        complemento, estado, cidade
    } = req.body

    let errorMsg = {}

    if (!nome.trim()) {
        errorMsg.nome = 'Nome é obrigatório'
    }
    else if (nome.length < 3) {
        errorMsg.nome = 'Nome deve ter no mínimo 3 caracteres'
    }
    
    if (!email) {
        errorMsg.email = 'E-mail é obrigatório'
    }
    else if (!isEmail(email)) {
        errorMsg.email = 'E-mail inválido'
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
        errorMsg.cpf = 'CPF tem que ter 11 dígitos'
    }

    if (!dataNasc) {
        errorMsg.dataNasc = 'Data de Nascimento é obrigatório'
    }
    else {
        let dataNascValida = (new Date(dataNasc)).toISOString().split('T')[0]
        let dataAtual = (new Date()).toISOString().split('T')[0]
        if (dataNasc !== dataNascValida) {
            errorMsg.dataNasc = 'Data inexistente'
        }
        else if (dataNasc >= dataAtual) {
            errorMsg.dataNasc = 'Data de Nascimento inválida'
        }
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
    else if (rendaMensal < 0 || rendaMensal == -0) {
        errorMsg.rendaMensal = 'Renda Mensal não pode ser negativa'
    }
    else if (Number(rendaMensal).toFixed(2) !== rendaMensal) {
        errorMsg.rendaMensal = 'Renda Mensal tem que ter 2 casas decimais'
    }

    if (!logradouro) {
        errorMsg.logradouro = 'Logradouro é obrigatório'
    }
    else if (logradouro.length < 3) {
        errorMsg.logradouro = 'Logradouro deve ter no mínimo 3 caracteres'
    }
    
    if (!complemento) {
        errorMsg.complemento = 'Complemento é obrigatório'
    }

    if (!numero) {
        errorMsg.numero = 'Numero é obrigatório'
    }
    else if (isNaN(numero)) {
        errorMsg.numero = 'Numero não é um número'
    }
    else if (!Number.isInteger(Number(numero))) {
        errorMsg.numero = 'Número deve ser do tipo inteiro'
    }

    if (!estado) {
        errorMsg.estado = 'Estado é obrigatório'
    }
    else if (!estadosBrasil.includes(estado)) {
        errorMsg.estado = 'Estado inexistente'
    }

    if (!cidade) {
        errorMsg.cidade = 'Cidade é obrigatório'
    }
    else if (cidade.length < 3) {
        errorMsg.cidade = 'Cidade deve ter no mínimo 3 caracteres'
    }

    if (Object.keys(errorMsg).length === 0) {
        usuarios.push({
            id: usuarios.at(-1)?.id + 1 || 0,
            ...req.body
        })
        return res.status(204).json({})
    }
    else {
        return res.status(400).json({ errorMsg })
    }
})


// // Servidor no Ar
// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//     console.log('Servidor rodando na porta: ' + PORT)
// })

module.exports = app;
