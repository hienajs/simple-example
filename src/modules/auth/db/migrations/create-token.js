import { postgresCreateTable, postgresAddIndex } from 'hienajs'

export default {
  name: 'create-token',
  async up ({ con, transaction }) {
    await postgresCreateTable(con, transaction, 'tokens', `
      usuario_id INTEGER REFERENCES usuarios (id),
      token character varying(255) NOT NULL UNIQUE,
      refresh character varying(255) NOT NULL UNIQUE,
      expira timestamp with time zone NOT NULL,
      cancel_tipo character varying(255),
      cancel_message character varying(255)
    `)

    await postgresAddIndex(con, transaction, 'tokens', 'tokens_idx_token', 'token')
    await postgresAddIndex(con, transaction, 'tokens', 'tokens_idx_refresh', 'refresh')
  }
}
