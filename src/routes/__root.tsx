import { Toaster } from '@/components/ui/toaster';
import { AuthContextProps } from '@/hooks/useAuth';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

interface RouterContext {
  auth: AuthContextProps | undefined;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
