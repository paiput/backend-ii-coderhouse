const errorHandler = async (error, req, res, next) => {
  console.log(`Middleware error handling at ${req.method} ${req.url}`)
  console.log(error)
  const errorStatus = error.statusCode || 500
  const errorMessage = error.message || 'Algo salió mal'
  res.status(errorStatus).json({
    status: errorStatus,
    error: errorMessage,
  })
}

export default errorHandler
