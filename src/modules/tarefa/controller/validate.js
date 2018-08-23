import { util } from 'hienajs'

export async function add (table, dados, usuario) {
  // Valida
  util.validate.forIsEmpty(dados, ['descricao'])
  await util.validate.existe(table, {
    descricao: dados.descricao,
    finalizada: false,
    usuario_id: usuario.id
  }, false, true)

  dados.usuario_id = usuario.id
  return dados
}

export async function edit (table, id, dados, usuario) {
  if (!util.validate.isEmpty(dados, 'descricao')) {
    await util.validate.existe(table, {
      descricao: dados.descricao,
      finalizada: false,
      usuario_id: usuario.id
    }, id)
  }
  return dados
}
