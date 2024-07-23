import { Router } from 'express'
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler
} from '../controllers/users.controller'
import { validate } from '../middlewares/validateResource'
import {
  deleteUserSchema,
  getUserSchema,
  registerSchema
} from '../schemas/users.schema'

const router = Router()

router.get('/:id', validate(getUserSchema), getUserHandler)
router.post('/', validate(registerSchema), createUserHandler)
router.delete('/:id', validate(deleteUserSchema), deleteUserHandler)

export default router
