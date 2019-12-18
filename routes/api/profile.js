const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  POST api/profile
// @desc   Create user profile
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("city", "City is required")
        .not()
        .isEmpty(),
      check("state", "State is required")
        .not()
        .isEmpty(),
      check("zipcode", "Zipcode is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Build profile
    const { city, state, zipcode, address } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.city = city;
    profileFields.state = state;
    profileFields.zipcode = zipcode;
    if (address) profileFields.address = address;

    try {
      let profile = await Profile.findOne({
        user: req.user.id
      });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create User Profile
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// @route  PUT api/profile
// @desc   Update user profile
// @access Private
router.put("/", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    let user = await User.findById(req.user.id);

    if (!profile) {
      return res.status(400).json({ msg: "No profile found." });
    }

    const { city, state, zipcode, address, email, avatar } = req.body;

    if (!city && !state && !zipcode && !address && !email && !avatar) {
      return res
        .status(400)
        .json({ msg: "Please add fields to request body." });
    }

    // Update user profile
    if (city) profile.city = city;
    if (state) profile.state = state;
    if (zipcode) profile.zipcode = zipcode;
    if (address) profile.address = address;
    await profile.save();

    // Update user account
    if (email || avatar) {
      console.log(user);
      if (email) user.email = email;
      if (avatar) user.avatar = avatar;
      await user.save();
      profile = await Profile.findOne({ user: req.user.id });
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["email", "name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "No profile found." });
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route  POST api/profile/create/category
// @desc   Create user category
// @access Private
router.post(
  "/create/category",
  [
    auth,
    [
      check("category_name", "Category name required")
        .not()
        .isEmpty(),
      check("type", "Selected an invalid type")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors });
    }

    try {
      let profile = await Profile.findOne({
        user: req.user.id
      });

      if (!profile) {
        return res.status(400).json({ msg: "No profile found." });
      }

      const { category_name, type, description, img_url } = req.body;

      // Check that category name doesn't exist
      for (let i in profile.categories) {
        if (profile.categories[i].category_name === category_name) {
          return res.status(400).json({ msg: "Category name already exists." });
        }
      }

      // Create Category
      const category = {
        category_name,
        type,
        description,
        img_url
      };
      category.category_items = [];
      profile.categories.unshift(category);
      await profile.save();
      return res.json(profile.categories);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/profile/:category_id/create/item
// @desc   Create user category item
// @access Private
router.put(
  "/:category_id/create/item",
  [
    auth,
    [
      check("item_name", "Item name required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let profile = await Profile.findOne({
        user: req.user.id
      });

      if (!profile) {
        return res.status(400).json({ msg: "No profile found." });
      }

      const { item_name, item_url } = req.body;

      // Get category index
      const categoryIndex = profile.categories
        .map(item => item.id)
        .indexOf(req.params.category_id);

      // Check that category item name doesn't exist
      for (let i in profile.categories[categoryIndex].category_items) {
        if (
          profile.categories[categoryIndex].category_items[i].item_name ===
          item_name
        ) {
          return res
            .status(400)
            .json({ msg: "Category item name already exists." });
        }
      }

      // Create new category item
      const categoryItem = {
        item_name,
        item_url
      };

      profile.categories[categoryIndex].category_items.unshift(categoryItem);
      await profile.save();
      return res.json(profile.categories);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/profile/category/:id
// @desc   Update category from profile
// @access Private
router.put("/category/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const { category_name, type, description, img_url } = req.body;

    if (!category_name && !type && !description && !img_url) {
      return res
        .status(400)
        .json({ msg: "Please add fields to request body." });
    }

    // Get category index
    const categoryIndex = profile.categories
      .map(item => item.id)
      .indexOf(req.params.id);

    if (categoryIndex == undefined || categoryIndex == -1) {
      return res.status(400).json({ msg: "Category ID is invalid" });
    }

    if (category_name)
      profile.categories[categoryIndex].category_name = category_name;
    if (type) profile.categories[categoryIndex].type = type;
    if (description)
      profile.categories[categoryIndex].description = description;
    if (img_url) profile.categories[categoryIndex].img_url = img_url;

    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/profile/:category_id/item/:id
// @desc   Update item from profile
// @access Private
router.put("/:category_id/item/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const { item_name, item_url } = req.body;

    if (!item_name && !item_url) {
      return res
        .status(400)
        .json({ msg: "Please add fields to request body." });
    }

    // Get category index
    const categoryIndex = profile.categories
      .map(item => item.id)
      .indexOf(req.params.category_id);

    if (categoryIndex == undefined || categoryIndex == -1) {
      return res.status(400).json({ msg: "Category ID is invalid" });
    }

    // Get item index
    const itemIndex = profile.categories[categoryIndex].category_items
      .map(item => item.id)
      .indexOf(req.params.id);

    if (itemIndex == undefined || itemIndex == -1) {
      return res.status(400).json({ msg: "Item ID is invalid" });
    }

    if (item_name)
      profile.categories[categoryIndex].category_items[
        itemIndex
      ].item_name = item_name;
    if (item_url)
      profile.categories[categoryIndex].category_items[
        itemIndex
      ].item_url = item_url;

    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/profile/category/:id
// @desc   Delete category from profile
// @access Private
router.delete("/category/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get category index
    const categoryIndex = profile.categories
      .map(item => item.id)
      .indexOf(req.params.id);

    if (categoryIndex == undefined || categoryIndex == -1) {
      return res.status(400).json({ msg: "Category ID is invalid" });
    }

    profile.categories.splice(categoryIndex, 1);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/profile/:category_id/item/:id
// @desc   Delete item from profile
// @access Private
router.delete("/:category_id/item/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get category index
    const categoryIndex = profile.categories
      .map(item => item.id)
      .indexOf(req.params.category_id);

    if (categoryIndex == undefined || categoryIndex == -1) {
      return res.status(400).json({ msg: "Category ID is invalid" });
    }

    // Get item index
    const itemIndex = profile.categories[categoryIndex].category_items
      .map(item => item.id)
      .indexOf(req.params.id);

    if (itemIndex == undefined || itemIndex == -1) {
      return res.status(400).json({ msg: "Item ID is invalid" });
    }

    profile.categories[categoryIndex].category_items.splice(itemIndex, 1);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
