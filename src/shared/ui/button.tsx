import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';
import { buttonVariants } from './button-variants';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

const ButtonComponent = ({ className, variant, size, asChild = false, ref, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  console.log('Button');

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref} 
      {...props}
    />
  );
};

ButtonComponent.displayName = 'Button';

export const Button = React.memo(ButtonComponent);