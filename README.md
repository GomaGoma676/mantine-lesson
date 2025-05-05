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

function parseCsv(csvText: string): Entry[] {
  const parsed = Papa.parse<string[]>(csvText.trim(), { skipEmptyLines: true }).data;

  return parsed
    .map((row) => {
      const [user, product, hourStr] = row.map((s) => s?.trim());
      const hours = parseInt(hourStr?.replace(/[^\d]/g, '') || '');

      if (!user || !product || isNaN(hours)) {
        return null; // skip malformed row
      }

      return { user, product, hours };
    })
    .filter(Boolean) as Entry[];
}
