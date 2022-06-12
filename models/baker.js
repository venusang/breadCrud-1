const mongoose = require("mongoose");
const { Schema } = mongoose;

const bakerSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
  },
  startDate: {
    type: Date,
    required: true
  },
  bio: String
}, { toJSON: { virtuals: true } });

const Baker = mongoose.model('Baker', bakerSchema);
const Bread = require('./bread')

// Virtuals:
bakerSchema.virtual('breads', {
  ref: 'Bread',
  localField: '_id',
  foreignField: 'baker'
})

module.exports = Baker; 