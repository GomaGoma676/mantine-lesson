import { useState } from 'react'
import Link from 'next/link'
import { Modal, Button, Group } from '@mantine/core'
import { ReplyIcon } from '@heroicons/react/solid'
import { Layout } from '../components/Layout'
import { AuthenForm } from '../components/AuthenForm'

const ModalDemo = () => {
  const [opened, setOpened] = useState(false)
  return (
    <Layout title="Modal">
      <Modal
        title="Authorization Form"
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <AuthenForm />
      </Modal>
      <Group direction="column" position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
        <Link href="/">
          <ReplyIcon className="mt-4 h-6 w-6 cursor-pointer text-gray-300" />
        </Link>
      </Group>
    </Layout>
  )
}

export default ModalDemo
