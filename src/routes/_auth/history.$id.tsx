import { getListDetails } from '@/api/list';
import { formatDate } from '@/utils/format-date';
import { Link, createFileRoute } from '@tanstack/react-router';
import { CalendarDaysIcon } from 'lucide-react';

export const Route = createFileRoute('/_auth/history/$id')({
  component: () => <HistoryDetailsPage />,
  loader: async ({ params }) => {
    const list = await getListDetails(Number(params.id));
    return list;
  },
});

function HistoryDetailsPage() {
  const list = Route.useLoaderData();

  const date = formatDate(list.createdAt);

  return (
    <>
      <div className="mb-8">
        <Link
          to="/history"
          className="text-primary hover:underline font-bold text-sm"
        >
          &larr; back
        </Link>
      </div>

      <h1 className="font-bold text-2xl mb-4">{list.name}</h1>
      <div className="text-gray-400 flex items-center space-x-3 font-medium text-xs">
        <CalendarDaysIcon />
        <p>{date}</p>
      </div>
    </>
  );
}
