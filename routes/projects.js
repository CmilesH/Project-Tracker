import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as projectsCtrl from '../controllers/projects.js'

const router = Router()

router.post('/', isLoggedIn, projectsCtrl.create)
router.get('/new', projectsCtrl.new)
router.get('/:id', projectsCtrl.show)
router.get('/:id/edit', isLoggedIn, projectsCtrl.edit)
router.put('/:id', isLoggedIn,  projectsCtrl.update)
router.delete('/:id', isLoggedIn,  projectsCtrl.delete)
router.post("/:id/comments", isLoggedIn, projectsCtrl.createComment)

export{
  router
}