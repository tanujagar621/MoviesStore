const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get("/", async (req, res) => {
  const url_api =
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`;

    try {
      await fetch(url_api)
        .then((res) => res.json())
        .then((data) => {
          if (data.total_results === 0) {
            res.render("popular", {
              error: "Nothing Found",
              results: null,
            });
          } else {
            res.render("popular", {
              error: null,
              results: data.results,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
});


module.exports = router;