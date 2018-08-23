import { postgresCreateTable, postgresAddIndex } from 'hienajs'

export default {
  name: 'create-tarefa',
  async up ({ con, transaction }) {
    await postgresCreateTable(con, transaction, 'tarefas', `
      usuario_id INTEGER REFERENCES usuarios (id),
      descricao character varying(255) NOT NULL,
      finalizada boolean NOT NULL DEFAULT FALSE
    `)

    await postgresAddIndex(con, transaction, 'tarefas', 'tarefas_idx_descricao', 'descricao')
    await postgresAddIndex(con, transaction, 'tarefas', 'tarefas_idx_finalizada', 'finalizada')
  }
}
