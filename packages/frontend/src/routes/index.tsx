import { createFileRoute } from '@tanstack/react-router'

const Index = () => {
  return <div>Hello index!</div>
}

export const Route = createFileRoute('/')({
  component: Index
})