export default value => {
  if (!value) return
  return `${(value / 12) * 100}%;`
}
