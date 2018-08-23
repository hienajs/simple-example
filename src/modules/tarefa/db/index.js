// Migrations
import createTarefa from './migrations/create-tarefa'
import addDataFinalizada from './migrations/add-data-finalizada'

// Models
import Tarefa from './models/tarefa'

export default {
  migrations: [
    createTarefa,
    addDataFinalizada
  ],
  models: {
    Tarefa
  }
}
