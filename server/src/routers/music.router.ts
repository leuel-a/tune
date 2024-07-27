import {
  createMusicHandler,
  deleteMusicHandler,
  getMusicHandler,
  getMusicsHandler
} from '../controllers/musics.controller'
import {
  createMusicSchema,
  deleteMusicSchema,
  getManyMusicSchema,
  getMusicSchema
} from '../schemas/musics.schema'
import { Router } from 'express'
import { validate } from '../middlewares/validateResource'

const router = Router()

router.get('/:id', validate(getMusicSchema), getMusicHandler)
router.get('/', validate(getManyMusicSchema), getMusicsHandler)
router.post('/', validate(createMusicSchema), createMusicHandler)
router.delete('/:id', validate(deleteMusicSchema), deleteMusicHandler)

export default router
