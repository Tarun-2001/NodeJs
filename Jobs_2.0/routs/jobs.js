const express = require('express')
const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs')

const route = express.Router()

route.get('/',getAllJobs)
route.get('/:id',getJob)
route.post('/createJob',createJob)
route.patch('/updateJob/:id',updateJob)
route.delete('/deleteJob/:id',deleteJob)

module.exports = route