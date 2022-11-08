const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'provide job title'],
        maxlength: 50
    },
    company: {
        type: String,
        required: [true, 'provide company name'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: {values: ['pending', 'interviewed', 'declined'], message:`"{VALUE}" is not supported`},
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Job = mongoose.model('job', jobSchema);


module.exports = Job;