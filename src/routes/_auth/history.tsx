import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/history')({
  component: () => <HistoryRoot />,
});

function HistoryRoot() {
  return <Outlet />;
}
