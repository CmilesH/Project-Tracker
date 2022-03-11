import { Project } from "../models/project.js";


function newProject(req, res) {
  res.render('projects/new', {
    title: "Create Project"
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.completed = !!req.body.completed
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

function edit(req, res) {
  Project.findById(req.params.id)
  .then(project => {
    res.render('projects/edit', {
      project,
      title: "Edit Project"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/projects')
  })
}

function update(req, res) {
  Project.findById(req.params.id)
  .then(project => {
    if (project.owner.equals(req.user.profile._id)) {
      req.body.completed = !!req.body.completed
      project.updateOne(req.body, {new: true})
      .then(()=> {
        res.redirect(`/projects/${project._id}`)
      })
    } else {
      throw new Error ('Not authorized ')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function deleteProject(req, res) {
  Project.findById(req.params.id)
  .then(project => {
    if (project.owner.equals(req.user.profile._id)) {
      project.delete()
      .then(() => {
        res.redirect(`/profiles/${req.user.profile._id}`)
      })
    } else {
      throw new Error ('Not authorized ')
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect('/projects')
  })
}

function createComment(req, res) {
  req.body.author = req.user.profile._id
  Project.findById(req.params.id) 
    .then((project) => {
    project.comments.push(req.body)
    project.save(function(err) {
      res.redirect(`/projects/${project._id}`)
    })
  })
}

export{
  create,
  show,
  newProject as new,
  edit,
  update,
  deleteProject as delete,
  createComment,
}