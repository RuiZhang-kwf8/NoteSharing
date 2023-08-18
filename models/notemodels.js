const mongoose = require("mongoose");


const notesSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, "Please add the id name"],

    },
    real_user_id: {
      type: String, 
      required: [true, "fuckk this shittttttttughghhhh"],
    },
    text: {
      type: String,
      required: [true, "Please add the contact name"],
        }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notes", notesSchema);