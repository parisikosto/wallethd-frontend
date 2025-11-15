import type { JSX } from 'react';
import { WalletMinimal } from 'lucide-react';

import { LoginForm } from '@/features';
import { FieldDescription } from '@/ui';

export const LoginPage = (): JSX.Element => {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="/" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <WalletMinimal className="size-4" />
              </div>
              Wallet HD
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <img
            src="assets/img/fabian-blank-pElSkGRA2NU-unsplash.jpg"
            alt="pink pig figurine on white surface"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            style={{ objectPosition: 'calc(100% + 130px) center' }}
          />
          <FieldDescription className="absolute bottom-4 right-4 px-6 text-right">
            This cute piggy from{' '}
            <a
              href="https://unsplash.com/photos/pink-pig-figurine-on-white-surface-pElSkGRA2NU"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>{' '}
            by{' '}
            <a
              href="https://unsplash.com/@blankerwahnsinn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fabian Blank
            </a>{' '}
            believes your wallet will fill up soon.
          </FieldDescription>
        </div>
      </div>
    </>
  );
};
