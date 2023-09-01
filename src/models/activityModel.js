const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    duration: { type: Number },
})

const activityModel = mongoose.model('Activity', activitySchema);

module.exports = activityModel;

