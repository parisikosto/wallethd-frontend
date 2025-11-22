import type { ComponentProps, JSX } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Spinner,
} from '@/ui';
import { cn } from '@/utils';

import { useLogin } from '../../queries';

const defaultValues = {
  email: '',
  password: '',
};

const validationSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(32, { message: 'Password must be at most 32 characters long' }),
});

type LoginFormSchemaType = z.infer<typeof validationSchema>;

export const LoginForm = ({
  className,
  ...props
}: ComponentProps<'form'>): JSX.Element => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<LoginFormSchemaType>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const { isPendingLogin, login } = useLogin();

  const onSubmit: SubmitHandler<LoginFormSchemaType> = (data) => {
    const { email, password } = data;

    if (!email || !password) {
      return;
    }

    login(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
      },
    );
  };

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...register('email')}
            type="email"
            required
            disabled={isPendingLogin}
          />
          {errors.email?.message && (
            <FieldError>{errors.email.message}</FieldError>
          )}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input
            {...register('password')}
            type="password"
            required
            disabled={isPendingLogin}
          />
          {errors.password?.message && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>
        <Field>
          {isPendingLogin ? (
            <Button disabled>
              <Spinner />
              Logging in...
            </Button>
          ) : (
            <Button type="submit">Login</Button>
          )}
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};
