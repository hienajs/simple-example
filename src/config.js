import { util } from 'hienajs'

const config = {}

config.development = {
  dirname: __dirname,
  db: {
    dialect: 'postgres',
    url: 'postgres://example:example@localhost/todo'
  },
  token: {
    secret: 'secret.key',
    duration: 1
  }
}

// Merge production e test no develop
config.test = util.object.merge({}, config.development, {})
config.production = util.object.merge({}, config.development, {})

// Env
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
config[env].env = env

// Config
export default config[env]
