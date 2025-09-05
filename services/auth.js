// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser,
// }


import jwt from 'jsonwebtoken';
const secret_key = "sfsfKBH@242SSD@$23";

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret_key);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret_key);
    } catch (error) {
        console.log(error);
    }
}

export default {
    setUser,
    getUser,
}