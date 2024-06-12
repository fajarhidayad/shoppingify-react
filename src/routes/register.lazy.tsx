import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { FormEvent } from 'react';

export const Route = createLazyFileRoute('/register')({
  component: () => <RegisterPage />,
});

function RegisterPage() {
  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-orange-50">
      <h1 className="font-bold text-3xl mb-5 text-slate-800">Shoppingify</h1>
      <form
        onSubmit={onSubmitForm}
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
            name="name"
            className="border-2 border-slate-700 px-5 py-3 rounded-xl focus:outline-primary"
          />
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
            name="email"
            className="border-2 border-slate-700 px-5 py-3 rounded-xl focus:outline-primary"
          />
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
            name="password"
            className="border-2 border-slate-700 px-5 py-3 rounded-xl focus:outline-primary"
          />
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
