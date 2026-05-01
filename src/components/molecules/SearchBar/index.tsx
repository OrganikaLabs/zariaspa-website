// src/components/molecules/SearchBar/index.tsx
import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'

interface Props {
  placeholder?: string
  onSearch?: (q: string) => void
  onChange?: (q: string) => void
  className?: string
}

export const SearchBar: React.FC<Props> = ({ 
  placeholder = 'Search jobs, titles, keywords...', 
  onSearch, 
  onChange,
  className 
}) => {
  const [q, setQ] = React.useState('')
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQ(value)
    onChange?.(value)
  }
  
  const handleSubmit = () => {
    onSearch?.(q)
  }
  
  return (
    <div className={`flex items-center gap-2 w-full max-w-xl bg-secondary rounded-lg px-3 py-2 border border-input ${className}`}>
      <Search className="text-muted-foreground" size={18} />
      <Input
        placeholder={placeholder}
        value={q}
        onChange={handleChange}
        className="flex-1 bg-transparent border-0 focus-visible:ring-0"
      />
      <Button onClick={handleSubmit} className="shrink-0">Search</Button>
    </div>
  )
}