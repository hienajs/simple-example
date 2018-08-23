import { postgresAddIndex } from 'hienajs'

export default {
  name: 'add-data-finalizada',
  async up ({ con, transaction }) {
    await con.query(`
      ALTER TABLE tarefas
        ADD COLUMN data_finalizada timestamp with time zone;
    `, { transaction })

    await postgresAddIndex(con, transaction, 'tarefas', 'tarefas_idx_data_finalizada', 'data_finalizada')
  }
}
