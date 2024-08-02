import { AnyZodObject, ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'
import path from 'path'

export const validate =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      })
      next()
    } catch (error) {
      const e = error as ZodError

      const errors: { [key: string]: string | number | symbol }[] = []

      e.errors.map(value => {
        const path = value['path'].pop()
        if (typeof path == 'string' || typeof path === 'number' || typeof path === 'symbol') {
          errors.push({ [path]: value['message'] })
        }
      })

      res.status(400).json(errors)
    }
  }
