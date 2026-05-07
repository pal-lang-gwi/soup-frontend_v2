import type { IconName } from '../model/types'

interface AdminIconProps {
  name: IconName
  className?: string
}

export const AdminIcon = ({ name, className = '' }: AdminIconProps) => {
  const commonProps = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    'aria-hidden': true,
  }

  switch (name) {
    case 'dashboard':
      return (
        <svg {...commonProps}>
          <rect x='4' y='4' width='6' height='6' rx='1.5' />
          <rect x='14' y='4' width='6' height='6' rx='1.5' />
          <rect x='4' y='14' width='6' height='6' rx='1.5' />
          <rect x='14' y='14' width='6' height='6' rx='1.5' />
        </svg>
      )
    case 'users':
      return (
        <svg {...commonProps}>
          <path d='M16 19v-1.5c0-2.2-1.8-4-4-4H8c-2.2 0-4 1.8-4 4V19' />
          <path d='M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
          <path d='M20 19v-1.2c0-1.9-1.2-3.5-3-4.1' />
          <path d='M15 4.3a3 3 0 0 1 0 5.4' />
        </svg>
      )
    case 'keywords':
    case 'tag':
      return (
        <svg {...commonProps}>
          <path d='M20 13.5 13.5 20a2 2 0 0 1-2.8 0L4 13.3V4h9.3l6.7 6.7a2 2 0 0 1 0 2.8Z' />
          <path d='M8.5 8.5h.01' />
        </svg>
      )
    case 'contents':
    case 'document':
      return (
        <svg {...commonProps}>
          <path d='M7 3h7l5 5v13H7V3Z' />
          <path d='M14 3v6h5' />
          <path d='M10 13h6' />
          <path d='M10 17h6' />
        </svg>
      )
    case 'mail':
      return (
        <svg {...commonProps}>
          <path d='M4 6h16v12H4V6Z' />
          <path d='m4 7 8 6 8-6' />
        </svg>
      )
    case 'system':
      return (
        <svg {...commonProps}>
          <rect x='4' y='5' width='16' height='14' rx='2' />
          <path d='M8 9h8' />
          <path d='M8 13h3' />
          <path d='M14 13h2' />
          <path d='M8 17h8' />
        </svg>
      )
    case 'send':
      return (
        <svg {...commonProps}>
          <path d='m4 12 16-8-6 16-3-7-7-1Z' />
          <path d='m11 13 4-4' />
        </svg>
      )
    case 'warning':
      return (
        <svg {...commonProps}>
          <path d='M10.3 4.4 2.8 17.2A2 2 0 0 0 4.5 20h15a2 2 0 0 0 1.7-2.8L13.7 4.4a2 2 0 0 0-3.4 0Z' />
          <path d='M12 9v4' />
          <path d='M12 17h.01' />
        </svg>
      )
    case 'search':
      return (
        <svg {...commonProps}>
          <circle cx='11' cy='11' r='6' />
          <path d='m16 16 4 4' />
        </svg>
      )
    case 'chevron':
      return (
        <svg {...commonProps}>
          <path d='m8 10 4 4 4-4' />
        </svg>
      )
    case 'clock':
      return (
        <svg {...commonProps}>
          <circle cx='12' cy='12' r='8' />
          <path d='M12 7v5l3 2' />
        </svg>
      )
    case 'check':
      return (
        <svg {...commonProps}>
          <circle cx='12' cy='12' r='8' />
          <path d='m8.5 12.5 2.4 2.4 4.8-5.3' />
        </svg>
      )
    case 'x':
      return (
        <svg {...commonProps}>
          <circle cx='12' cy='12' r='8' />
          <path d='m9 9 6 6' />
          <path d='m15 9-6 6' />
        </svg>
      )
    case 'download':
      return (
        <svg {...commonProps}>
          <path d='M12 4v10' />
          <path d='m8 10 4 4 4-4' />
          <path d='M5 20h14' />
        </svg>
      )
    case 'refresh':
      return (
        <svg {...commonProps}>
          <path d='M20 12a8 8 0 0 1-13.6 5.7' />
          <path d='M4 12A8 8 0 0 1 17.6 6.3' />
          <path d='M17 3v4h-4' />
          <path d='M7 21v-4h4' />
        </svg>
      )
    case 'shield':
      return (
        <svg {...commonProps}>
          <path d='M12 3 19 6v5c0 4.7-2.8 8.2-7 10-4.2-1.8-7-5.3-7-10V6l7-3Z' />
          <path d='m9 12 2 2 4-5' />
        </svg>
      )
    case 'menu':
      return (
        <svg {...commonProps}>
          <path d='m15 6-6 6 6 6' />
        </svg>
      )
    case 'external':
      return (
        <svg {...commonProps}>
          <path d='M14 4h6v6' />
          <path d='m20 4-9 9' />
          <path d='M18 14v5H5V6h5' />
        </svg>
      )
    default:
      return null
  }
}
