module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if(req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', "You are not logged in please login first")
        res.redirect('/users/login')
    }
}