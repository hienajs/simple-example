import { util } from 'hienajs'

export class UsuarioFilter extends util.filter.Filter {
  constructor (query) {
    super(query)
    this.setLike('nome')
    this.setLike('login')
  }
}
