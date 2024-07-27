import _ from 'lodash'
import { Request, Response } from 'express'
import {
  RegisterType,
  ReadUserType,
  DeleteUserType
} from 'schemas/users.schema'
import { createUser, deleteUser, findUser } from '../services/users.services'

export const createUserHandler = async (
  req: Request<{}, {}, RegisterType['body']>,
  res: Response
) => {
  const { email, password } = req.body

  const alreadyExistsUser = await findUser({ email }, { lean: true })
  if (alreadyExistsUser)
    return res.status(400).send('Email is taken.')

  try {
    const user = await createUser({ email, password })

    // set the location header for the resource location
    res.location(`/api/users/${user.id}`)

    return res.status(201).send(_.omit(user, ['password']))
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
}

export const getUserHandler = async (
  req: Request<ReadUserType['params']>,
  res: Response
) => {
  const user = await findUser({ _id: req.params.id })

  if (!user) {
    return res.status(400).send('User not found.')
  }

  return res.status(200).send(_.omit(user, ['password']))
}

export const deleteUserHandler = async (
  req: Request<DeleteUserType['params']>,
  res: Response
) => {
  const user = await deleteUser({ _id: req.params.id })

  if (!user) {
    return res
      .status(400)
      .send(`Unable to delete user with id: ${req.params.id}`)
  }
  return res.sendStatus(200)
}
