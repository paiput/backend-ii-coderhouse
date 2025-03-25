import { body, validationResult } from 'express-validator'

export default [
  body('name').exists().isString().not().isEmpty(),
  body('description').exists().isString().not().isEmpty(),
  body('price').exists().isInt().not().isEmpty(),
  body('stock').exists().isInt().not().isEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (error) {
      res.status(400).json(error)
    }
  },
]
