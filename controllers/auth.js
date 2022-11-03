const login = (req, res, next) => {
    res.send('login');
};

const register = (req, res, next) => {
    res.send('register');
};

module.exports = { login, register };