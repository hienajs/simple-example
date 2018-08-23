import createToken from './migrations/create-token'
// Models
import Token from './models/token'

export default {
  migrations: [
    createToken
  ],
  models: {
    Token
  }
}
