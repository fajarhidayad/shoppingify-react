import { Link, useNavigate } from '@tanstack/react-router';
import {
  BarChart3Icon,
  HistoryIcon,
  ListIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import { ReactNode } from 'react';
import MainLogo from '../assets/main-logo';
import { useAuth } from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { logoutFn } from '@/api/auth';
import { useItemList } from '@/store/useItemList';

export default function Navbar() {
  const { logout } = useAuth();
  const { items } = useItemList();
  const navigate = useNavigate();

  const logoutMut = useMutation({
    mutationFn: logoutFn,
    onSuccess() {
      logout();
      navigate({ to: '/', replace: true });
    },
  });

  return (
    <nav className="fixed left-0 h-screen bg-white shadow py-12 flex flex-col justify-between items-center">
      <Link to="/">
        <MainLogo />
      </Link>

      <div className="space-y-10">
        <NavLink to="/items">
          <ListIcon size={26} />
        </NavLink>
        <NavLink to="/history">
          <HistoryIcon size={26} />
        </NavLink>
        <NavLink to="/statistics">
          <BarChart3Icon size={26} />
        </NavLink>
      </div>

      <div>
        <div className="bg-primary p-3 rounded-full text-white relative">
          <ShoppingCartIcon size={20} />
          <div className="absolute bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center -right-1 -top-1">
            {items.length}
          </div>
        </div>
        {/* <button onClick={() => logoutMut.mutate()}>Logout</button> */}
      </div>
    </nav>
  );
}

function NavLink(props: { to: string; children: ReactNode }) {
  return (
    <Link
      to={props.to}
      className="navlink"
      activeProps={{ className: 'navlink-selected' }}
    >
      {props.children}
    </Link>
  );
}
