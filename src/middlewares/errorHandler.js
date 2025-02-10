const errorHandler = async (req, res, next) => {
  console.log(`${res.req.method} ${res.req.baseUrl} - ${res.statusCode}`)
  next()
}

export default errorHandler
