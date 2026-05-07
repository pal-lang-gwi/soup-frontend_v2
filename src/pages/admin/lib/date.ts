export const formatAdminDate = (value: string | number[]) => {
  if (Array.isArray(value)) {
    const [year, month, day, hour = 0, minute = 0, second = 0] = value
    const pad = (item: number) => String(item).padStart(2, '0')

    return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`
  }

  return value.replace('T', ' ').slice(0, 19)
}
