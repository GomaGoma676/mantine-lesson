import { useState } from 'react'
import * as Yup from 'yup'
import { useForm, yupResolver } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  Paper,
  LoadingOverlay,
  Anchor,
} from '@mantine/core'
import { AuthForm } from '../types'

const schema = Yup.object().shape({
  firstName: Yup.string().required('No first name provided'),
  lastName: Yup.string().required('No last name provided'),
  email: Yup.string().email('Invalid email').required('No email provided.'),
  password: Yup.string()
    .required('No password provided.')
    .min(6, 'Password should be min 6 chars'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
  termsOfService: Yup.boolean().required(),
})

export const AuthenForm = () => {
  const [loading, setLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(true)
  const toggleAuthMode = () => {
    setIsRegister(!isRegister)
  }
  const form = useForm<AuthForm>({
    schema: yupResolver(schema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsOfService: true,
    },
  })
  const handleSubmit = (values: AuthForm) => {
    console.log(values)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      form.reset()
    }, 3000)
  }
  return (
    <Paper>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} />
        {isRegister && (
          <Group grow>
            <TextInput
              data-autofocus
              placeholder="Your first name"
              label="First name"
              {...form.getInputProps('firstName')}
            />
            <TextInput
              placeholder="Your last name"
              label="Last name"
              {...form.getInputProps('lastName')}
            />
          </Group>
        )}
        <TextInput
          mt="md"
          placeholder="Your email"
          label="Email"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt="md"
          placeholder="Password"
          label="Password"
          {...form.getInputProps('password')}
        />
        {isRegister && (
          <PasswordInput
            mt="md"
            label="Confirm Password"
            placeholder="Confirm password"
            {...form.getInputProps('confirmPassword')}
          />
        )}
        {isRegister && (
          <Checkbox
            mt="xl"
            label="I agree to the terms and conditions"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />
        )}
        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={toggleAuthMode}
            size="sm"
          >
            {isRegister
              ? 'Have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button color="blue" type="submit">
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
