export default function ({ route, others, controller }) {
  // Tarefa
  route.get('/tarefa', others.auth.valida(), controller.list())
  route.get('/tarefa/:id', others.auth.valida(), controller.get())
  route.post('/tarefa', others.auth.valida(), controller.add())
  route.put('/tarefa/:id', others.auth.valida(), controller.edit())
  route.delete('/tarefa/:id', others.auth.valida(), controller.del())
}
