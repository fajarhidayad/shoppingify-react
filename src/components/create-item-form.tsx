import { Category, getCategories } from '@/api/categories';
import { CreateItem, createItem, createItemSchema } from '@/api/items';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { UseFormRegister, UseFormSetValue, useForm } from 'react-hook-form';
import ErrorText from './error-text';
import { toast } from './ui/use-toast';
import useClickOutside from '@/hooks/useClickOutside';

export default function CreateItemForm(props: { onCloseForm: () => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateItem>({
    resolver: zodResolver(createItemSchema),
  });

  const queryClient = useQueryClient();
  const itemMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  function onCreateItem(data: CreateItem) {
    itemMutation.mutate(data);
    props.onCloseForm();
    toast({ title: 'Success', description: 'Added new item' });
  }

  return (
    <form
      onSubmit={handleSubmit(onCreateItem)}
      className="px-11 py-8 flex flex-col h-full bg-white"
    >
      <h1 className="font-medium text-2xl mb-8">Add a new item</h1>
      <div className="mb-4 flex flex-col">
        <label htmlFor="name" className="font-medium text-sm mb-1.5">
          Name
        </label>
        <input
          type="text"
          {...register('name')}
          className="border-2 border-gray-300 rounded-xl py-5 px-4 focus:outline-none focus:border-primary bg-transparent"
          placeholder="Enter a name"
          autoComplete="off"
        />
        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="note" className="font-medium text-sm mb-1.5">
          Note (optional)
        </label>
        <textarea
          {...register('note')}
          className="border-2 border-gray-300 rounded-xl py-5 px-4 focus:outline-none focus:border-primary bg-transparent"
          placeholder="Enter a note"
        />
        {errors.note && <ErrorText>{errors.note.message}</ErrorText>}
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="imageUrl" className="font-medium text-sm mb-1.5">
          Image (optional)
        </label>
        <input
          type="text"
          className="border-2 border-gray-300 rounded-xl py-5 px-4 focus:outline-none focus:border-primary bg-transparent"
          {...register('imageUrl')}
          placeholder="Enter a url"
          autoComplete="off"
        />
        {errors.imageUrl && <ErrorText>{errors.imageUrl.message}</ErrorText>}
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="categoryName" className="font-medium text-sm mb-1.5">
          Category
        </label>
        {/* <input
          type="text"
          className="border-2 border-gray-300 rounded-xl py-5 px-4 focus:outline-none focus:border-primary bg-transparent"
          {...register('categoryName')}
          placeholder="Enter a category"
          autoComplete="off"
        /> */}
        <CategoryInputDropdown register={register} setValues={setValue} />
        {errors.categoryName && (
          <ErrorText>{errors.categoryName.message}</ErrorText>
        )}
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

function CategoryInputDropdown({
  register,
  setValues,
}: {
  register: UseFormRegister<CreateItem>;
  setValues: UseFormSetValue<CreateItem>;
}) {
  const [value, setValue] = useState<string>('');
  const [filteredCategories, setFilteredCategories] = useState<
    Category[] | undefined
  >([]);

  const ref = useRef<HTMLDivElement>(null);
  const [dropdown, setDropdown] = useClickOutside(ref);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  useEffect(() => {
    const filtered = categories?.filter((cat) =>
      cat.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, value]);

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        className="border-2 border-gray-300 rounded-xl py-5 px-4 focus:outline-none focus:border-primary bg-transparent w-full"
        placeholder="Enter a category"
        autoComplete="off"
        onFocus={() => {
          if (categories) {
            setDropdown(categories.length > 0);
          }
        }}
        {...register('categoryName', {
          value,
          onChange: (e) => {
            setValue(e.target.value);
          },
        })}
      />

      {dropdown && filteredCategories && filteredCategories.length > 0 && (
        <ul className="absolute w-full px-3 py-2 rounded-lg border bg-white max-h-[150px] translate-y-2">
          {filteredCategories?.map((category) => (
            <li
              key={category.id}
              onClick={() => {
                setValues('categoryName', category.name);
                setDropdown(false);
              }}
              className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
