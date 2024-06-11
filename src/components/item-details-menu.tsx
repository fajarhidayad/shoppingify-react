export default function ItemDetailsMenu(props: { onCloseDetails: () => void }) {
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

      <div className="h-52 bg-gray-200 rounded-3xl mb-12"></div>

      <div className="font-medium mb-8">
        <p className="text-xs text-gray-400 mb-3">name</p>
        <p className="text-2xl">Avocado</p>
      </div>
      <div className="font-medium mb-8">
        <p className="text-xs text-gray-400 mb-3">category</p>
        <p className="text-lg">Fruit and vegetables</p>
      </div>
      <div className="font-medium mb-8">
        <p className="text-xs text-gray-400 mb-3">note</p>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
          placeat fugit quidem voluptates harum dicta? Consequuntur inventore
          explicabo optio aliquid perferendis ad accusamus quisquam dolores,
          tempora quis aliquam sed quia?
        </p>
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
