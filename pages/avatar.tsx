import { ChangeEvent, useState, useEffect } from 'react'
import Link from 'next/link'
import { Avatar, Button, Group, Indicator, Loader } from '@mantine/core'
import { ReplyIcon, CameraIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/Layout'

const AvatarDemo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const uploadAvatarImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error('Please select the image file')
    }
    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    setIsLoading(true)
    const { error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file)
    if (error) throw new Error(error.message)
    setAvatarUrl(fileName)
    setIsLoading(false)
  }
  const upsertProfile = async () => {
    setIsLoading(true)
    const { error } = await supabase.from('profiles').upsert(
      {
        id: supabase.auth.user()?.id,
        avatar_url: avatarUrl,
      },
      {
        returning: 'minimal',
      }
    )
    if (error) throw new Error(error.message)
    setIsLoading(false)
  }
  useEffect(() => {
    const getProfile = async () => {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', supabase.auth.user()?.id)
        .single()
      if (error && status !== 406) {
        throw new Error(error.message)
      }
      if (data) {
        setAvatarUrl(data.avatar_url)
      }
    }
    getProfile()
  }, [])
  return (
    <Layout title="Profile">
      <Group direction="column" position="center">
        {isLoading && <Loader />}
        {avatarUrl && (
          <Indicator
            label=""
            size={16}
            offset={7}
            position="bottom-end"
            color="green"
            withBorder
          >
            <Avatar
              size="lg"
              src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/${avatarUrl}`}
            />
          </Indicator>
        )}

        <label htmlFor="avatar">
          <CameraIcon className="my-3 h-7 w-7 cursor-pointer text-gray-500" />
        </label>
        <input
          className="hidden"
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => uploadAvatarImg(e)}
        />
        <Button onClick={upsertProfile}>Upsert</Button>
        <Link href="/">
          <ReplyIcon className="mt-4 h-6 w-6 cursor-pointer text-gray-300" />
        </Link>
      </Group>
    </Layout>
  )
}

export default AvatarDemo
