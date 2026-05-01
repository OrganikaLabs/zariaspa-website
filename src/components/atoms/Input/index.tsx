// src/components/atoms/Input/index.tsx
import * as React from 'react'
import { Input as ShadInput } from '@/components/ui/input'

export type InputProps = React.ComponentProps<'input'>

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <ShadInput ref={ref} {...props} />
))
Input.displayName = 'Input'
