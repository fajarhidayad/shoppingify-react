import { useMutation } from '@tanstack/react-query';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { login, loginSchema, type LoginParams } from '@/api/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const Route = createLazyFileRoute('/login')({
  component: () => <LoginPage />,
});

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({ resolver: zodResolver(loginSchema) });

  const loginMutation = useMutation({ mutationFn: login });

  const onSubmitForm = (data: LoginParams) => {
    console.log(data);
    if (data.email && data.password) {
      loginMutation.mutate(data);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-orange-50">
      <h1 className="font-bold text-3xl mb-5 text-slate-800">Shoppingify</h1>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="bg-white rounded-xl px-10 py-7 shadow sm:w-[450px] flex flex-col"
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
            className="border-2 border-slate-700 px-5 py-3 rounded-xl"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
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
            className="border-2 border-slate-700 px-5 py-3 rounded-xl"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-white rounded-xl py-4 font-bold mb-3"
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
