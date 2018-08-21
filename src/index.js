import hiena from 'hienajs'

async function init () {
  let server = await hiena()
  server.startRest()
}
init()
