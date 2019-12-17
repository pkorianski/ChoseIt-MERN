const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  categories: [
    {
      category_name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      created_on: {
        type: Date,
        default: Date.now
      },
      img_url: {
        type: String
      },
      category_items: [
        {
          item_name: {
            type: String,
            required: true
          },
          item_url: {
            type: String
          }
        }
      ]
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
