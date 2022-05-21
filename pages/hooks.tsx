import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ReplyIcon } from '@heroicons/react/solid'
import { BrandGithub } from 'tabler-icons-react'
import {
  Dialog,
  Group,
  Button,
  TextInput,
  Text,
  Avatar,
  Indicator,
  Paper,
  Loader,
  Code,
  Progress,
  Grid,
  Center,
} from '@mantine/core'
import { Layout } from '../components/Layout'
import {
  useDisclosure,
  useToggle,
  useInterval,
  useHover,
  useIdle,
  useMove,
} from '@mantine/hooks'

const MantineHooks = () => {
  const [opened, handlers] = useDisclosure(false, {
    onOpen: () => console.log('Opened'),
    onClose: () => console.log('Closed'),
  })
  const [btnColor, toggleBtnColor] = useToggle('yellow', ['yellow', 'violet'])
  const [seconds, setSeconds] = useState(0)
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000)
  const { hovered, ref: refHover } = useHover()
  const idle = useIdle(3000)
  const [currentPos, setCurrentPos] = useState({ x: 0.2, y: 0.6 })
  const { ref: refPosition, active } = useMove(setCurrentPos)

  useEffect(() => {
    interval.start()
    return interval.stop
  }, [])

  return (
    <Layout title="Hooks">
      <Group position="center" direction="column">
        <Text>
          This page is active <strong>{seconds}</strong> [s] after mount
        </Text>
        <Button
          compact
          onClick={interval.toggle}
          color={interval.active ? 'red' : 'teal'}
          variant="light"
        >
          {interval.active ? 'Suspend' : 'Activate'}
        </Button>
      </Group>
      <Group my="xl" direction="column" position="center">
        <Paper
          my="md"
          p="md"
          className={`h-40 w-40 cursor-pointer ${
            hovered ? 'bg-indigo-500' : 'bg-orange-500'
          }`}
          ref={refHover}
        ></Paper>
        <Indicator
          size={16}
          offset={7}
          position="bottom-end"
          color={idle ? 'yellow' : 'green'}
          withBorder
        >
          <Avatar
            size="lg"
            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/0.3592605268445861.png`}
          />
        </Indicator>
      </Group>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={() => handlers.close()}
        size="lg"
        radius="md"
      >
        <Text size="sm" mb="md">
          Subscribe to email newsletter
        </Text>
        <Group>
          <TextInput placeholder="xxx@gmail.com" className="flex-1" />
          <Button onClick={() => handlers.close()}>Subscribe</Button>
        </Group>
      </Dialog>
      <Group direction="column" position="center">
        <Button compact onClick={() => handlers.toggle()}>
          Toggle dialog
        </Button>
        <Button color="cyan" compact onClick={() => handlers.open()}>
          Open dialog
        </Button>
        <Button color="orange" compact onClick={() => handlers.close()}>
          Close dialog
        </Button>
        <Button color={btnColor} compact onClick={() => toggleBtnColor()}>
          Toggle color
        </Button>
      </Group>
      <Grid my="xl">
        <Grid.Col span={6}>
          <Group direction="column" position="center">
            <div ref={refPosition} className="relative h-48 w-96 bg-gray-700">
              <BrandGithub
                className="absolute h-6 w-6 cursor-pointer text-pink-700"
                style={{
                  left: `calc(${currentPos.x * 100}% - 12px)`,
                  top: `calc(${currentPos.y * 100}% - 12px)`,
                }}
              />
            </div>
            <Text>
              <Code>{`{ x: ${Math.round(currentPos.x * 100)}, y: ${Math.round(
                currentPos.y * 100
              )} }`}</Code>
            </Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group direction="column" position="center">
            <Progress
              my="md"
              className="w-80"
              color="teal"
              radius="lg"
              value={currentPos.x * 100}
              animate
            />
            <Progress
              className="w-80"
              color="indigo"
              radius="lg"
              value={currentPos.y * 100}
              animate
            />
            {active && <Loader my="md" variant="bars" />}
          </Group>
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

export default MantineHooks
