import { Project } from "../models/project.js";


function newProject(req, res) {
  res.render('projects/new', {
    title: "Create Project"
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Project.create(req.body)
  .then(project => {
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function show(req, res) {
  Project.findById(req.params.id)
  .populate("owner")
  .then(project => {
    res.render('projects/show', {
      project,
      title: "Project Details"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/projects')
  })
}

export{
  create,
  show,
  newProject as new
}