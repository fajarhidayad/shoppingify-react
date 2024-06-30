import { useItemList } from '@/store/useItemList';
import { useSidebarStore } from '@/store/useSidebarStore';
import { toast } from './ui/use-toast';
import Button from './button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem } from '@/api/items';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export default function ItemDetailsMenu(props: { onCloseDetails: () => void }) {
  const { itemDetails: item, setListActive } = useSidebarStore();
  const { addItem } = useItemList();

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  function onDeleteItem() {
    deleteMutation.mutate(item!.id);
    setListActive();
    toast({ title: 'Sucessfully delete item' });
  }

  return (
    <div className="pt-7 pb-8 h-full px-11 bg-white flex flex-col">
      <div className="mb-8">
        <button
          onClick={props.onCloseDetails}
          className="text-primary font-bold text-sm hover:underline"
        >
          &larr; back
        </button>
      </div>

      <div className="h-52 bg-gray-200 rounded-3xl mb-12 flex items-center justify-center">
        <p className="text-sm font-semibold text-gray-500">No image</p>
      </div>

      <div className="font-medium mb-8">
        <p className="text-xs text-gray-400 mb-3">name</p>
        <p className="text-2xl">{item?.name}</p>
      </div>
      <div className="font-medium mb-8">
        <p className="text-xs text-gray-400 mb-3">category</p>
        <p className="text-lg">{item?.categoryName}</p>
      </div>
      <div className="font-medium mb-8">
        <p className="text-xs text-gray-400 mb-3">note</p>
        <p className="text-lg">{item?.note ? item?.note : 'No description'}</p>
      </div>

      <div className="flex items-center justify-center space-x-4 mt-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" className="py-2">
                  cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={onDeleteItem}
                  variant="danger"
                  className="py-2"
                >
                  Yes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          variant="primary"
          onClick={() => {
            addItem({ id: item!.id, name: item!.name, quantity: 1 });
            toast({ title: 'Added to list' });
            setListActive();
          }}
        >
          Add to list
        </Button>
      </div>
    </div>
  );
}
