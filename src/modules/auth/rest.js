export default function ({ route, controller }) {
  route.post('/auth/login', controller.login())
  route.post('/auth/refresh', controller.refresh())
  route.delete('/auth/logout', controller.logout())
}
