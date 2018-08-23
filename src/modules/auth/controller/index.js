import { util } from 'hienajs'
import * as validate from './validate'

async function insert (config, models, usuario, block = false) {
  const chave = util.token.newToken(config.token.secret, config.token.duration, usuario)
  return models.Token.insert(usuario, chave, block)
}

async function update (config, token) {
  const chave = util.token.newToken(config.token.secret, config.token.duration, token.usuario_id)
  token.token = chave.token
  token.expira = chave.expira
  token.refresh = chave.refresh
  return token.save()
}

export async function login ({ config, models, req, mixins }) {
  const { login, senha } = validate.create(req.body)
  let usuario = await mixins.usuario.findLoginSenha(login, senha)
  const token = await insert(config, models, usuario)
  usuario = await mixins.usuario.get(usuario)
  return { token, usuario }
}

export async function refresh ({ config, models, mixins, req }) {
  const { refresh } = validate.refresh(config, req.body)
  const tokenRefresh = await models.Token.refresh(refresh)
  const token = await update(config, tokenRefresh)
  let usuario = await mixins.usuario.get(tokenRefresh.usuario_id)
  return { token, usuario }
}

export async function logout ({ models, req }) {
  const { token } = validate.destroy(req.body)
  return models.Token.destroy(token)
}
