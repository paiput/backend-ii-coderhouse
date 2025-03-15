const validateEmail = (req, res, next, email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  const isValid = email.match(emailRegex)
  if (!isValid) return res.status(400).json({ error: 'Email inválido' })
  return next()
}

export default validateEmail
