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

'use client';

import { useEffect, useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import Papa from 'papaparse';

type Entry = {
  user: string;
  product: string;
  hours: number;
};

// Example CSV. Replace this with fetch from S3 or props
const exampleCsv = `user1,productA,100hour
user1,productB,150hour
user2,productA,50hour
user3,productC,80hour`;

export default function Page() {
  const [data, setData] = useState<Entry[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');

  useEffect(() => {
    const parsed = Papa.parse<string[]>(exampleCsv.trim(), { skipEmptyLines: true }).data;
    const entries: Entry[] = [];

    parsed.forEach(([user, product, hourStr]) => {
      const hours = parseInt(hourStr.replace(/[^\d]/g, ''));
      if (user && product && !isNaN(hours)) {
        entries.push({ user: user.trim(), product: product.trim(), hours });
      }
    });

    setData(entries);

    const uniqueUsers = [...new Set(entries.map((e) => e.user))];
    setUsers(uniqueUsers);
    setSelectedUser(uniqueUsers[0]); // default select
  }, []);

  const filtered = data.filter((e) => e.user === selectedUser);
  const maxHour = Math.max(...filtered.map((e) => e.hours), 1);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Time Report</h1>

      <div className="max-w-sm">
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger>
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user} value={user}>
                {user}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filtered.map(({ product, hours }, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span>{product}</span>
              <span>{hours}h</span>
            </div>
            <div className="bg-gray-200 h-4 rounded overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded"
                style={{ width: `${(hours / maxHour) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
