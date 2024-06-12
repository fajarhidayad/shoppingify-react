import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/statistics')({
  component: () => <div>Hello /statistics!</div>
})