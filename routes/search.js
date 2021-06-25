const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')


router.get("/:type/:id", async (req, res) => {
  const id = req.params.id;
  const type = req.params.type;
  const url_api = `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.API_KEY}`
  try {
    await fetch(url_api)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          res.render("movie", {
            data: null,
            type: type,
            error: "Unable To Load Page",
          });
        } else {
          res.render("movie", {
            data: data,
            type: type,
            error: null,
          });
        }
      });
  } catch (err) {
    console.log(err);
  }
});

// router.get('/', (req, res) => {
//     res.render('search', {
//         title: "",
//         error: null,
//         results: null,
//     })
// })

router.get('/', async (req, res) => {
    const title = req.query.title
    // console.log(title);
    const url_api = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${title}`
    try {
        await fetch(url_api).then(res => res.json()).then(data => {
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