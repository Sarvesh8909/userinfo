const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test1');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
  image : String,
  emali : String,
  name : String,
});

module.exports =  mongoose.model("user", userSchema);
