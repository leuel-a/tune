import { AnyZodObject, ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'
import path from 'path'

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      })
      next()
    } catch (error) {
      const e = error as ZodError

      // change the default error message to a much more readable one
      const errors = []

      e.errors.map(value => {
        const path = value['path'].pop()
        errors.push({ [path]: value['message'] })
      })

      res.status(400).json(errors)
    }
  }
