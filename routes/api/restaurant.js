const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator");
//const auth = require("../../middleware/auth");

// @route  GET api/restaurant/cities
// @desc   Get Zomato city ID
// @access Private
router.get("/cities", (req, res) => {
  try {
    let query = req.body.search.split(" ");
    query = query.filter(item => item != "").join("%20");

    const options = {
      url: `https://${config.zomato.endpoint}/api/v2.1/cities?q=${query}`,
      method: "GET",
      headers: {
        "user-agent": "node.js",
        "user-key": config.zomato.api_key
      }
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

// @route  GET api/restaurant/collections
// @desc   Get list of restaurant collection in city
// @access Private
router.get("/collections", (req, res) => {
  try {
    let city_id = req.body.city_id;
    const options = {
      url: `https://${config.zomato.endpoint}/api/v2.1/collections?city_id=${city_id}`,
      method: "GET",
      headers: {
        "user-agent": "node.js",
        "user-key": config.zomato.api_key
      }
    };

    console.log(options.url);

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode != 200) {
        return res.status(400).json({ msg: "Could not connect to Zomato" });
      }

      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);
    return res.send("Server error");
  }
});

// @route  GET api/restaurant/search
// @desc   Search restaurants in city
// @access Private
router.get("/search", (req, res) => {
  try {
    const { city_id, search } = req.body;
    let query = search.split(" ");
    query = query.filter(item => item != "").join("%20");

    const options = {
      url: `https://${config.zomato.endpoint}/api/v2.1/search?entity_id=${city_id}&entity_type=city&q=${query}`,
      method: "GET",
      headers: {
        "user-agent": "node.js",
        "user-key": config.zomato.api_key
      }
    };

    console.log(options.url);

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode != 200) {
        return res.status(400).json({ msg: "Could not connect to Zomato" });
      }

      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);
    return res.send("Server error");
  }
});

module.exports = router;
