import { getProfile } from '@/api/auth';
import { getActiveList } from '@/api/list';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { useItemList } from '@/store/useItemList';
import { useEffect } from 'react';

export const Route = createFileRoute('/_auth')({
  loader: async () => {
    const activeList = await getActiveList();
    return activeList;
  },
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
  const activeList = Route.useLoaderData();
  const { setListName } = useItemList();

  useEffect(() => {
    setListName(activeList.name);
  }, [activeList.name]);

  return (
    <div className="min-h-screen flex relative bg-gray-100">
      <Navbar />

      <main className="flex-1 container py-7 pl-[86px] pr-3 sm:pl-[96px] sm:pr-5  md:pl-[102px] md:pr-[417px]">
        <Outlet />
      </main>

      <Sidebar />
    </div>
  );
}
