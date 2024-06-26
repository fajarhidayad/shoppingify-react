import { Link } from '@tanstack/react-router';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h2 className="text-slate-800 font-bold text-6xl mb-5">404</h2>
      <h2 className="text-slate-800 font-semibold text-4xl mb-3">
        Sorry! Not found
      </h2>
      <p className="mb-5">The page you are looking for is not found</p>
      <Link
        to="/"
        className="bg-primary text-white font-semibold rounded-lg px-5 py-2"
      >
        Back
      </Link>
    </div>
  );
}
