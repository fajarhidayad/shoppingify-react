import { createLazyFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const Route = createLazyFileRoute('/_auth/statistics')({
  component: () => <StatisticPage />,
});

const data = [
  { name: 'January', total: 35 },
  { name: 'February', total: 120 },
  { name: 'March', total: 35 },
  { name: 'April', total: 10 },
  { name: 'May', total: 65 },
  { name: 'June', total: 29 },
  { name: 'July', total: 95 },
];

function StatisticPage() {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-12">
        <div>
          <h1 className="text-2xl font-medium mb-8">Top items</h1>
          <ItemPercentage name="Banana" total={23} type="primary" />
          <ItemPercentage name="Rice" total={17} type="primary" />
          <ItemPercentage name="Meat" total={8} type="primary" />
        </div>
        <div>
          <h1 className="text-2xl font-medium mb-8">Top categories</h1>
          <ItemPercentage
            name="Fruit and vegetables"
            total={37}
            type="secondary"
          />
          <ItemPercentage name="Meat and fish" total={14} type="secondary" />
          <ItemPercentage name="Beverages" total={10} type="secondary" />
        </div>
      </section>

      <section>
        <h1 className="text-2xl font-medium mb-10">Monthly Summary</h1>
        <ResponsiveContainer width={'100%'} height={300}>
          <LineChart
            width={600}
            height={300}
            data={data}
            className="w-full"
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="total" stroke="#F9A109" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </>
  );
}

function ItemPercentage(props: {
  name: string;
  total: number;
  type: 'primary' | 'secondary';
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3.5">
        <p>{props.name}</p>
        <p>{props.total}%</p>
      </div>
      <div className="bg-gray-300 rounded-full h-1.5">
        <div
          className={clsx({
            'h-full rounded-full': true,
            'bg-primary': props.type === 'primary',
            'bg-lblue': props.type === 'secondary',
          })}
          style={{ width: `${props.total}%` }}
        ></div>
      </div>
    </div>
  );
}
