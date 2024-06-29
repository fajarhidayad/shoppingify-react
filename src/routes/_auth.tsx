import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { getProfile } from '@/api/auth';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    try {
      const auth = await getProfile();
      context.auth?.login(auth);
    } catch (error) {
      console.error(error);
      throw redirect({
        to: '/',
      });
    }
  },
  onError: async (err) => {
    console.log(err);
  },
  component: () => <AuthLayout />,
});

function AuthLayout() {
  return (
    <div className="min-h-screen flex relative bg-gray-100">
      <Navbar />

      <main className="flex-1 container py-7 pl-[86px] pr-3 lg:pl-[102px] lg:pr-[417px]">
        <Outlet />
      </main>

      <Sidebar />
    </div>
  );
}
