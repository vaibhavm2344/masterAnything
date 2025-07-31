import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique: true},
    password : {type : String, required : true},
    courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    }
  ],
})

const userModel = mongoose.model.User || mongoose.model("User", userSchema);
export default userModel