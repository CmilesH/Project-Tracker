import mongoose from 'mongoose'

const Schema = mongoose.Schema

const projectSchema = mongoose.Schema ({
  name: { 
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate:  Date,
  completed: Boolean,
  description: String,
  owner: {type: Schema.Types.ObjectId, 'ref': "Profile"}
})

const Project = mongoose.model('Project', projectSchema)

export{
  Project
}