module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.session.user) {
            return next();
        }
        res.status(401).json({ error: 'Unauthorized, please login' });
    }
};
