const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator");
//const auth = require("../../middleware/auth");

// @route  GET api/movie/now_playing
// @desc   Get MovieDB now playing movies
// @access Private
router.get("/now_playing", (req, res) => {
  try {
    const options = {
      url: `https://${config.movieDB.endpoint}/3/movie/now_playing?api_key=${config.movieDB.api_key}&language=en-US&page=${req.body.page}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    console.log(options.url);

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode != 200) {
        return res.status(400).json({ msg: "Could not connect to movieDB" });
      }

      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);
    return res.send("Server error");
  }
});

// @route  GET api/movie/popular
// @desc   Get MovieDB popular movies
// @access Private
router.get("/popular", (req, res) => {
  try {
    const options = {
      url: `https://${config.movieDB.endpoint}/3/movie/popular?api_key=${config.movieDB.api_key}&language=en-US&page=${req.body.page}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    console.log(options.url);

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode != 200) {
        return res.status(400).json({ msg: "Could not connect to movieDB" });
      }

      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);
    return res.send("Server error");
  }
});

// @route  GET api/movie/top_rated
// @desc   Get MovieDB top rated movies
// @access Private
router.get("/top_rated", (req, res) => {
  try {
    const options = {
      url: `https://${config.movieDB.endpoint}/3/movie/top_rated?api_key=${config.movieDB.api_key}&language=en-US&page=${req.body.page}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    console.log(options.url);

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode != 200) {
        return res.status(400).json({ msg: "Could not connect to movieDB" });
      }

      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);
    return res.send("Server error");
  }
});

// @route  GET api/movie/search
// @desc   Search MovieDB movies & tv shows
// @access Private
router.get("/search", (req, res) => {
  try {
    let query = req.body.search.split(" ");
    query = query.filter(item => item != "").join("%20");

    const options = {
      url: `https://${config.movieDB.endpoint}/3/search/multi?api_key=${config.movieDB.api_key}&language=en-US&query=${query}&page=${req.body.page}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode != 200) {
        return res.status(400).json({ msg: "Could not connect to movieDB" });
      }

      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);
    return res.send("Server error");
  }
});

module.exports = router;
