import { Request, Response, NextFunction } from 'express'

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next()
  }

  return res.status(401).send('Unauthorized')
}
