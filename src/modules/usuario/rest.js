export default function ({ route, controller }) {
  // Usuario
  route.get('/usuario', controller.list())
  route.get('/usuario/:id', controller.get())
  route.post('/usuario', controller.add())
  route.put('/usuario/:id', controller.edit())
  route.delete('/usuario/:id', controller.del())
}
