import { util } from 'hienajs'

export function create (dados) {
  util.validate.forIsEmpty(dados, ['login', 'senha'])
  return dados
}

export function refresh (config, dados) {
  util.validate.forIsEmpty(dados, ['refresh'])
  if (!util.token.validaRefresh(config.token.secret, dados.refresh)) throw new Error('Refresh token inválido!')
  return dados
}

export function destroy (dados) {
  util.validate.forIsEmpty(dados, ['token'])
  return dados
}

export function valida (config, token) {
  let info = util.token.validaToken(config.token.secret, token)
  return { info }
}
