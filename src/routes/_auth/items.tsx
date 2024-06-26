import { Item, getItems, searchItems } from '@/api/items';
import { useItemList } from '@/store/useItemList';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { PlusIcon, SearchIcon } from 'lucide-react';
import React, { FormEvent, useState } from 'react';

export const Route = createFileRoute('/_auth/items')({
  component: () => <ItemsPage />,
  validateSearch(search) {
    return {
      item: search.item as string,
    };
  },
  loaderDeps: ({ search: { item } }) => ({ item }),
  loader: ({ deps }) => {
    if (deps.item) {
      const items = searchItems(deps.item);
      return items;
    }
  },
});

function ItemsPage() {
  const [search, setSearch] = useState('');
  const setItemDetails = useSidebarStore((state) => state.setDetailsActive);
  const { addItem } = useItemList();
  const navigate = useNavigate();

  const searchItems = Route.useLoaderData();

  const { data: categories } = useQuery({
    queryKey: ['items'],
    queryFn: getItems,
  });

  function addItemTolist(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newItem: Item
  ) {
    e.stopPropagation();
    addItem({ id: newItem.id, name: newItem.name, quantity: 1 });
  }

  function onSubmitSearch(e: FormEvent) {
    e.preventDefault();
    if (!search) return;
    navigate({ to: '/items', search: { item: search } });
  }

  return (
    <>
      <section className="hidden lg:flex justify-between mb-14 items-start">
        <h1 className="font-medium text-[26px] leading-8 text-gray-800 w-1/2">
          <span className="text-primary font-bold">Shoppingify</span> allows you
          to take your shopping list wherever you go
        </h1>

        <form
          onSubmit={onSubmitSearch}
          className="flex bg-white px-4 py-3 rounded-xl shadow-md items-center space-x-5"
        >
          <SearchIcon size={26} />
          <input
            type="text"
            placeholder="search item"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="focus:outline-none flex-1"
          />
        </form>
      </section>

      {!searchItems &&
        categories?.map((category) => (
          <section key={category.id} className="mb-11">
            <h3 className="text-lg font-medium mb-4">{category.name}</h3>
            <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-x-5 md:gap-y-6 mb-11">
              {category.items?.map((item) => (
                <li
                  key={item.id}
                  onClick={() =>
                    setItemDetails({ ...item, categoryName: category.name })
                  }
                  className="bg-white rounded-xl shadow px-4 py-3 flex items-center justify-between hover:cursor-pointer"
                >
                  <p className="font-medium">{item.name}</p>
                  <button
                    onClick={(e) => addItemTolist(e, item)}
                    className="text-gray-400 hover:bg-gray-100 hover:text-primary p-1 rounded-full"
                  >
                    <PlusIcon size={24} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      {searchItems && (
        <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-x-5 md:gap-y-6 mb-11">
          {searchItems.map((item) => (
            <li
              key={item.id}
              onClick={() =>
                // @ts-expect-error err
                setItemDetails({ ...item, categoryName: item.category.name })
              }
              className="bg-white rounded-xl shadow px-4 py-3 flex items-center justify-between hover:cursor-pointer"
            >
              <p className="font-medium">{item.name}</p>
              <button
                onClick={(e) => addItemTolist(e, item)}
                className="text-gray-400 hover:bg-gray-100 hover:text-primary p-1 rounded-full"
              >
                <PlusIcon size={24} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
