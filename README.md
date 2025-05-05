## Getting Started
~~~
npx create-next-app@12.3.2 mantine-lesson --ts
yarn add next@12.3.2
~~~
~~~
yarn add -D tailwindcss postcss autoprefixer
yarn add -D prettier prettier-plugin-tailwindcss
npx tailwindcss init -p
~~~
~~~
yarn add dayjs @mantine/core@4.2.5 @mantine/hooks@4.2.5 @mantine/form@4.2.5 @mantine/dates@4.2.5 @mantine/next@4.2.5 tabler-icons-react
yarn add @supabase/supabase-js@1.33.3 react-query@4.0.0-beta.10 @heroicons/react@1.0.6 date-fns yup axios zustand
yarn add @mantine/notifications@4.2.5
~~~
https://tailwindcss.com/docs/guides/nextjs


// app/page.tsx
import { fetchCsvFromS3 } from './actions/fetchCsv';
import Papa from 'papaparse';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Entry = {
  user: string;
  product: string;
  hours: number;
};

function parseCsv(csvText: string): Entry[] {
  const parsed = Papa.parse<string[]>(csvText.trim(), { skipEmptyLines: true }).data;

  return parsed.map(([user, product, hourStr]) => ({
    user,
    product,
    hours: parseInt(hourStr.replace(/[^\d]/g, '')),
  }));
}

function groupBy<T, K extends keyof any>(arr: T[], key: (item: T) => K): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const groupKey = key(item);
    acc[groupKey] = acc[groupKey] || [];
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

export default async function Page() {
  const csvText = await fetchCsvFromS3();
  const entries = parseCsv(csvText);

  const byUser = groupBy(entries, (e) => e.user);
  const byProduct = groupBy(entries, (e) => e.product);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">CSV Time Report</h1>

      {/* Per User */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Per User</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(byUser).map(([user, items]) => (
            <Card key={user}>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-2">{user}</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={items}>
                    <XAxis dataKey="product" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Per Product */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Per Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(byProduct).map(([product, items]) => (
            <Card key={product}>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-2">{product}</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={items}>
                    <XAxis dataKey="user" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
