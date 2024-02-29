// Como eu coloquei o parâmetro name em cada um dos inputs, não será necessário criar suas variáveis
// tirando o sexo que é um input radio

/* nome
 * cpf
 * dataNasc
 * estadoCivil
 * rendaMensal
 * logradouro
 * numero
 * complemento
 * estado
 * cidade
 */

const form = document.querySelector('#form-cadastro');

// Exemplo
form.addEventListener('submit', (event) => {
  event.preventDefault()

  const sexo = document.querySelector('input[name="sexo"]:checked');

  alert(
    `nome: ${nome.value}\n` +
    `cpf: ${cpf.value}\n` +
    `dataNasc: ${dataNasc.value}\n` +
    `sexo: ${sexo.value}\n` +
    `estadoCivil: ${estadoCivil.value}\n` +
    `rendaMensal: ${rendaMensal.value}\n` +
    `logradouro: ${logradouro.value}\n` +
    `numero: ${numero.value}\n` +
    `complemento: ${complemento.value}\n` +
    `estado: ${estado.value}\n` +
    `cidade: ${cidade.value}\n`
  )
});
