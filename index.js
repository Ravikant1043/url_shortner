const express = require('express');
const app = express();
const path = require('path');

const UserRoute = require('./routes/user');
const urlRoutes = require('./routes/url')

const PORT = 8000;
const url = require('./models/url');


const { connectToMongoDB } = require('./connect');


connectToMongoDB('mongodb://127.0.0.1:27017/url_shortner')
    .then(()=> console.log('Connected to MongoDB'))


// using the ejs library
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));


app.use(express.json());   
app.use(express.urlencoded({extended:false}));




app.use('/url',urlRoutes);
app.use('/user',UserRoute);

app.get('/test',async (req,res)=>{
    const urls=await url.find({});
    res.render('home',{
        allurls:urls,
    });
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.get('/api/:shortId',async (req,res)=>{
    const s_id = req.params.shortId;
    console.log(s_id);
    const entry = await url.findOneAndUpdate({
        shortId: s_id,
    },{
        $push:{
            visitedHostory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectedUrl);
})

app.listen(PORT, () => console.log('listening on port'+ PORT));