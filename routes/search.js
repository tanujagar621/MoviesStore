const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')


router.get('/:id', async (req, res) => {
    const id = req.params.id
    const url_api = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
    try {
        await fetch(url_api).then(res => res.json()).then(data => {
            if(data.success === false) {
                res.render('movie', {
                    data: null,
                    error: "Unable To Load Page",    
                })
            } else{
                res.render('movie', {
                    data:data,
                    error:null,
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
})

router.get('/', (req, res) => {
    res.render('search', {
        title: "",
        error: null,
        results: null,
    })
})

router.post('/', async (req, res) => {
    const title = req.body.title
    const url_api = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${title}`
    try {
        await fetch(url_api).then(res => res.json()).then(data => {
            // console.log(data.results);
            if(data.total_results === 0) {
                res.render('search', {
                    title: title,
                    error: 'Nothing Found',
                    results: null,
                })
            } else {
                res.render('search', {
                    title: title,
                    error: null,
                    results: data.results,
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
})


module.exports = router