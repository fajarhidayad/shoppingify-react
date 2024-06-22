import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import MainLogo from '../assets/main-logo';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export const Route = createLazyFileRoute('/')({ component: HomePage });

function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col absolute inset-0 min-h-screen h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <nav
        className={clsx({
          'fixed top-0 py-5 flex items-center w-full duration-200 ease-in transition-all z-50':
            true,
          'bg-white/80 backdrop-blur': isScrolled,
        })}
      >
        <div className="container flex justify-between items-center">
          <Link to="/">
            <MainLogo />
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate({ to: '/login' })}
              className="bg-primary text-white rounded-lg px-5 py-3"
            >
              Login
            </button>
            <button
              onClick={() => navigate({ to: '/register' })}
              className="text-primary border border-primary bg-white rounded-lg px-5 py-3"
            >
              Register
            </button>
          </div>
        </div>
      </nav>
      <main className="pt-20 flex-1 flex justify-center items-center">
        <section className="py-20 container relative flex flex-col items-center text-center">
          {/* <div className="absolute bg-yellow-400/50 rounded-full blur-[100px] w-[400px] h-[300px] right-0 -z-10"></div>
          <div className="absolute bg-orange-400/50 rounded-full blur-[100px] w-[400px] h-[300px] left-0 top-[800px] -z-10"></div> */}

          <h1 className="text-7xl font-black text-slate-800 mb-10">
            Help You Never Forget
          </h1>
          <h2 className="text-6xl font-black text-primary mb-10">
            Your Shopping List
          </h2>

          <p className="text-2xl w-2/3 text-slate-600 mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea placeat,
            quis sint cum non voluptates dolor unde molestias? Hic, dolorem!
          </p>

          <div className="flex">
            <button
              onClick={() => navigate({ to: '/login' })}
              className="bg-primary text-white rounded-lg px-5 py-3 font-bold"
            >
              Get started
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white py-6 mt-auto border-t border-t-slate-100">
        <div className="text-center">
          <p className="text-slate-500">Copyright &copy; 2024</p>
        </div>
      </footer>
    </div>
  );
}
