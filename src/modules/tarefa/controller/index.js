import { util } from 'hienajs'
import { TarefaFilter } from './filter'
import * as validate from './validate'

function whereId (usuario, id) {
  return { id, usuario_id: usuario.id }
}

export async function list ({ models, usuario, req }) {
  let filter = new TarefaFilter(req.query, usuario)
  return models.Tarefa.list(filter, ['id'], {
    attributes: ['id', 'finalizada', 'descricao']
  })
}

export async function get ({ models, usuario, req }) {
  return models.Tarefa.findWithValid(whereId(usuario, req.params.id))
}

export async function add ({ models, usuario, req }) {
  let dados = await validate.add(models.Tarefa, req.body, usuario)
  return models.Tarefa.create(dados)
}

export async function edit ({ models, usuario, req }) {
  let dados = await validate.edit(models.Tarefa, req.params.id, req.body, usuario)
  return models.Tarefa.edit(whereId(usuario, req.params.id), dados)
}

export async function del ({ models, usuario, req }) {
  await models.Tarefa.del(whereId(usuario, req.params.id))
  return { message: 'Registro excluido com sucesso!' }
}

export async function cleanOlds ({ models }) {
  let date = new Date()
  date.setDate(date.getDate() - 7)

  let list = await models.Tarefa.findAll({
    where: {
      finalizada: true,
      data_finalizada: { $lt: date }
    }
  })

  for (const x in list) {
    await list[x].destroy()
  }
}
