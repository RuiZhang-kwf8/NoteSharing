const mongoose = require("mongoose");

const pageSchema = mongoose.Schema(
    {
      typeofinfo: {
        type: String,  
        required: [true, "Please add the type of info you are inputting"],  
      }
      ,
      description: {
        type: String, 
        required: [true, "Please add a description"],
        unique: [true, "Email address already taken"],

      },
      id:{
        type: String,
        required: [true, "Please add a id"]
      },
    usersid: { 
        type: String,
        required: [true, "Please add a user id"]
    }
}
    ,
    {
      timestamps: true,
    }
  );
  module.exports = mongoose.model("Page", pageSchema);
