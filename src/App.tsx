import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function Main() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </QueryClientProvider>
  );
}
