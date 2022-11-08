const Job = require('../models/job');
const tryCatch = require('../middleware/tryCatch');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, NotFound } = require('../errors');

const getAllJobs = tryCatch(async (req, res, next) => {
    const userId = req.user.userId;
    const jobs = await Job.find({ createdBy: userId });
    res.status(StatusCodes.OK).send({total:jobs.length, jobs});
});

const getJob = tryCatch(async (req, res, next) => {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) throw new NotFound('Job not found');
    res.status(StatusCodes.OK).send(job);
});

const addJob = tryCatch(async (req, res, next) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).send(job);
});

const deleteJob = tryCatch(async (req, res, next) => {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) throw new NotFound('Job not found');
    res.status(StatusCodes.OK).send(job);
});

const updateJob = tryCatch(async (req, res, next) => {
    // have to add option to run validators when updating, or else they won't run and everything will be valid
    // or use other method to find the document, implement updates manually, then use document.save()

    // validate req.body here ..
    const { title, company, status } = req.body;
    if (!title && !company && !status) throw new BadRequest('Invalid values. Provide some values to update document with');

    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true});
    if (!job) throw new NotFound('Job not found');
    res.status(StatusCodes.OK).send(job);
});

module.exports = {
    getAllJobs, getJob, addJob, deleteJob, updateJob
};