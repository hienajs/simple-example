import hiena from 'hienajs'
import config from './config'
import modules from './modules'

async function init () {
  let server = await hiena({ config, modules })
  server.startRestAndService()
}
init()
