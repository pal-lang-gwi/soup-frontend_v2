import React, { type ButtonHTMLAttributes } from 'react'
import styles from '@/shared/ui/Button/Button.module.scss'
import xCircleImg from '@/shared/assets/x_circle.png'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'xs' | 's' | 'm' | 'l'
  typeStyle?: 'type1' | 'type2' | 'type3'
  close?: boolean
  children?: React.ReactNode
}

export const Button = ({
  size = 'm',
  typeStyle = 'type1',
  close = false,
  children,
  ...rest
}: ButtonProps) => {
  const classNames = [
    styles.button,
    styles[`button--${size}`],
    styles[`button--${typeStyle}`],
    close ? styles['button--close'] : '',
  ].join(' ')

  return (
    <button className={classNames} {...rest}>
      <span className={styles.label}>{children}</span>
      {close && <img src={xCircleImg} alt='닫기' className={styles.closeIcon} />}
    </button>
  )
}
