const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')

const { ensureAuthenticated } = require('../config/auth')

router.get('/register', (req, res) => {
    res.render('register');
})
router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/register', async (req, res) => {
    const { name, email, age, password, password2 } = req.body;
    let errors = []
    if(!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all details'})
    }
    if(age < 12 || age > 100) {
        errors.push({msg: 'Please enter a valid age'})
    }
    if(password !== password2) {
        errors.push({msg: 'passwords do not match'})
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
        res.render('register', {
          errors,
          name,
          email,
          age,
          password,
          password2,
        });
    }
    else {
        const user = await User.findOne({email: email})
        if(user) {
            errors.push({msg: "Email is already registered"})
            res.render('register', {
                errors,
                name,
                age,
                email,
                password,
                password2,
            })
        } else {
            const newUser = await new User({
                name,
                email,
                age,
                password,
            })
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                newUser.password = hashedPassword
                await newUser.save()
                req.flash('success_msg', "You are Now registered you can proceed to login now")
                res.redirect('/users/login')
            } catch(err) {
                console.log(err);
            }
        }
    }
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', "you are successfully logged out")
    res.redirect('/users/login')
})

module.exports = router