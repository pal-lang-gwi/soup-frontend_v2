export const formatAdminDate = (value: string | number[]) => {
  if (Array.isArray(value)) {
    if (value.length < 3) return '-'

    const [year, month, day, hour = 0, minute = 0, second = 0] = value.map(Number)
    const parts = [year, month, day, hour, minute, second]

    if (parts.some((part) => !Number.isFinite(part))) return '-'

    const pad = (item: number) => String(item).padStart(2, '0')

    return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`
  }

  return value.replace('T', ' ').slice(0, 19)
}
