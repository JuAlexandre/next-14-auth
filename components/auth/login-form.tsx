'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoginSchema } from '@/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { DEFAULT_REDIRECT } from '@/routes';
import { useSearchParams } from 'next/navigation';
import { FormError } from '@/components/form-error';

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError: string | null =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Account not linked, please sign in with the same provider you used to sign up'
      : null;

  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '' },
  });

  const isPending: boolean = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof LoginSchema>): Promise<void> => {
    try {
      await signIn('resend', {
        email: data.email,
        callbackUrl: DEFAULT_REDIRECT,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = async (provider: 'google' | 'github'): Promise<void> => {
    await signIn(provider, {
      callbackUrl: DEFAULT_REDIRECT,
    });
  };

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Please enter your email address to sign in
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormError message={urlError} />
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="name@email.com"
                      disabled={isPending}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Sign in with email'
              )}
            </Button>
          </form>
        </Form>

        <div className="w-full flex items-center space-x-2">
          <div className="h-[1px] w-full border"></div>
          <span className="flex-1">or</span>
          <div className="h-[1px] w-full border"></div>
        </div>

        <Button
          className="w-full space-x-2 flex"
          variant="outline"
          onClick={async () => {
            setIsGoogleLoading(true);
            await onClick('google');
          }}
          disabled={isPending}
        >
          {isGoogleLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <FcGoogle className="w-5 h-5" />
              <span>Sign in with Google</span>
            </>
          )}
        </Button>
        <Button
          className="w-full space-x-2 flex"
          variant="outline"
          onClick={async () => {
            setIsGithubLoading(true);
            await onClick('github');
          }}
          disabled={isPending}
        >
          {isGithubLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <FaGithub className="w-5 h-5" />
              <span>Sign in with Github</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
