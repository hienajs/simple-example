import { postgresCreateTable, postgresAddIndex } from 'hienajs'

export default {
  name: 'create-usuario',
  async up ({ con, transaction }) {
    await postgresCreateTable(con, transaction, 'usuarios', `
      nome character varying(255) NOT NULL,
      login character varying(255) NOT NULL UNIQUE,
      senha character varying(255) NOT NULL
    `)

    await postgresAddIndex(con, transaction, 'usuarios', 'usuarios_idx_login', 'login')
    await postgresAddIndex(con, transaction, 'usuarios', 'usuarios_idx_nome', 'nome')
  }
}
