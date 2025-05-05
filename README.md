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

// page.tsx (server component)
import { fetchCsvFromS3 } from './actions/fetchCsv';
import Papa from 'papaparse';
import TimeReport from '@/components/TimeReport';

export default async function Page() {
  const csv = await fetchCsvFromS3();
  const parsed = Papa.parse<string[]>(csv.trim(), { skipEmptyLines: true }).data;

  const entries = parsed
    .map(([user, product, hourStr]) => {
      const hours = parseFloat(hourStr?.replace(/[^\d.]/g, '') || '');
      if (!user || !product || isNaN(hours)) return null;
      return { user: user.trim(), product: product.trim(), hours };
    })
    .filter(Boolean);

  const uniqueUsers = [...new Set(entries.map((e) => e!.user))];
  const initialUser = uniqueUsers[0];

  return <TimeReport entries={entries} initialUser={initialUser} />;
}

---
// components/TimeReport.tsx
'use client';

import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type Entry = {
  user: string;
  product: string;
  hours: number;
};

type Props = {
  entries: Entry[];
  initialUser: string;
};

export default function TimeReport({ entries, initialUser }: Props) {
  const [selectedUser, setSelectedUser] = useState(initialUser);
  const users = [...new Set(entries.map((e) => e.user))];
  const filtered = entries.filter((e) => e.user === selectedUser);
  const maxHour = Math.max(...filtered.map((e) => e.hours), 1);

  return (
    <div className="space-y-6">
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
              <span>{hours.toFixed(1)}h</span>
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
    </div>
  );
}
