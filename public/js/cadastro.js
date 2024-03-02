// Como eu coloquei o parâmetro name em cada um dos inputs, não será necessário criar suas variáveis
// tirando o sexo que é um input radio

const form = document.getElementById('form-cadastro');
const errorMessages = Array.from(document.getElementsByClassName('invalid-feedback'));

form.addEventListener('submit', (event) => {
  event.preventDefault()

  let sexo = document.querySelector('input[name="sexo"]:checked');

  let cadastroInputs = {
    nome : nome.value,
    email: email.value,
    cpf: cpf.value,
    dataNasc: dataNasc.value,
    sexo: sexo.value,
    estadoCivil: estadoCivil.value,
    rendaMensal: Number(rendaMensal.value),
    logradouro: logradouro.value,
    numero: Number(numero.value),
    complemento: complemento.value,
    estado: estado.value,
    cidade: cidade.value
  }

  let options = {
    method: 'POST',
    body: JSON.stringify(cadastroInputs),
    headers: { 'Content-Type': 'application/json' }
  }

  fetch('/cadastro', options)
    .then(res => res.json())
    .catch(err => err.message = '')
    .then(data => {
      if (data?.errorMsg) {
        revelarMensagensDeErro(data.errorMsg)
      }
      else {
        window.location.assign('/sucesso')
      }
    })
});


function revelarMensagensDeErro(msg) {
  let inputsInvalidosAnteriores = Array.from(document.getElementsByClassName('is-invalid'))
  inputsInvalidosAnteriores.forEach(input => {
    input.classList.remove('is-invalid')
  })

  errorMessages.forEach(erro => {
    erro.innerText = "";
  })

  for (const propriedade in msg) {
    document.getElementById(propriedade).classList.add('is-invalid')
    let error = document.getElementById(propriedade + '-error')
    error.innerText = '* ' + msg[propriedade]
  }
}