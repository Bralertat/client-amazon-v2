import Heading from '@/components/UI/Heading'
import Meta from '@/components/UI/Meta'
import Button from '@/components/UI/button/Button'
import Field from '@/components/UI/input/Field'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { IEmailPassword } from '@/store/user/user.interface'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validEmail } from './valid-email'
import Loader from '@/components/UI/Loader'
import { useAuthRedirect } from './useAuthRedirect'

const Auth: FC = () => {
  useAuthRedirect()
  const { isLoading } = useAuth()
  const { login, register } = useActions()
  const [type, setType] = useState<'login' | 'register'>('login')
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IEmailPassword>({
    mode: 'onChange'
  })
  const onSubmit: SubmitHandler<IEmailPassword> = data => {
    if (type === 'login') login(data)
    else register(data)

    reset()
  }
  return (
    <Meta title='Auth'>
      <section className='flex h-screen'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='rounded-lg bg-white shadow-sm p-8 m-auto'
        >
          <Heading className='capitalize text-center mb-4'>{type}</Heading>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Field
                {...formRegister('email', {
                  required: 'Email is required',
                  pattern: {
                    value: validEmail,
                    message: 'Please enter a valid Email address'
                  }
                })}
                placeholder='Email'
                error={errors.email?.message}
              />
              <Field
                {...formRegister('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Min length 6 symbols'
                  }
                })}
                type='password'
                placeholder='Password'
                error={errors.password?.message}
              />
              <Button type='submit' variant='orange'>
                Let's go
              </Button>

              <div>
                <button
                  type='button'
                  className='inline-block opacity-50 mt-3'
                  onClick={() =>
                    setType(type === 'login' ? 'register' : 'login')
                  }
                >
                  {type === 'login' ? 'Register' : 'Login'}
                </button>
              </div>
            </>
          )}
        </form>
      </section>
    </Meta>
  )
}
export default Auth
