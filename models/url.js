const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId :{
        type: 'string',
        required: true,
        unique: true
    },
    redirectedUrl:{
        type: 'string',
        required: true,
    },
    visitedHostory:[{ timestamp: {type:Number} }]
},{timestamps : true});


const URL = mongoose.model('url',urlSchema);

module.exports = URL;
