import type { ComponentProps, JSX } from 'react';

export const Breadcrumb = ({
  ...props
}: ComponentProps<'nav'>): JSX.Element => {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
};
