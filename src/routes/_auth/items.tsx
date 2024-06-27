import { getItems } from '@/api/items';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { PlusIcon, SearchIcon } from 'lucide-react';

export const Route = createFileRoute('/_auth/items')({
  component: () => <ItemsPage />,
});

function ItemsPage() {
  const setItemDetails = useSidebarStore((state) => state.setDetailsActive);
  const { data: items } = useQuery({
    queryKey: ['items'],
    queryFn: getItems,
  });

  return (
    <>
      <section className="flex justify-between mb-14 items-start">
        <h1 className="font-medium text-[26px] leading-8 text-gray-800 w-1/2">
          <span className="text-primary font-bold">Shoppingify</span> allows you
          to take your shopping list wherever you go
        </h1>

        <div className="flex bg-white px-4 py-3 rounded-xl shadow-md items-center space-x-5">
          <SearchIcon size={26} />
          <input
            type="text"
            placeholder="search item"
            className="focus:outline-none flex-1"
          />
        </div>
      </section>

      <section className="mb-11">
        <h3 className="text-lg font-medium mb-4">Fruit and vegetables</h3>
        <ul className="grid grid-cols-4 gap-x-5 gap-y-6 mb-11">
          {items?.map((item) => (
            <li
              key={item.id}
              onClick={() => setItemDetails(item)}
              className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:cursor-pointer"
            >
              <p className="font-medium">{item.name}</p>
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:bg-gray-100 hover:text-primary p-1 rounded-full"
              >
                <PlusIcon size={24} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
