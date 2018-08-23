export default function ({ route, others, controller }) {
  // Usuario
  route.get('/usuario', others.auth.valida(), controller.list())
  route.get('/usuario/:id', others.auth.valida(), controller.get())
  route.put('/usuario/:id', others.auth.valida(), controller.edit())
  route.delete('/usuario/:id', others.auth.valida(), controller.del())
  // Para criar não e necessario auth
  route.post('/usuario', controller.add())
}
