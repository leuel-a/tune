import { Request, Response } from 'express'

export const loginHandler = async (req: Request, res: Response) => {
  return res.sendStatus(200)
}

export const logoutHandler = async (req: Request, res: Response) => {
  req.logOut(err => {
    if (err) {
      return res.status(500).json('Something went wrong while logging out.')
    }

    req.session.destroy(err => {
      if (err) {
        return res.status(500).json('Failed to destroy session.')
      }
    })

    res.clearCookie('connect.sid')
    res.status(200).send('Logged out successfully.')
  })
}
