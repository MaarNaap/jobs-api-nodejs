const express = require('express');
const { getAllJobs, addJob, getJob, deleteJob, updateJob } = require('../controllers/jobs');

const router = express.Router();

router.route('/').get(getAllJobs).post(addJob);
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob).put(updateJob);

module.exports = router;