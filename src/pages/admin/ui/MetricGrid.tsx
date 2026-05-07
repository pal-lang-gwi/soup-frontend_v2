import styles from '../AdminPage.module.scss'
import type { MetricCard, Tone } from '../model/types'
import { AdminIcon } from './AdminIcon'

interface MetricGridProps {
  items: MetricCard[]
}

const toneClass: Record<Tone, string> = {
  green: styles.green,
  red: styles.red,
  amber: styles.amber,
}

const getChangeArrow = (change: string) => {
  if (change.trim().startsWith('-')) return '↓'
  if (change.trim().startsWith('0')) return '→'

  return '↑'
}

export const MetricGrid = ({ items }: MetricGridProps) => {
  return (
    <section className={styles.metricGrid} aria-label='관리자 주요 지표'>
      {items.map((item) => (
        <article key={item.title} className={styles.metricCard}>
          <div className={`${styles.metricIcon} ${toneClass[item.tone]}`}>
            <AdminIcon name={item.icon} />
          </div>
          <div className={styles.metricBody}>
            <p>{item.title}</p>
            <strong>{item.value}</strong>
            <span className={toneClass[item.tone]}>
              {getChangeArrow(item.change)} {item.change} <small>({item.meta})</small>
            </span>
          </div>
        </article>
      ))}
    </section>
  )
}
