// Migrations
import createUsuario from './migrations/create-usuario'

// Models
import Usuario from './models/usuario'

// Seeds
import seedUsuario from './seeds/usuario'

export default {
  migrations: [
    createUsuario
  ],
  models: {
    Usuario
  },
  seeds: [
    seedUsuario
  ]
}
