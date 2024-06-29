import { RefObject, useEffect, useState } from 'react';

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>
) {
  const [active, setActive] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return [active, setActive] as const;
}
