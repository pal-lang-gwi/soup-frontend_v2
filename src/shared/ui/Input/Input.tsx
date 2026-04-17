import styles from './Input.module.scss'
import searchIcon from '@/shared/assets/search_icon.png'
import { useState, type ChangeEvent } from 'react'
import { Button } from '@/shared/ui/Button/Button'

interface InputProps {
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

export const Input = ({ onSubmit, placeholder }: InputProps) => {
  const [value, setValue] = useState('')

  const handleAction = () => {
    if (value.trim()) {
      onSubmit?.(value); 
      setValue('');
    } else {
      alert('구독할 키워드를 입력해주세요.');
    }
  }

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <img src={searchIcon} alt='검색' className={styles.searchIcon} />
        <input 
          type='text' 
          className={styles.textInput} 
          placeholder={placeholder}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAction();
          }}
        />
        <Button onClick={handleAction} size='s' typeStyle='type3'>검색</Button>
      </div>
    </div>
  )
}