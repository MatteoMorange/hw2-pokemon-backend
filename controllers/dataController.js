// Controller handles CRUD and question logic

const Pokemon = require('../models/dataModel');

// CREATE
exports.createPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.create(req.body);
    res.status(201).json(pokemon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllPokemon = async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getPokemonById = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) return res.status(404).json({ message: 'Pokemon not found' });
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updatePokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pokemon) return res.status(404).json({ message: 'Pokemon not found' });
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deletePokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!pokemon) return res.status(404).json({ message: 'Pokemon not found' });
    res.json({ message: 'Pokemon deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------------------
// QUESTION ENDPOINTS
// -------------------------------

// 1. Fastest Pokémon
exports.getFastestPokemon = async (req, res) => {
  try {
    const fastest = await Pokemon.findOne().sort({ speed: -1 }).limit(1);
    res.json({
      question: "Which Pokémon has the highest speed?",
      answer: fastest ? fastest.name : "No data available"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Strongest Pokémon (attack)
exports.getStrongestPokemon = async (req, res) => {
  try {
    const strongest = await Pokemon.findOne().sort({ attack: -1 }).limit(1);
    res.json({
      question: "Which Pokémon has the highest attack?",
      answer: strongest ? strongest.name : "No data available"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Most Defensive Pokémon
exports.getMostDefensivePokemon = async (req, res) => {
  try {
    const defense = await Pokemon.findOne().sort({ defense: -1 }).limit(1);
    res.json({
      question: "Which Pokémon has the highest defense?",
      answer: defense ? defense.name : "No data available"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Highest HP Pokémon
exports.getHighestHpPokemon = async (req, res) => {
  try {
    const hp = await Pokemon.findOne().sort({ hp: -1 }).limit(1);
    res.json({
      question: "Which Pokémon has the highest HP?",
      answer: hp ? hp.name : "No data available"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Average Attack
exports.getAverageAttack = async (req, res) => {
  try {
    const result = await Pokemon.aggregate([
      { $group: { _id: null, avgAttack: { $avg: "$attack" } } }
    ]);
    res.json({
      question: "What is the average attack of all Pokémon?",
      answer: result[0] ? result[0].avgAttack.toFixed(2) : "No data"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 6. Average Speed
exports.getAverageSpeed = async (req, res) => {
  try {
    const result = await Pokemon.aggregate([
      { $group: { _id: null, avgSpeed: { $avg: "$speed" } } }
    ]);
    res.json({
      question: "What is the average speed of all Pokémon?",
      answer: result[0] ? result[0].avgSpeed.toFixed(2) : "No data"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 7. Count of Pokémon by Type
exports.getCountByType = async (req, res) => {
  try {
    const result = await Pokemon.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({
      question: "How many Pokémon exist by type?",
      answer: result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 8. Total Pokémon Count
exports.getTotalCount = async (req, res) => {
  try {
    const count = await Pokemon.countDocuments();
    res.json({
      question: "What is the total number of Pokémon?",
      answer: count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

