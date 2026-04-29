import styles from './Input.module.scss'
import searchIcon from '@/shared/assets/search_icon.png'
import { useState, type ChangeEvent } from 'react'
import { Button } from '@/shared/ui/Button/Button'

interface InputProps {
  onSubmit?: (value: string) => void;
  placeholder?: string;
  expanded?: boolean;
  embedded?: boolean;
}

export const Input = ({
  onSubmit,
  placeholder,
  expanded = false,
  embedded = false,
}: InputProps) => {
  const [value, setValue] = useState('')

  let containerClassName = styles.inputContainer
  let wrapperClassName = styles.inputWrapper

  if (embedded) {
    containerClassName += ` ${styles['inputContainer--embedded']}`
    wrapperClassName += ` ${styles['inputWrapper--embedded']}`
  }

  if (expanded) {
    containerClassName += ` ${styles['inputContainer--expanded']}`
    wrapperClassName += ` ${styles['inputWrapper--expanded']}`
  }

  const handleAction = () => {
    if (value.trim()) {
      onSubmit?.(value); 
      setValue('');
    } else {
      alert('구독할 키워드를 입력해주세요.');
    }
  }

  return (
    <div className={containerClassName}>
      <div className={wrapperClassName}>
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
        <Button onClick={handleAction} size='s' typeStyle='type1'>검색</Button>
      </div>
    </div>
  )
}
