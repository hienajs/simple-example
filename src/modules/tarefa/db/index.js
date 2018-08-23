// Migrations
import createTarefa from './migrations/create-tarefa'

// Models
import Tarefa from './models/tarefa'

export default {
  migrations: [
    createTarefa
  ],
  models: {
    Tarefa
  }
}
