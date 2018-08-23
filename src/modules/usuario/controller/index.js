import { UsuarioFilter } from './filter'
import * as validate from './validate'

function cleanSenha (reg) {
  reg.senha = undefined
  delete reg.senha
  return reg
}

export async function list ({ models, req }) {
  let filter = new UsuarioFilter(req.query)
  return models.Usuario.list(filter, ['nome'], {
    attributes: ['id', 'active', 'createdAt', 'nome', 'login']
  })
}

export async function get ({ models, req }) {
  let reg = await models.Usuario.findWithValid({ id: req.params.id })
  return cleanSenha(reg)
}

export async function add ({ models, req }) {
  let dados = await validate.create(models.Usuario, req.body)
  let reg = await models.Usuario.create(dados)
  return cleanSenha(reg)
}

export async function edit ({ models, req }) {
  let dados = await validate.edit(models.Usuario, req.params.id, req.body)
  let reg = await models.Usuario.edit({ id: req.params.id }, dados)
  return cleanSenha(reg)
}

export async function del ({ models, req }) {
  await models.Usuario.del({ id: req.params.id })
  return { message: 'Registro excluido com sucesso!' }
}
