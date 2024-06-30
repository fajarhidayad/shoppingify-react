import { getAllLists } from '@/api/list';
import Card from '@/components/card';
import { formatDate } from '@/utils/format-date';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { CalendarDaysIcon, ChevronRightIcon } from 'lucide-react';

export const Route = createLazyFileRoute('/_auth/history/')({
  component: () => <HistoryPage />,
});

function HistoryPage() {
  const { data: lists } = useQuery({
    queryKey: ['list'],
    queryFn: getAllLists,
  });

  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-bold text-2xl text-slate-800 mb-10">
        Shopping history
      </h1>

      <section>
        {/* <h3 className="font-medium mb-4 text-sm">June 2024</h3> */}
        {lists?.map((list) => (
          <Card
            key={list.id}
            onClick={() =>
              navigate({
                to: '/history/$id',
                params: { id: list.id.toString() },
              })
            }
            className="flex items-center justify-between py-5 mb-7 cursor-pointer"
          >
            <p className="font-medium">{list.name}</p>
            <div className="flex items-center">
              <div className="hidden sm:flex items-center text-gray-400 font-medium text-xs space-x-2.5 mr-6">
                <CalendarDaysIcon size={24} />
                <p>{formatDate(list.createdAt)}</p>
              </div>
              <p className="border border-lblue rounded-lg text-xs text-lblue px-2 py-1 mr-2 sm:mr-8">
                {list.status.toLowerCase()}
              </p>
              <ChevronRightIcon className="text-primary" />
            </div>
          </Card>
        ))}
      </section>
    </>
  );
}
