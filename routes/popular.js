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
            res.render("index", {
              error: "Nothing Found",
              results: null,
            });
          } else {
            res.render("index", {
              error: null,
              results: data.results,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
});
router.get("/trending", async (req, res) => {
  const url_api = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`;

  try {
    await fetch(url_api)
      .then((res) => res.json())
      .then((data) => {
        if (data.total_results === 0) {
          res.render("trending", {
            error: "Nothing To Show At the Moment",
            results: null,
          });
        } else {
          res.render("trending", {
            error: null,
            results: data.results,
          });
        }
      });
  } catch (err) {
    console.log(err);
  }
})

router.get("/mostpopular/:type", async (req, res) => {
  const type = req.params.type
  const url_api =
    `https://api.themoviedb.org/3/${type}/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`;

    try {
      await fetch(url_api)
        .then((res) => res.json())
        .then((data) => {
          if (data.total_results === 0) {
            res.render("popular", {
              error: "Nothing Found",
              results: null,
              type: type,
            });
          } else {
            res.render("popular", {
              error: null,
              results: data.results,
              type: type,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
});

router.get("/mostpopular/tv", async (req, res) => {
  const url_api =
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`;

    try {
      await fetch(url_api)
        .then((res) => res.json())
        .then((data) => {
          if (data.total_results === 0) {
            res.render("popular", {
              error: "Nothing Found",
              results: null,
              type: "tv",
            });
          } else {
            res.render("popular", {
              error: null,
              results: data.results,
              type: "tv",
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
});

module.exports = router;