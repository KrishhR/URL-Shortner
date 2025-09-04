const User = require('../models/user');
// const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../services/auth');

async function handleUserSignup(req, res) {
    const { username, email, password } = req.body;
    // validatation of username, email, and password are done here! However, it can be handled in frontend(React) also.
    await User.create({
        username: username,
        email: email,
        password: password
    })

    return res.redirect('/');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const userFromDB = await User.findOne({ email, password });

    if (!userFromDB) {
        return res.render('login', {
            error: 'Note: Invalid email or password'
        });
    }
    // const sessionId = uuidv4();
    // setUser(sessionId, userFromDB);
    // res.cookie('uid', sessionId);

    const token = setUser(userFromDB);
    res.cookie('token', token);
    return res.redirect('/');
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};