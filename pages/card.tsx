import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import {
  Grid,
  Container,
  Center,
  Button,
  TextInput,
  Loader,
  Textarea,
  Select,
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import * as Yup from 'yup'
import { ReplyIcon, CameraIcon } from '@heroicons/react/solid'
import { useQueryClient } from 'react-query'
import { Post } from '../types'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/Layout'
import { CustomCard } from '../components/CustomCard'
import { useQueryPosts } from '../hooks/useQueryPosts'

const schema = Yup.object().shape({
  title: Yup.string().required('No title provided.'),
  content: Yup.string().required('No content provided.'),
  status: Yup.string().required('No status provided.'),
})

const PostList = () => {
  const queryClient = useQueryClient()
  const { data } = useQueryPosts()
  const [isLoading, setIsLoading] = useState(false)
  const [postUrl, setPostUrl] = useState('')
  const form = useForm<Omit<Post, 'id' | 'created_at' | 'post_url'>>({
    schema: yupResolver(schema),
    initialValues: {
      title: '',
      content: '',
      status: '',
    },
  })
  const uploadPostImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error('Please select the image file')
    }
    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    setIsLoading(true)
    const { error } = await supabase.storage
      .from('posts')
      .upload(fileName, file)
    if (error) throw new Error(error.message)
    setPostUrl(fileName)
    setIsLoading(false)
  }
  const handleSubmit = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from('posts').insert({
      title: form.values.title,
      content: form.values.content,
      status: form.values.status,
      post_url: postUrl,
    })
    if (error) throw new Error(error.message)
    const cachedPosts = queryClient.getQueryData<Post[]>(['posts'])
    if (cachedPosts) {
      queryClient.setQueryData(['posts'], [...cachedPosts, data[0]])
    }
    setIsLoading(false)
    setPostUrl('')
    form.reset()
  }
  return (
    <Layout title="PostList">
      <Container className="w-96">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            mb="md"
            label="Title*"
            placeholder="New title"
            {...form.getInputProps('title')}
          />
          <Textarea
            mb="md"
            minRows={6}
            placeholder="New content"
            label="Description*"
            {...form.getInputProps('content')}
          />
          <Select
            label="Status*"
            data={['New', 'PickUp', 'Hot']}
            {...form.getInputProps('status')}
          />
          <Center>{isLoading && <Loader my="xl" />}</Center>
          <Center>
            <label htmlFor="photo">
              <CameraIcon className="my-3 h-7 w-7 cursor-pointer text-gray-500" />
            </label>
            <input
              className="hidden"
              type="file"
              id="photo"
              accept="image/*"
              onChange={(e) => uploadPostImg(e)}
            />
          </Center>
          <Center>
            <Button mb="xl" type="submit">
              New Post
            </Button>
          </Center>
        </form>
      </Container>
      <Grid>
        {data?.map((post) => (
          <Grid.Col key={post.id} span={3}>
            <CustomCard
              postUrl={
                post.post_url
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/posts/${post.post_url}`
                  : ''
              }
              title={post.title}
              status={post.status}
              content={post.content}
            />
          </Grid.Col>
        ))}
      </Grid>
      <Center>
        <Link href="/">
          <ReplyIcon className="mt-4 h-6 w-6 cursor-pointer text-gray-300" />
        </Link>
      </Center>
    </Layout>
  )
}

export default PostList
