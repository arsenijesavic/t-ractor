export default fn => {
  if (typeof window !== "undefined") fn()
}
