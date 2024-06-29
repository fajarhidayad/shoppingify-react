import CartLogo from '@/assets/cart';
import useClickOutside from '@/hooks/useClickOutside';
import { ListItem, useItemList } from '@/store/useItemList';
import clsx from 'clsx';
import { MinusIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { FormEvent, useRef } from 'react';
import BottleLogo from '../assets/bottle-logo';
import { useSidebarStore } from '../store/useSidebarStore';
import CreateItemForm from './create-item-form';
import ItemDetailsMenu from './item-details-menu';

export default function Sidebar() {
  const { active, setListActive, setCreateActive } = useSidebarStore();

  function onSaveListName(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <aside className="w-[389px] fixed right-0 h-full hidden md:block">
      {active === 'details' && (
        <ItemDetailsMenu onCloseDetails={setListActive} />
      )}
      {active === 'create' && <CreateItemForm onCloseForm={setListActive} />}
      {active === 'lists' && (
        <div className="bg-[#FFF0DE] flex flex-col h-full">
          <div className="pt-11 flex-1 flex flex-col">
            <section className="bg-[#80485B] rounded-3xl px-7 py-4 flex mb-9 mx-8">
              <div className="relative w-[100px]">
                <BottleLogo className="absolute -top-9 -left-5 object-cover" />
              </div>
              <div className="space-y-3">
                <h2 className="font-bold text-white">
                  Didn’t find what you need?
                </h2>
                <button
                  onClick={setCreateActive}
                  className="bg-white rounded-xl px-7 py-3 text-sm font-bold"
                >
                  Add item
                </button>
              </div>
            </section>

            <section className="flex items-center justify-between mb-9 px-8">
              <h2 className="font-bold text-gray-800 text-2xl">
                Shopping list
              </h2>
              <PencilIcon size={24} />
            </section>

            <ItemListContainerCart />
          </div>

          <section className="bg-white px-10 py-8">
            <form
              onSubmit={onSaveListName}
              className="flex rounded-xl border-2 border-primary overflow-hidden"
            >
              <input
                type="text"
                placeholder="Enter a list title"
                className="px-4 py-5 flex-1 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="bg-primary rounded-lg text-white font-bold px-6 flex-shrink-0"
              >
                Save
              </button>
            </form>
          </section>
        </div>
      )}
    </aside>
  );
}

function ItemListContainerCart() {
  const { items, removeItem, setQuantity } = useItemList();

  if (items.length < 1) {
    return (
      <div className="relative flex-1 max-h-[calc(100vh-440px)] flex flex-col items-center justify-center">
        <p className="font-bold text-xl">No items</p>
        <div className="absolute -bottom-8">
          <CartLogo />
        </div>
      </div>
    );
  }

  return (
    <ul className="flex-1 overflow-y-auto px-8 space-y-8 max-h-[calc(100vh-440px)]">
      <li>
        {/* <h4 className="text-sm font-medium text-gray-500 mb-5">
          Fruit and vegetables
        </h4> */}
        <ul className="space-y-4">
          {items.map((item) => (
            <ListCartItem
              key={item.id}
              item={item}
              onRemoveItem={() => removeItem(item.id)}
              onIncrease={() =>
                setQuantity(
                  item.id,
                  item.quantity + 1 === 0 ? item.quantity : item.quantity + 1
                )
              }
              onDecrease={() =>
                setQuantity(
                  item.id,
                  item.quantity - 1 === 0 ? item.quantity : item.quantity - 1
                )
              }
            />
          ))}
        </ul>
      </li>
    </ul>
  );
}

const ListCartItem = (props: {
  item: ListItem;
  onRemoveItem: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}) => {
  const ref = useRef(null);
  const [menu, setMenu] = useClickOutside(ref);

  return (
    <li
      ref={ref}
      key={props.item.id}
      className="flex justify-between items-center"
    >
      <p className="text-lg font-medium">{props.item.name}</p>
      <div
        className={clsx({
          'flex items-center': true,
          'bg-white rounded-xl': menu,
        })}
      >
        {menu && (
          <button
            onClick={props.onRemoveItem}
            className="bg-primary text-white px-2.5 rounded-xl self-stretch"
          >
            <TrashIcon size={18} />
          </button>
        )}
        <div className="flex items-center py-1.5">
          {menu && (
            <button onClick={props.onDecrease} className="text-primary px-2">
              <MinusIcon size={20} />
            </button>
          )}
          <button
            onClick={() => setMenu(true)}
            className="border-2 border-primary rounded-full px-4 py-2 text-xs font-bold text-primary"
          >
            {props.item.quantity} pcs
          </button>
          {menu && (
            <button onClick={props.onIncrease} className="text-primary px-2">
              <PlusIcon size={20} />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};
