import Link from 'next/link'
import { Center, Grid } from '@mantine/core'
import { ReplyIcon } from '@heroicons/react/solid'
import { Layout } from '../components/Layout'
import { FetchTodos } from '../components/FetchTodos'

const FetchData = () => {
  return (
    <Layout title="Fetch Data">
      <Grid>
        <Grid.Col span={6}>
          <FetchTodos />
        </Grid.Col>
        <Grid.Col span={6}>
          <FetchTodos />
        </Grid.Col>
      </Grid>
      <Center>
        <Link href="/">
          <ReplyIcon className="mt-4 h-6 w-6 cursor-pointer text-gray-300" />
        </Link>
      </Center>
    </Layout>
  )
}

export default FetchData
