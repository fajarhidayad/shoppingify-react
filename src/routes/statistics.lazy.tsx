import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/statistics')({
  component: () => <div>Hello /statistics!</div>
})