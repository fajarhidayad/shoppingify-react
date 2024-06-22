import { RegisterParams, registerFn, registerSchema } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const Route = createLazyFileRoute('/register')({
  component: () => <RegisterPage />,
});

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterParams>({ resolver: zodResolver(registerSchema) });

  const registerMutation = useMutation({ mutationFn: registerFn });

  const onSubmitForm = (data: RegisterParams) => {
    console.log(data);
    if (data.email && data.password) {
      registerMutation.mutate(data);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-orange-50">
      <h1 className="font-bold text-3xl mb-5 text-slate-800">Shoppingify</h1>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="bg-white rounded-xl px-10 py-7 shadow min-w-[450px] flex flex-col"
      >
        <h2 className="font-bold text-xl mb-5 text-slate-800">Sign up</h2>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-slate-700 mb-1"
          >
            Name:
          </label>
          <input
            type="text"
            {...register('name')}
            className="border-2 border-slate-300 px-5 py-3 rounded-xl focus:outline-primary"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
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
            className="border-2 border-slate-300 px-5 py-3 rounded-xl focus:outline-primary"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <button className="bg-primary text-white rounded-xl py-4 font-bold mb-3">
          Register
        </button>
        <p className="text-sm text-slate-500">
          {' '}
          Already have an account?{' '}
          <Link className="font-semibold underline" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
