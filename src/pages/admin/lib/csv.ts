export const downloadCsv = (filename: string, header: string[], rows: string[][]) => {
  const csv = [header, ...rows]
    .map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(','))
    .join('\n')
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')

  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}
