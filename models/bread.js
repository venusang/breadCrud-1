const mongoose = require("mongoose");
const { Schema } = mongoose;


const breadSchema = new Schema({
  baker: { type: String, enum: ['Jackie', 'Liam', 'Mama'] },
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' }
})



const Bread = mongoose.model('Bread', breadSchema)


module.exports = Bread
