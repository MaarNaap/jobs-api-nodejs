const getAllJobs = (req, res, next) => {
    res.send('all jobs');
};

const getJob = (req, res, next) => {
    res.send('a job');
};

const addJob = (req, res, next) => {
    res.send('created')
};

const deleteJob = (req, res, next) => {
    res.send('deleted')
};

const updateJob = (req, res, next) => {
    res.send('updated')
};

module.exports = {
    getAllJobs, getJob, addJob, deleteJob, updateJob
};