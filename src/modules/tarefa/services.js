export default function ({ service, controller }) {
  service.agendar(controller.cleanOlds(), '00:00')
}
