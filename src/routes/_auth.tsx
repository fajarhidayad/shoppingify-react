import { Outlet, createFileRoute } from '@tanstack/react-router';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

export const Route = createFileRoute('/_auth')({
  component: () => <AuthLayout />,
});

function AuthLayout() {
  return (
    <div className="min-h-screen flex relative bg-gray-100">
      <Navbar />

      <main className="flex-1 container py-7 pl-[102px] pr-[417px]">
        <Outlet />
      </main>

      <Sidebar />
    </div>
  );
}
