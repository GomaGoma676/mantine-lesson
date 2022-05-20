import Link from 'next/link'
import { Grid, Center } from '@mantine/core'
import { ReplyIcon } from '@heroicons/react/solid'
import { Layout } from '../components/Layout'

const GridDemo = () => {
  return (
    <Layout title="Grid">
      <Grid my="md">
        <Grid.Col
          className="bg-blue-500 text-center font-bold text-gray-100"
          span={4}
        >
          1
        </Grid.Col>
        <Grid.Col
          className="bg-green-500 text-center font-bold text-gray-100"
          span={4}
        >
          2
        </Grid.Col>
        <Grid.Col
          className="bg-pink-500 text-center font-bold text-gray-100"
          span={4}
        >
          3
        </Grid.Col>
      </Grid>
      <Grid my="md" grow>
        <Grid.Col
          className="bg-blue-500 text-center font-bold text-gray-100"
          span={6}
        >
          4
        </Grid.Col>
        <Grid.Col
          className="bg-green-500 text-center font-bold text-gray-100"
          span={6}
        >
          5
        </Grid.Col>
        <Grid.Col
          className="bg-pink-500 text-center font-bold text-gray-100"
          span={3}
        >
          6
        </Grid.Col>
        <Grid.Col
          className="bg-orange-500 text-center font-bold text-gray-100"
          span={3}
        >
          7
        </Grid.Col>
      </Grid>
      <Grid my="md">
        <Grid.Col
          className="bg-indigo-500 text-center font-bold text-gray-100"
          span={3}
        >
          8
        </Grid.Col>
        <Grid.Col
          className="bg-green-500 text-center font-bold text-gray-100"
          span={3}
        >
          9
        </Grid.Col>
        <Grid.Col
          className="bg-pink-500 text-center font-bold text-gray-100"
          span={3}
          offset={3}
        >
          10
        </Grid.Col>
      </Grid>
      <Grid my="md" justify="center" align="flex-end">
        <Grid.Col
          className="h-24 bg-blue-500 text-center font-bold text-gray-100"
          span={3}
        >
          11
        </Grid.Col>
        <Grid.Col
          className="h-36 bg-green-500 text-center font-bold text-gray-100"
          span={3}
        >
          12
        </Grid.Col>
        <Grid.Col
          className="h-12 bg-pink-500 text-center font-bold text-gray-100"
          span={3}
        >
          13
        </Grid.Col>
      </Grid>
      <Grid my="md">
        <Grid.Col
          className="bg-blue-500 text-center font-bold text-gray-100"
          md={6}
          lg={3}
        >
          14
        </Grid.Col>
        <Grid.Col
          className="bg-green-500 text-center font-bold text-gray-100"
          md={6}
          lg={3}
        >
          15
        </Grid.Col>
        <Grid.Col
          className="bg-pink-500 text-center font-bold text-gray-100"
          md={6}
          lg={3}
        >
          16
        </Grid.Col>
        <Grid.Col
          className="bg-orange-500 text-center font-bold text-gray-100"
          md={6}
          lg={3}
        >
          17
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

export default GridDemo
