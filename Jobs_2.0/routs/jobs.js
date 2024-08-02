const express = require('express')
const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs')
const { testUser } = require('../middleware/testUser')

const route = express.Router()

route.get('/',getAllJobs)
route.get('/:id',getJob)
route.post('/createJob',testUser("Create"),createJob)
route.patch('/updateJob/:id',testUser("Update"),updateJob)
route.delete('/deleteJob/:id',testUser("Delete"),deleteJob)

module.exports = route