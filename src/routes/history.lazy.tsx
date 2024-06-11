import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/history')({
  component: () => <div>Hello /history!</div>
})