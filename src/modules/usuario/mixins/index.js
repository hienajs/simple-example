export async function get ({ models }, id) {
  let reg = await models.Usuario.findById(id)
  reg.senha = undefined
  delete reg.senha
  return reg
}

export async function findLoginSenha ({ models }, login, senha) {
  return models.Usuario.findByLogin(login, senha)
}
