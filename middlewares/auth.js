import userServices from '../services/auth.js';

// AUTHENTICATION Function
function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    res.user = null;

    if (!tokenCookie) return next();

    const token = tokenCookie;
    const user = userServices.getUser(token);
    
    req.user = user;
    return next();
}

// AUTHORIZATION Function
// ADMIN, NORMAL
function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login');

        if (!roles.includes(req.user.role)) return res.end('Unauthorized Access!');

        return next();
    }
}

// async function restrictToLoggedInUserOnly(req, res, next) {
//     const userUid = req.cookies?.auth_token;

//     if (!userUid) return res.redirect('/login');

//     const user = await getUser(userUid);
//     if (!user) return res.redirect('/login');

//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next) {
//     const userUid = req.cookies?.auth_token;
//     const user = getUser(userUid);
//     req.user = user;
//     next();
// }

export default {
    checkForAuthentication,
    restrictTo,
}