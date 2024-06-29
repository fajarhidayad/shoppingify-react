import { useSidebarStore } from '@/store/useSidebarStore';

export default function ItemDetailsMenu(props: { onCloseDetails: () => void }) {
  const item = useSidebarStore((state) => state.itemDetails);

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
        <button className="hover:bg-gray-100 font-bold rounded-xl p-5">
          delete
        </button>
        <button className="text-white bg-primary font-bold rounded-xl p-5">
          Add to list
        </button>
      </div>
    </div>
  );
}
