// Mongoose schema for Pokémon data

const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  hp: Number,
  attack: Number,
  defense: Number,
  speed: Number
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
