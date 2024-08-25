const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateShortURL(req,res){

    const body = req.body;
    if(!body)return res.status(400).json({staus:"invalid request"})
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectedUrl: body.url,
        visitedHistory: []
    })
    
    return res.render('home',{id:shortID});
}

async function handleGetAnalytics(req,res){
    const s_id = req.params.shortId;
    console.log(s_id)
    const result = await URL.findOne({shortId: s_id});
    res.json({total_clicks: result.visitedHostory.length,
        analytics: result.visitedHostory,
    })
}

module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics,
};
