const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  mbti: {
    type: String,
  },
  enneagram: {
    type: String,
  },
  variant: {
    type: String,
  },
  tritype: {
    type: Number,
  },
  socionics: {
    type: String,
  },
  sloan: {
    type: String,
  },
  psyche: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
