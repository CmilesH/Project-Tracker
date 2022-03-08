import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as projectsCtrl from '../controllers/projects.js'

const router = Router()

router.post('/', isLoggedIn, projectsCtrl.create)
router.get('/new', projectsCtrl.new)
router.get('/:id', projectsCtrl.show)

export{
  router
}