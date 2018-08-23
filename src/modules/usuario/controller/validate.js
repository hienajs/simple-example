import { util } from 'hienajs'

function isSenha (senha) {
  let regex = /^(?=(?:.*?[a-zA-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%*()_+^&}{:;?.]*$/

  if (senha.length < 8) {
    throw new Error('Senha deve ter no mínimo 8 caracteres!')
  } else if (!regex.exec(senha)) {
    throw new Error('Senha deve possuir letras, números e caracteres especiais!')
  }
}

export async function create (table, dados) {
  // Valida
  util.validate.forIsEmpty(dados, ['nome', 'login', 'senha'])
  isSenha(dados.senha)
  await util.validate.existe(table, { login: dados.login }, false, true)

  return dados
}

export async function edit (table, id, dados) {
  // Valida
  if (!util.validate.isEmpty(dados, 'senha')) {
    util.validate.forIsEmpty(dados, ['confirma_senha'])
    if (dados.senha !== dados.confirma_senha) throw new Error('Senha e Confirmação não conferem!')
    isSenha(dados.senha)
  }
  if (!util.validate.isEmpty(dados, 'login')) {
    await util.validate.existe(table, { login: dados.login }, id)
  }

  return dados
}
