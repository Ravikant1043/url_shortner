const User = require('../models/users')

async function handleUserSignup(req,res) {
    const {name,email, password} = req.body;
    User.create({
        name,
        email,
        password,
    })
    res.render('home');
}

module.exports = {
    handleUserSignup,
}
