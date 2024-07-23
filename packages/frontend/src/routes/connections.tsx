import { createFileRoute } from '@tanstack/react-router'

const Connections = () => (
  <div>Hello connections!</div>
)

export const Route = createFileRoute('/connections')({
  component: Connections
})