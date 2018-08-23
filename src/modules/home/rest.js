export default function ({ route, controller }) {
  route.get('/', controller.hello())
}
