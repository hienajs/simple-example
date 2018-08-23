import { util } from 'hienajs'

export class TarefaFilter extends util.filter.Filter {
  constructor (query, usuario) {
    super(query)
    this.where.usuario_id = usuario.id
    this.setLike('descricao')
    this.setSame('finalizada')
  }
}
