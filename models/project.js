import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {
    type: String
  },
  author: {type: Schema.Types.ObjectId, 'ref': "Profile"}
}, {
  timestamps: true
})

const projectSchema = mongoose.Schema ({
  name: { 
    type: String,
    required: true
  },
  startDate: Date,
  endDate:  Date,
  completed: Boolean,
  description: String,
  comments: [commentSchema],
  owner: {type: Schema.Types.ObjectId, 'ref': "Profile"}
})

const Project = mongoose.model('Project', projectSchema)

export{
  Project
}