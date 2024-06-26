import { login as loginApi, loginSchema, type LoginParams } from '@/api/auth';
import ErrorText from '@/components/error-text';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
  Link,
  Navigate,
  createLazyFileRoute,
  useNavigate,
} from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

export const Route = createLazyFileRoute('/login')({
  component: () => <LoginPage />,
});

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({ resolver: zodResolver(loginSchema) });
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutate: mutateLogin } = useMutation({ mutationFn: loginApi });

  const onSubmitForm = (data: LoginParams) => {
    if (data.email && data.password) {
      mutateLogin(data, {
        onSuccess(data) {
          login(data);
          navigate({ to: '/items' });
        },
        onError(err) {
          toast({
            title: err.message,
            variant: 'destructive',
          });
        },
      });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/items" replace />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-orange-50 px-5 sm:px-0">
      <h1 className="font-bold text-3xl mb-5 text-slate-800">Shoppingify</h1>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="bg-white rounded-xl p-5 md:px-10 md:py-7 w-full sm:w-[500px] shadow flex flex-col"
      >
        <h2 className="font-bold text-xl mb-5 text-slate-800">Sign in</h2>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-slate-700 mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            {...register('email')}
            className="border-2 border-slate-300 px-5 py-3 rounded-xl focus:outline-primary"
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-slate-700 mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            {...register('password')}
            className="border-2 border-slate-300 px-5 py-3 rounded-xl focus:outline-primary"
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </div>
        <button
          type="submit"
          className="bg-primary text-white rounded-xl py-4 font-bold mb-3 focus:outline-primary focus:outline-offset-4"
        >
          Sign in
        </button>
        <p className="text-sm text-slate-500">
          {' '}
          Don't have an account?{' '}
          <Link className="font-semibold underline" to="/register">
            Register
          </Link>
        </p>
      </form>
      {errors.root && (
        <p className="mt-2 text-sm text-red-500">{errors.root.message}</p>
      )}
    </div>
  );
}
