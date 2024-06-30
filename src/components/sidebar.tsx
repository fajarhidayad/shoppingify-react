import CartLogo from '@/assets/cart';
import useClickOutside from '@/hooks/useClickOutside';
import { ListItem, useItemList } from '@/store/useItemList';
import clsx from 'clsx';
import { MinusIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { FormEvent, useRef } from 'react';
import BottleLogo from '../assets/bottle-logo';
import { useSidebarStore } from '../store/useSidebarStore';
import Button from './button';
import CreateItemForm from './create-item-form';
import ItemDetailsMenu from './item-details-menu';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { toast } from './ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { createList } from '@/api/list';

export default function Sidebar() {
  const { active, setListActive, setCreateActive } = useSidebarStore();
  const {
    items,
    setListName,
    name: listName,
    reset: resetList,
  } = useItemList();

  const listMutation = useMutation({ mutationFn: createList });

  function onSaveListName(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const title = data.get('title') as string;
    if (!title) {
      toast({
        title: 'Error',
        description: 'Title cannot be empty',
        variant: 'destructive',
      });
      return;
    }
    setListName(title);
    listMutation.mutate({ name: title });
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

            <ItemListContainerCart />
          </div>

          <section className="bg-white px-10 py-8">
            {!listName && (
              <form
                onSubmit={onSaveListName}
                className={clsx({
                  'flex rounded-xl border-2 overflow-hidden': true,
                  'border-gray-400': items.length < 1,
                  'border-primary': items.length >= 1,
                })}
              >
                <input
                  type="text"
                  name="title"
                  disabled={items.length < 1}
                  placeholder="Enter a list title"
                  className="px-4 py-5 flex-1 focus:outline-none bg-transparent disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={items.length < 1}
                  className="bg-primary rounded-lg text-white font-bold px-6 flex-shrink-0 disabled:bg-gray-400"
                >
                  Save
                </button>
              </form>
            )}
            {listName && (
              <div className="flex items-center justify-center space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost">cancel</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure that you want to cancel this list?
                      </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="ghost" className="py-3">
                          cancel
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          variant="danger"
                          className="py-3"
                          onClick={resetList}
                        >
                          Yes
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="secondary">Complete</Button>
              </div>
            )}
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
      <div className="relative flex-1 max-h-[calc(100vh-350px)] flex flex-col items-center justify-center">
        <p className="font-bold text-xl">No items</p>
        <div className="absolute -bottom-3">
          <CartLogo />
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="flex items-center justify-between mb-9 px-8">
        <h2 className="font-bold text-gray-800 text-2xl">Shopping list</h2>
        <PencilIcon size={24} />
      </section>
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
    </>
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
