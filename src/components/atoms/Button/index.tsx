// src/components/atoms/Button/index.tsx
import * as React from 'react'
import { Button as ShadButton, type ButtonProps as ShadButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type ButtonProps = ShadButtonProps & {
  variant?: ShadButtonProps['variant'] | 'brand' | 'ghost'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'brand', ...props }, ref) => (
  <ShadButton
    ref={ref}
    className={cn(
      variant === 'brand' && 'bg-primary text-primary-foreground hover:bg-[hsl(var(--primary))]/90 shadow-[var(--shadow-sm)]',
      className
    )}
    variant={variant as any}
    {...props}
  />
))
Button.displayName = 'Button'
