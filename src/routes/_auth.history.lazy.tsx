import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/history')({
  component: () => <div>Hello /history!</div>
})