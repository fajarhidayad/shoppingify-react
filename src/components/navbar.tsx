import { Link } from '@tanstack/react-router';
import {
  BarChart3Icon,
  HistoryIcon,
  ListIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import { ReactNode } from 'react';
import MainLogo from '../assets/main-logo';

export default function Navbar() {
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

      <div className="bg-primary p-3 rounded-full text-white">
        <ShoppingCartIcon size={20} />
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
