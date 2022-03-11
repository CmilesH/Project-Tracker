import { Profile } from '../models/profile.js'
import { Project } from "../models/project.js";

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: "Home Page",
      user: req.user ? req.user : null
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then((profile) => {
    console.log(req.user)
    if (req.user) {
      Profile.findById(req.user.profile._id)
      .then(self => {
        const isSelf = self._id.equals(profile._id)
        Project.find({owner: profile._id}, function (err, projects) {
          res.render("profiles/show", {
          title: `${profile.name}'s profile`,
          profile,
          isSelf,
          projects
          })
        })
      })
    } else {
      Project.find({owner: profile._id}, function (err, projects) {
        res.render("profiles/show", {
        title: `${profile.name}'s profile`,
        profile,
        isSelf: null,
        projects
        })
    }) 
  }})
  .catch((err) => {
    console.log(err)
    res.redirect("/")
  })
}

export{
  index,
  show
}