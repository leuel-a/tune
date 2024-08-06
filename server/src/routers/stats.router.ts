import { Router } from 'express'
import {
  getSongsForGenreHandler,
  getStatsForAlbumsHandler,
  getStatsForArtistsHandler,
  getTotalStatsHandler
} from '../controllers/stats.controller'

const router = Router()

router.get('/totals', getTotalStatsHandler)
router.get('/genres', getSongsForGenreHandler)
router.get('/albums', getStatsForAlbumsHandler)
router.get('/artists', getStatsForArtistsHandler)

export default router
