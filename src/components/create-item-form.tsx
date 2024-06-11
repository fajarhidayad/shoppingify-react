export default function CreateItemForm(props: { onCloseForm: () => void }) {
  return (
    <form className="px-11 py-8 flex flex-col h-full bg-white">
      <h1 className="font-medium text-2xl mb-8">Add a new item</h1>
      <div className="mb-4 flex flex-col">
        <label htmlFor="name" className="font-medium text-sm mb-1.5">
          Name
        </label>
        <input
          type="text"
          className="border-2 border-gray-300 rounded-xl py-5 px-4 focus:outline-none focus:border-primary bg-transparent"
          name="name"
          placeholder="Enter a name"
          autoComplete="off"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="note" className="font-medium text-sm mb-1.5">
          Note (optional)
        </label>
        <textarea
          className="border-2 border-gray-300 rounded-xl py-5 px-4 focus:outline-none focus:border-primary bg-transparent"
          name="note"
          placeholder="Enter a note"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="imageUrl" className="font-medium text-sm mb-1.5">
          Image (optional)
        </label>
        <input
          type="text"
          className="border-2 border-gray-300 rounded-xl py-5 px-4 focus:outline-none focus:border-primary bg-transparent"
          name="imageUrl"
          placeholder="Enter a url"
          autoComplete="off"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="category" className="font-medium text-sm mb-1.5">
          Category
        </label>
        <input
          type="text"
          className="border-2 border-gray-300 rounded-xl py-5 px-4 focus:outline-none focus:border-primary bg-transparent"
          name="category"
          placeholder="Enter a category"
          autoComplete="off"
        />
      </div>

      <div className="flex items-center justify-center space-x-4 mt-auto">
        <button
          onClick={props.onCloseForm}
          className="hover:bg-gray-100 font-bold rounded-xl p-5"
        >
          cancel
        </button>
        <button
          type="submit"
          className="text-white bg-primary font-bold rounded-xl p-5"
        >
          Save
        </button>
      </div>
    </form>
  );
}
